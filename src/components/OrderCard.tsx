import {
  Button,
  Card,
  CardContent,
  Typography,
  Modal,
  Box,
  Stack,
} from "@mui/material";
import { useState } from "react";
import type { Order, OrderItem } from "../types";
import { OrderStatus } from "../types";
import AdvertisementsCard from "./AdvertisementsCard";

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

function calcCount(products: OrderItem[]) {
  let total = 0;

  for (let product of products) {
    total += product.count;
  }

  return total;
}

const OrderCard = (card: Order) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //@ts-expect-error верный тип
  const keys: Array<keyof typeof OrderStatus> = Object.keys(OrderStatus);
  const key = keys.find((key) => OrderStatus[key] === card.status);

  return (
    <Card sx={{ width: "100%" }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Номер заказа: {card.id}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Количество товаров: {calcCount(card.items)}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Стоимость заказа: {card.total}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Дата создания заказа: {card.createdAt}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Статус заказа: {key}
        </Typography>
        {card.finishedAt && (
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Возможность завершения заказа: {card.finishedAt}
          </Typography>
        )}
        <Button variant="contained" onClick={handleOpen}>
          Показать все товары
        </Button>
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
              Товары
            </Typography>
            <Stack direction="column" spacing={{ xs: 1, sm: 2, md: 4 }}>
              {card.items.map(item => <AdvertisementsCard key={item.id} {...item}/>)}
            </Stack>
          </Box>
        </Modal>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
