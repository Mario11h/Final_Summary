import React from "react";
import { Field } from "react-final-form";
import { TextField, Box } from "@mui/material";
import {
  ProjectName,
  ProjectCode,
  OngoingText,
} from "./styledComponents/styledText";
import { StyledProjectHeaderBox } from "./styledComponents/styledBoxes";

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
    <StyledProjectHeaderBox>
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
                      disableUnderline: false,
                      style: { fontSize: "inherit", fontWeight: "inherit" },
                    }}
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
                  />
                )}
              </Field>
            </ProjectCode>
            <br />
          </>
        ) : (
          <>
            <ProjectName>{name}</ProjectName>
            <ProjectCode>{code}</ProjectCode>
          </>
        )}
      </Box>
      {mode === "edit" ? (
        <OngoingText>
          <Field name="status" initialValue={status}>
            {({ input, meta }) => (
              <TextField
                {...input}
                placeholder="Status"
                fullWidth
                variant="standard"
                error={meta.touched && meta.error}
                helperText={meta.touched && meta.error}
                InputProps={{
                  disableUnderline: true,
                  style: { fontSize: "inherit", fontWeight: "inherit" },
                }}
              />
            )}
          </Field>
        </OngoingText>
      ) : (
        <OngoingText>{status}</OngoingText>
      )}
    </StyledProjectHeaderBox>
  );
};

export default ProjectHeader;
