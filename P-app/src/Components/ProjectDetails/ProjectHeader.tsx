import React from "react";
import { Field } from "react-final-form";
import {TextField,Box,MenuItem,Select,FormControl,InputLabel,} from "@mui/material";
import {ProjectName,ProjectCode,OngoingText, ProjectContainer,} from "../styledComponents/styledText";
import { StyledProjectHeaderBox } from "../styledComponents/styledBoxes";
import { generateLabel } from "../Validation/projectValidator";
import { StyledGreenDone } from '../styledComponents/styledText';

type ProjectHeaderProps = {
  name: string;
  code: string;
  status: string;
  mode: "view" | "edit";
};

const ProjectHeader: React.FC<ProjectHeaderProps> = ({
  name,
  code,
  status,
  mode,
}) => {
  return (
    <StyledProjectHeaderBox status={status}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {mode === "edit" ? (
          <>
            <ProjectName>
              <Field name="name" initialValue={name}>
                {({ input, meta }) => (
                  <TextField
                    {...input}
                    placeholder="Project Name"
                    fullWidth
                    variant="standard"
                    error={meta.touched && meta.error}
                    helperText={meta.touched && meta.error}
                    InputProps={{
                      disableUnderline: true,
                      style: { fontSize: "inherit", fontWeight: "inherit" },
                    }}
                    label={generateLabel("Project Name", true)}
                    sx={{ width: "145%" }}
                  />
                )}
              </Field>
            </ProjectName>
            <ProjectCode>
              <Field name="code" initialValue={code}>
                {({ input, meta }) => (
                  <TextField
                    {...input}
                    placeholder="Project Code"
                    fullWidth
                    variant="standard"
                    error={meta.touched && meta.error}
                    helperText={meta.touched && meta.error}
                    InputProps={{
                      disableUnderline: true,
                      style: { fontSize: "inherit", fontWeight: "inherit" },
                    }}
                    label={generateLabel("Project Code", true)}
                  />
                )}
              </Field>
            </ProjectCode>
            <br />
          </>
        ) : (
          <>
            <ProjectContainer>
              <ProjectName>{name}</ProjectName>
              {status === 'FINISHED' && <StyledGreenDone />}
            </ProjectContainer>

            <ProjectCode>{code}</ProjectCode>
          </>
        )}
      </Box>
      {mode === "edit" ? (
        <OngoingText status={status}>
          <Field name="status" initialValue={status}>
            {({ input, meta }) => (
              <FormControl fullWidth variant="standard" sx={{ width: "100%" }}>
                <InputLabel shrink>{generateLabel("Status", true)}</InputLabel>
                <Select
                  {...input}
                  displayEmpty
                  value={input.value}
                  error={meta.touched && meta.error}
                  style={{ fontSize: "inherit", fontWeight: "inherit" }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="REQUESTED">Requested</MenuItem>
                  <MenuItem value="ONGOING">Ongoing</MenuItem>
                  <MenuItem value="ON HOLD">On Hold</MenuItem>
                  <MenuItem value="FINISHED">Finished</MenuItem>
                </Select>
              </FormControl>
            )}
          </Field>
        </OngoingText>
      ) : (
        <OngoingText status={status}>{status}</OngoingText>
      )}
    </StyledProjectHeaderBox>
  );
};

export default ProjectHeader;