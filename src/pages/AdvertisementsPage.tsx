import {
  Autocomplete,
  List,
  ListItem,
  Pagination,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import AdvertisementsCard from "../components/AdvertisementsCard";
import NewCardForm from "../components/NewCardForm";
import { getAdvertismentsData } from "../store/slices/advertisements";
import { useAppDispatch, useAppSelector } from "../store/store";
import type { Advertisment } from "../types";
import { saveResultInLocalStorage } from "../utils/localStorage";

const DEFAULTLIMIT = 10;

function calcPageCount(length: number, limit: number) {
  return Math.ceil(length / limit);
}

function getIndexPagination(page: number, limit: number) {
  const lastIndex = page * limit;
  const firstIndex = lastIndex - limit;
  return [firstIndex, lastIndex];
}

const AdvertisementsPage = () => {
  const [limit, setLimit] = useState(DEFAULTLIMIT);
  const [titles, setTitles] = useState<string[]>([]);
  const [advertisements, setAdvertisements] = useState<Advertisment[]>([]);
  const [page, setPage] = useState(1);
  const [pageQty, setPageQty] = useState(1);

  const dispatch = useAppDispatch();

  const allAdvertisements = useAppSelector(
    (store) => store.advertisment.allAdvertisements
  );

  function handlePageIndexChange(
    event: React.ChangeEvent<unknown>,
    page: number
  ) {
    setPage(page);
    const [firstIndex, lastIndex] = getIndexPagination(page, limit);
    setAdvertisements(allAdvertisements.slice(firstIndex, lastIndex));
  }

  function handleAutocompleteChange(
    event: React.SyntheticEvent<Element, Event>,
    value: string | null
  ) {
    const card = allAdvertisements.find(
      (advertisement) => advertisement.name === value
    );
    return card && window.location.assign(`/advertisements/${card.id}`);
  }

  function handleChangeLimit(
    event: React.MouseEvent<HTMLElement>,
    newLimit: string
  ) {
    setLimit(+newLimit);
  }

  useEffect(() => {
    dispatch(getAdvertismentsData());
  }, []);

  useEffect(() => {
    setPageQty(calcPageCount(allAdvertisements.length, limit));
    setAdvertisements(allAdvertisements.slice(0, limit));
  }, [allAdvertisements, limit]);

  useEffect(() => {
    setAdvertisements(allAdvertisements.slice(0, limit));
    setPageQty(calcPageCount(allAdvertisements.length, limit));
    setTitles(allAdvertisements.map((el) => el.name));
    saveResultInLocalStorage("advertisements", allAdvertisements);
  }, [allAdvertisements]);

  return (
    <>
      <Typography variant="h1" color="black" gutterBottom>
        Все объявления
      </Typography>
      <Stack
        justifyContent="space-between"
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
      >
        <Autocomplete
          disablePortal
          options={titles}
          onChange={handleAutocompleteChange}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Search" />}
        />
        <ToggleButtonGroup
          value={`${limit}`}
          exclusive
          onChange={handleChangeLimit}
          aria-label="count per page"
        >
          <ToggleButton value="10" aria-label="10 per page">
            10
          </ToggleButton>
          <ToggleButton value="5" aria-label="5 per page">
            5
          </ToggleButton>
          <ToggleButton value="20" aria-label="20 per page">
            20
          </ToggleButton>
          <ToggleButton value="50" aria-label="50 per page">
            50
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>
      <List>
        {advertisements.map((advertisement) => (
          <ListItem
            key={advertisement.id}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <AdvertisementsCard {...advertisement} />
          </ListItem>
        ))}
      </List>
      <NewCardForm />
      <Pagination
        count={pageQty}
        page={page}
        onChange={handlePageIndexChange}
      />
    </>
  );
};

export default AdvertisementsPage;
