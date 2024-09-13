import { useParams } from "react-router-dom";
import {
  Fab,
  Typography,
  Stack,
  TextField,
  Modal,
  Box,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { findAdvertisement } from "../utils/finder";
import { getResultFromLocalStorage } from "../utils/localStorage";
import { Advertisment } from "../types";
import { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch } from "../store/store";
import {
  editAdvertisment,
  editCurrentAdvertisment,
  getAdvertisementsList,
} from "../store/slices/advertisements";

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

const AdvertisementPage = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { id } = useParams();

  const dispatch = useAppDispatch();

  const advertisements = getResultFromLocalStorage("advertisements");

  const card = findAdvertisement(advertisements, id);

  if (!card) return null;

  const [form, setForm] = useState<Advertisment>(card);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const target = event.target;
    setForm({ ...(form as Advertisment), [target.name]: target.value });
  }

  function handleButtonSend() {
    if (card) {
      dispatch(editCurrentAdvertisment(form as Advertisment));
      dispatch(editAdvertisment({ id: card.id, card: form }));
      handleClose();
    }
  }

  useEffect(() => {
    dispatch(getAdvertisementsList(advertisements));
  }, []);

  return (
    <>
      <div style={{ width: "100%", marginBottom: "20px" }}>
        {form.imageUrl && <img src={form.imageUrl} alt={form.name}></img>}
        <Typography color="black" gutterBottom variant="h2" component="div">
          {form.name}
        </Typography>
        {form.description && (
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {form.description}
          </Typography>
        )}
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Цена: {form.price}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Количество просмотров: {form.views}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Количество лайков: {form.likes}
        </Typography>
      </div>
      <Fab color="secondary" aria-label="edit" onClick={handleOpen}>
        <EditIcon />
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
            Редактировать карточку
          </Typography>
          <Stack direction="column" spacing={{ xs: 1, sm: 2, md: 4 }}>
            <TextField
              value={form?.imageUrl ? form?.imageUrl : ""}
              id="imageUrl"
              name="imageUrl"
              label="Ссылка на картинку"
              onChange={handleInputChange}
            />
            <TextField
              required
              id="name"
              name="name"
              label="Название"
              value={form.name}
              onChange={handleInputChange}
            />
            <TextField
              value={form?.description ? form?.description : ""}
              id="description"
              name="description"
              label="Описание"
              onChange={handleInputChange}
            />
            <TextField
              value={form.price}
              required
              id="price"
              name="price"
              label="Стоимость"
              onChange={handleInputChange}
            />
            <Button variant="contained" onClick={handleButtonSend}>
              Send
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default AdvertisementPage;
