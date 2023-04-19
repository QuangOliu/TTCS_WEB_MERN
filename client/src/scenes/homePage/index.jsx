import { Box } from "@mui/material";
import MainCarousel from "./MainCarousel";
import ShoppingList from "./ShoppingList";
import Subscribe from "./Subscribe";

const HomePage = () => {
  return (
    <Box>
      <MainCarousel />
      <ShoppingList />
      <Subscribe />
    </Box>
  );
};

export default HomePage;
