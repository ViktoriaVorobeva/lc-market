import { Button, List, ListItem, Stack, Typography } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useEffect, useState } from "react";
import OrderCard from "../components/OrderCard";
import { getOrdersData, getSortOrders } from "../store/slices/orders";
import { useAppDispatch, useAppSelector } from "../store/store";
import Filter from "../components/Filter";

const OrdersPage = () => {
  const [isReverse, setIsReverse] = useState(false);

  const orders = useAppSelector((store) => store.order.orders);
  const dispatch = useAppDispatch();

  function handkeSortClick() {
    dispatch(getSortOrders(isReverse));
    setIsReverse(!isReverse);
  }

  useEffect(() => {
    dispatch(getOrdersData());
  }, []);

  return (
    <>
      <Typography variant="h1" color="black" gutterBottom>
        Все заказы
      </Typography>
      <Stack style={{width: '100%'}} justifyContent='space-between' direction="row"
            spacing={{ xs: 1, sm: 2, md: 4 }}>
        <Filter />
        <Button
          variant="contained"
          endIcon={isReverse ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
          onClick={handkeSortClick}
        >
          Сортировать по цене
        </Button>
      </Stack>
      <List>
        {orders.map((order) => (
          <ListItem
            key={order.id}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <OrderCard {...order} />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default OrdersPage;
