import React from "react";
import { Field } from "react-final-form";
import { Grid, TextField } from "@mui/material";
import { StyledTitleOver, TextRoboto } from "../styledComponents/styledText";
import { StyledIconGreyBackground } from "../styledComponents/StyledIconAvatar";
import { StyledBox } from "../styledComponents/styledContainer";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { generateLabel } from "../Validation/projectValidator";
type OverviewSectionProps = {
  description: string;
  mode: "view" | "edit";
};

const OverviewSection: React.FC<OverviewSectionProps> = ({
  description,
  mode,
}) => {
  return (
    <StyledBox>
      <StyledIconGreyBackground>
        <TrendingUpIcon />
      </StyledIconGreyBackground>
      <Grid>
        <StyledTitleOver>OVERVIEW</StyledTitleOver>
        {mode === "edit" ? (
          <Field name="description" initialValue={description}>
            {({ input, meta }) => (
              <TextField
                {...input}
                placeholder="Overview Text"
                fullWidth
                multiline
                rows={4}
                variant="standard"
                error={meta.touched && meta.error}
                helperText={meta.touched && meta.error}
                InputProps={{
                  disableUnderline: true,
                  style: { fontSize: "inherit", fontWeight: "inherit" },
                }}
                label={generateLabel("Project Overview", true)}
              />
            )}
          </Field>
        ) : (
          <TextRoboto>{description}</TextRoboto>
        )}
      </Grid>
    </StyledBox>
  );
};

export default OverviewSection;
