CREATE TABLE Projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    code TEXT,
    overview TEXT,
    status TEXT,
    start_date TEXT,
    end_date TEXT,
    scope_description TEXT
);

CREATE TABLE ProjectGoals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id INTEGER,
    goal TEXT,
    FOREIGN KEY (project_id) REFERENCES Projects(id)
);

CREATE TABLE BusinessTeam (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id INTEGER,
    executive_sponsor TEXT,
    business_product TEXT,
    process_owner TEXT,
    FOREIGN KEY (project_id) REFERENCES Projects(id)
);

CREATE TABLE HubTeam (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id INTEGER,
    pm TEXT,
    dev_team TEXT,
    FOREIGN KEY (project_id) REFERENCES Projects(id)
);

CREATE TABLE RisksIssues (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id INTEGER,
    risk_issue TEXT,
    FOREIGN KEY (project_id) REFERENCES Projects(id)
);

CREATE TABLE HubProjectBudget (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id INTEGER,
    actual_budget REAL,
    planned_budget REAL,
    FOREIGN KEY (project_id) REFERENCES Projects(id)
);

CREATE TABLE Milestones (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id INTEGER,
    title TEXT,
    description TEXT,
    date TEXT,
    is_current_state BOOLEAN,
    FOREIGN KEY (project_id) REFERENCES Projects(id)
);
