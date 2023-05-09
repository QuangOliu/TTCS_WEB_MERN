import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";
import { useSelector } from "react-redux";
import Item from "../../components/Item";

const ShoppingList = () => {
  const [value, setValue] = useState("all");
  const items = useSelector((state) => state.items);
  const breakPoint = useMediaQuery("(min-width: 1000px)");

  // const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const topRatedItems = items.filter((item) => item.category === "spring");
  const newArrivalsItems = items.filter((item) => item.category === "newArrivals");
  const bestSellersItems = items.filter((item) => item.category === "fall");

  return (
    <Box width='80%' margin='80px auto'>
      <Typography variant='h3' textAlign='center'>
        Our Featured <b>Products</b>
      </Typography>
      <Tabs
        textColor='primary'
        indicatorColor='primary'
        value={value}
        onChange={handleChange}
        centered
        TabIndicatorProps={{ sx: { display: breakPoint ? "block" : "none" } }}
        sx={{
          m: "25px",
          "& .MuiTabs-flexContainer": {
            flexWrap: "wrap",
          },
        }}
      >
        <Tab label='ALL' value='all' />
        <Tab label='NEW ARRIVALS' value='newArrivals' />
        <Tab label='Fall' value='bestSellers' />
        <Tab label='Spring' value='topRated' />
      </Tabs>
      <Box margin='0 auto' display='grid' gridTemplateColumns='repeat(auto-fill, 300px)' justifyContent='space-around' rowGap='20px' columnGap='1.33%'>
        {value === "all" && items.map((item) => <Item item={item} key={`${item.name}-${item._id}`} />)}
        {value === "newArrivals" && newArrivalsItems.map((item) => <Item item={item} key={`newArrivals-${item._id}`} />)}
        {value === "bestSellers" && bestSellersItems.map((item) => <Item item={item} key={`bestSellers-${item._id}`} />)}
        {value === "topRated" && topRatedItems.map((item) => <Item item={item} key={`topRated-${item.id}`} />)}
      </Box>
    </Box>
  );
};

export default ShoppingList;
