const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./database.db');

// Initialize the database
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS Projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      code TEXT,
      overview TEXT,
      status TEXT,
      start_date TEXT,
      end_date TEXT,
      scope_description TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS ProjectGoals (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      project_id INTEGER,
      goal TEXT,
      FOREIGN KEY (project_id) REFERENCES Projects(id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS BusinessTeam (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      project_id INTEGER,
      executive_sponsor TEXT,
      business_product TEXT,
      process_owner TEXT,
      FOREIGN KEY (project_id) REFERENCES Projects(id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS HubTeam (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      project_id INTEGER,
      pm TEXT,
      dev_team TEXT,
      FOREIGN KEY (project_id) REFERENCES Projects(id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS RisksIssues (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      project_id INTEGER,
      risk_issue TEXT,
      FOREIGN KEY (project_id) REFERENCES Projects(id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS HubProjectBudget (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      project_id INTEGER,
      actual_budget REAL,
      planned_budget REAL,
      FOREIGN KEY (project_id) REFERENCES Projects(id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS Milestones (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      project_id INTEGER,
      title TEXT,
      description TEXT,
      date TEXT,
      is_current_state BOOLEAN,
      FOREIGN KEY (project_id) REFERENCES Projects(id)
    )
  `);
});

// Get all projects
app.get('/projects', (req, res) => {
  const sql = `
    SELECT
      p.id,
      p.name,
      p.code,
      p.overview,
      p.status,
      p.start_date,
      p.end_date,
      p.scope_description,
      (
        SELECT json_group_array(json_object('id', pg.id, 'goal', pg.goal))
        FROM ProjectGoals pg
        WHERE pg.project_id = p.id
      ) AS goals,
      (
        SELECT json_group_array(json_object('id', ri.id, 'risk_issue', ri.risk_issue))
        FROM RisksIssues ri
        WHERE ri.project_id = p.id
      ) AS risks,
      (
        SELECT json_group_array(json_object('id', bt.id, 'executive_sponsor', bt.executive_sponsor, 'business_product', bt.business_product, 'process_owner', bt.process_owner))
        FROM BusinessTeam bt
        WHERE bt.project_id = p.id
      ) AS business_teams,
      (
        SELECT json_group_array(json_object('id', ht.id, 'pm', ht.pm, 'dev_team', ht.dev_team))
        FROM HubTeam ht
        WHERE ht.project_id = p.id
      ) AS hub_teams,
      (
        SELECT json_group_array(json_object('id', hb.id, 'actual_budget', hb.actual_budget, 'planned_budget', hb.planned_budget))
        FROM HubProjectBudget hb
        WHERE hb.project_id = p.id
      ) AS budgets,
      (
        SELECT json_group_array(json_object('id', m.id, 'title', m.title, 'description', m.description, 'date', m.date, 'is_current_state', m.is_current_state))
        FROM Milestones m
        WHERE m.project_id = p.id
      ) AS milestones
    FROM Projects p
  `;

  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }

    const projects = rows.map(row => ({
      ...row,
      goals: JSON.parse(row.goals || '[]'),
      risks: JSON.parse(row.risks || '[]'),
      business_teams: JSON.parse(row.business_teams || '[]'),
      hub_teams: JSON.parse(row.hub_teams || '[]'),
      budgets: JSON.parse(row.budgets || '[]'),
      milestones: JSON.parse(row.milestones || '[]')
    }));

    res.json({ data: projects });
  });
});




// Add a new project
app.post('/projects', (req, res) => {
  const { name, code, overview, status, start_date, end_date, scope_description } = req.body;
  db.run('INSERT INTO Projects (name, code, overview, status, start_date, end_date, scope_description) VALUES (?, ?, ?, ?, ?, ?, ?)', [name, code, overview, status, start_date, end_date, scope_description], function(err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID });
  });
});





// Add a new project goal
app.post('/projects/:project_id/goals', (req, res) => {
  const { project_id } = req.params;
  const { goal } = req.body;

  if (!Array.isArray(goal)) {
    return res.status(400).json({ error: 'Goal must be an array' });
  }

  const placeholders = goal.map(() => '(?, ?)').join(', ');
  const sql = `INSERT INTO ProjectGoals (project_id, goal) VALUES ${placeholders}`;
  const values = goal.flatMap(g => [project_id, g]);

  db.run(sql, values, function(err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ message: 'Goals added successfully', count: goal.length });
  });
});


// Add a new risk or issue
app.post('/projects/:project_id/risks', (req, res) => {
  const { project_id } = req.params;
  const { risk_issue } = req.body;

  if (!Array.isArray(risk_issue)) {
    return res.status(400).json({ error: 'Risk or issue must be an array' });
  }

  const placeholders = risk_issue.map(() => '(?, ?)').join(', ');
  const sql = `INSERT INTO RisksIssues (project_id, risk_issue) VALUES ${placeholders}`;
  const values = risk_issue.flatMap(ri => [project_id, ri]);

  db.run(sql, values, function(err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ message: 'Risks or issues added successfully', count: risk_issue.length });
  });
});



// Add a new milestone
app.post('/projects/:project_id/milestones', (req, res) => {
  const { project_id } = req.params;
  const { title, description, date, is_current_state } = req.body;
  db.run('INSERT INTO Milestones (project_id, title, description, date, is_current_state) VALUES (?, ?, ?, ?, ?)', [project_id, title, description, date, is_current_state], function(err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID });
  });
});

// Add a new business team
app.post('/projects/:project_id/business_team', (req, res) => {
  const { project_id } = req.params;
  const { executive_sponsor, business_product, process_owner } = req.body;
  db.run('INSERT INTO BusinessTeam (project_id, executive_sponsor, business_product, process_owner) VALUES (?, ?, ?, ?)', [project_id, executive_sponsor, business_product, process_owner], function(err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    });
  });
  
 
 // Add a new hub team
app.post('/projects/:project_id/hub_team', (req, res) => {
  const { project_id } = req.params;
  const { pm, dev_team } = req.body;
  const dev_team_json = JSON.stringify(dev_team);
  db.run('INSERT INTO HubTeam (project_id, pm, dev_team) VALUES (?, ?, ?)', [project_id, pm, dev_team_json], function(err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID });
  });
});

  
  // Add a new project budget
  app.post('/projects/:project_id/budgets', (req, res) => {
    const { project_id } = req.params;
    const { actual_budget, planned_budget } = req.body;
    db.run('INSERT INTO HubProjectBudget (project_id, actual_budget, planned_budget) VALUES (?, ?, ?)', [project_id, actual_budget, planned_budget], function(err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    });
  });


  app.put('/projects/:id', (req, res) => {
    const { id } = req.params;
    const { name, code, overview, status, start_date, end_date, scope_description } = req.body;
  
    const sql = `
      UPDATE Projects
      SET name = ?, code = ?, overview = ?, status = ?, start_date = ?, end_date = ?, scope_description = ?
      WHERE id = ?
    `;
  
    db.run(sql, [name, code, overview, status, start_date, end_date, scope_description, id], function(err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({ message: 'Project updated successfully', changes: this.changes });
    });
  });
  app.put('/projects/:project_id/goals/:id', (req, res) => {
    const { project_id, id } = req.params;
    const { goal } = req.body;
  
    const sql = 'UPDATE ProjectGoals SET goal = ? WHERE project_id = ? AND id = ?';
  
    db.run(sql, [goal, project_id, id], function(err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({ message: 'Goal updated successfully', changes: this.changes });
    });
  });
  app.put('/projects/:project_id/risks/:id', (req, res) => {
    const { project_id, id } = req.params;
    const { risk_issue } = req.body;
  
    const sql = 'UPDATE RisksIssues SET risk_issue = ? WHERE project_id = ? AND id = ?';
  
    db.run(sql, [risk_issue, project_id, id], function(err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({ message: 'Risk/Issue updated successfully', changes: this.changes });
    });
  });

  app.put('/projects/:project_id/business_team/:id', (req, res) => {
    const { project_id, id } = req.params;
    const { executive_sponsor, business_product, process_owner } = req.body;
  
    const sql = 'UPDATE BusinessTeam SET executive_sponsor = ?, business_product = ?, process_owner = ? WHERE project_id = ? AND id = ?';
  
    db.run(sql, [executive_sponsor, business_product, process_owner, project_id, id], function(err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({ message: 'Business team updated successfully', changes: this.changes });
    });
  });
  app.put('/projects/:project_id/hub_team/:id', (req, res) => {
    const { project_id, id } = req.params;
    const { pm, dev_team } = req.body;
    const dev_team_json = JSON.stringify(dev_team);
  
    const sql = 'UPDATE HubTeam SET pm = ?, dev_team = ? WHERE project_id = ? AND id = ?';
  
    db.run(sql, [pm, dev_team_json, project_id, id], function(err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({ message: 'Hub team updated successfully', changes: this.changes });
    });
  });
  app.put('/projects/:project_id/budgets/:id', (req, res) => {
    const { project_id, id } = req.params;
    const { actual_budget, planned_budget } = req.body;
  
    const sql = 'UPDATE HubProjectBudget SET actual_budget = ?, planned_budget = ? WHERE project_id = ? AND id = ?';
  
    db.run(sql, [actual_budget, planned_budget, project_id, id], function(err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({ message: 'Budget updated successfully', changes: this.changes });
    });
  });
  app.put('/projects/:project_id/milestones/:id', (req, res) => {
    const { project_id, id } = req.params;
    const { title, description, date, is_current_state } = req.body;
  
    const sql = 'UPDATE Milestones SET title = ?, description = ?, date = ?, is_current_state = ? WHERE project_id = ? AND id = ?';
  
    db.run(sql, [title, description, date, is_current_state, project_id, id], function(err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({ message: 'Milestone updated successfully', changes: this.changes });
    });
  });
        
  

  
// Delete a project
app.delete('/projects/:id', (req, res) => {
  const { id } = req.params;

  // Delete related data from associated tables (if necessary)
  db.run('DELETE FROM ProjectGoals WHERE project_id = ?', [id]);
  db.run('DELETE FROM RisksIssues WHERE project_id = ?', [id]);
  db.run('DELETE FROM BusinessTeam WHERE project_id = ?', [id]);
  db.run('DELETE FROM HubTeam WHERE project_id = ?', [id]);
  db.run('DELETE FROM HubProjectBudget WHERE project_id = ?', [id]);
  db.run('DELETE FROM Milestones WHERE project_id = ?', [id]);

  // Delete the project
  db.run('DELETE FROM Projects WHERE id = ?', [id], function(err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ message: 'Project deleted successfully' });
  });
});

// Delete a project goal
app.delete('/projects/:project_id/goals/:id', (req, res) => {
  const { project_id, id } = req.params;

  const sql = 'DELETE FROM ProjectGoals WHERE project_id = ? AND id = ?';
  
  db.run(sql, [project_id, id], function(err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ message: 'Goal deleted successfully' });
  });
});

// Delete a risk or issue
app.delete('/projects/:project_id/risks/:id', (req, res) => {
  const { project_id, id } = req.params;

  const sql = 'DELETE FROM RisksIssues WHERE project_id = ? AND id = ?';

  db.run(sql, [project_id, id], function(err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ message: 'Risk/Issue deleted successfully' });
  });
});

// Delete a milestone
app.delete('/projects/:project_id/milestones/:id', (req, res) => {
  const { project_id, id } = req.params;

  const sql = 'DELETE FROM Milestones WHERE project_id = ? AND id = ?';

  db.run(sql, [project_id, id], function(err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ message: 'Milestone deleted successfully' });
  });
});



  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
  