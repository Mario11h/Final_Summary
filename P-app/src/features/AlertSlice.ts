import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AlertState {
  message: string;
  severity: "success" | "error" | "warning" | "info";
  open: boolean;
}

const initialState: AlertState = {
  message: "",
  severity: "info",
  open: false,
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert: (
      state,
      action: PayloadAction<{
        message: string;
        severity: AlertState["severity"];
      }>
    ) => {
      state.message = action.payload.message;
      state.severity = action.payload.severity;
      state.open = true;
    },
    closeAlert: (state) => {
      state.open = false;
    },
  },
});

export const { showAlert, closeAlert } = alertSlice.actions;
export default alertSlice.reducer;
