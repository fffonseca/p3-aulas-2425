import React from "react";
import { Modal, Box, Typography, Button, Stack } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  minWidth: 300,
  maxWidth: 400,
  textAlign: "center",
};

const CustomModal = ({
  open,
  onClose,
  type = "info", // "info", "warning", "error", etc.
  title = "",
  text = "",
  buttonType = "ok", // "ok" ou "yesno"
  onOk,
  onYes,
  onNo,
}) => {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-title" aria-describedby="modal-desc">
      <Box sx={style}>
        <Typography id="modal-title" variant="h6" color={type === "error" ? "error" : "#000"} gutterBottom>
          {title || ""}
        </Typography>
        <Typography id="modal-desc" sx={{ mb: 2, color:"#000" }}>
          {text}
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center">
          {buttonType === "ok" && (
            <Button variant="contained" color="primary" onClick={onOk || onClose}>
              Confirmar
            </Button>
          )}
          {buttonType === "yesno" && (
            <>
              <Button variant="contained" color="primary" onClick={onYes}>
                Sim
              </Button>
              <Button variant="outlined" color="secondary" onClick={onNo || onClose}>
                Não
              </Button>
            </>
          )}
        </Stack>
      </Box>
    </Modal>
  );
};

export default CustomModal;