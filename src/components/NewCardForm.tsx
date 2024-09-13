import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Fab, Stack, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import type { newAdvertisment } from "../types";
import { useAppDispatch } from "../store/store";
import { addAdvertisment, createNewAdvertisment } from "../store/slices/advertisements";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const initialForm = {
  name: '',
  price: 0,
}

const NewCardForm = () => {
  const [form, setForm] = useState<newAdvertisment>(initialForm);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useAppDispatch();

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
      const target = event.target;
      setForm({ ...(form as newAdvertisment), [target.name]: target.value });
  }

  function handleButtonSend () {
    dispatch(createNewAdvertisment(form as newAdvertisment));
    dispatch(addAdvertisment(form));
    setForm(initialForm);
    handleClose();
  }

  return (
    <div>
      <Fab color="primary" aria-label="add" onClick={handleOpen}>
        <AddIcon />
      </Fab>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Typography
              id="modal-modal-title"
              color="black"
              variant="h6"
              component="h2"
            >
              Новая карточка
            </Typography>
          <Stack
            direction="column"
            spacing={{ xs: 1, sm: 2, md: 4 }}
          >
            <TextField
              value={(form?.imageUrl) ? form?.imageUrl : ""}
              id="imageUrl"
              name="imageUrl"
              label="Ссылка на картинку"
              onChange={handleInputChange}
            />
            <TextField value={form.name} required id="name" name="name" label="Название" onChange={handleInputChange} />
            <TextField value={(form?.description) ? form?.description : ""} id="description" name="description" label="Описание" onChange={handleInputChange} />
            <TextField value={form.price} required id="price" name="price" label="Стоимость" onChange={handleInputChange} />
            <Button variant="contained" onClick={handleButtonSend}>Send</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};

export default NewCardForm;
