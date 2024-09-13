import { useState } from "react";
import {
  InputLabel,
  Select,
  FormControl,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { Box } from "@mui/system";
import { useAppDispatch } from "../store/store";
import { getOrdersByStatus } from "../store/slices/orders";

const Filter = () => {
  const [filter, setFilter] = useState<string>("");

  const dispatch = useAppDispatch();

  const handleChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value as string);
    //@ts-expect-error правильный тип
    dispatch(getOrdersByStatus(event.target.value ));
  };

  return (
    <Box sx={{ minWidth: 200 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Статус заказа</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={filter}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={0}>Created</MenuItem>
          <MenuItem value={1}>Paid</MenuItem>
          <MenuItem value={2}>Transport</MenuItem>
          <MenuItem value={3}>DeliveredToThePoint</MenuItem>
          <MenuItem value={4}>Received</MenuItem>
          <MenuItem value={5}>Archived</MenuItem>
          <MenuItem value={6}>Refund</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default Filter;
