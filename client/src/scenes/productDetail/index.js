import AddIcon from "@mui/icons-material/Add";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box, Button, IconButton, Typography } from "@mui/material";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Item from "../../components/Item";
import { addToCart } from "../../state";
import { shades } from "../../theme";
import productApi from "api/productApi";
import { useTheme } from "@emotion/react";

const ProductDetail = () => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const { productId } = useParams();

  const [value, setValue] = useState("description");
  const [count, setCount] = useState(1);
  const [item, setItem] = useState();

  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const items = useSelector((state) => state.items);
  function getItem(productId) {
    return items.find((item) => {
      return item._id === productId;
    });
  }

  useEffect(() => {
    setItem(() => getItem(productId));
  }, [productId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box width='80%' m='80px auto'>
      <Box display='flex' flexWrap='wrap' columnGap='40px'>
        {/* IMAGES */}
        <Box flex='1 1 40%' mb='40px'>
          <img alt={item?.name} width='100%' height='100%' src={`http://localhost:4000/assets/${item?.images[0]}`} style={{ objectFit: "contain" }} />
        </Box>

        {/* ACTIONS */}
        <Box flex='1 1 50%' mb='40px'>
          <Box display='flex' justifyContent='space-between'>
            <Box
              onClick={() => {
                navigate("/");
              }}
              sx={{ "&:hover": { color: palette.primary.main, cursor: "pointer" } }}
            >
              Home/Item
            </Box>
            <Box
              onClick={() => {
                navigate("/checkout");
              }}
              sx={{ "&:hover": { color: palette.primary.main, cursor: "pointer" } }}
            >
              Prev Next
            </Box>
          </Box>

          <Box m='65px 0 25px 0'>
            <Typography variant='h3'>{item?.name}</Typography>
            <Typography>${item?.price}</Typography>
            <Typography sx={{ mt: "20px" }}>{item?.longDescription}</Typography>
          </Box>

          <Box display='flex' alignItems='center' minHeight='50px'>
            <Box display='flex' alignItems='center' border={`1.5px solid ${shades.neutral[300]}`} mr='20px' p='2px 5px'>
              <IconButton onClick={() => setCount(Math.max(count - 1, 0))}>
                <RemoveIcon />
              </IconButton>
              <Typography sx={{ p: "0 5px" }}>{count}</Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                <AddIcon />
              </IconButton>
            </Box>
            <Button
              fullWidth
              sx={{
                m: "1rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
              onClick={() => dispatch(addToCart({ item: { ...item, count } }))}
            >
              ADD TO CART
            </Button>
          </Box>
          <Box>
            <Box m='20px 0 5px 0' display='flex'>
              <FavoriteBorderOutlinedIcon />
              <Typography sx={{ ml: "5px" }}>ADD TO WISHLIST</Typography>
            </Box>
            <Typography>CATEGORIES: {item?.category}</Typography>
          </Box>
        </Box>
      </Box>

      {/* INFORMATION */}
      <Box m='20px 0'>
        <Tabs value={value} onChange={handleChange}>
          <Tab label='DESCRIPTION' value='description' />
          <Tab label='REVIEWS' value='reviews' />
        </Tabs>
      </Box>
      <Box display='flex' flexWrap='wrap' gap='15px'>
        {value === "description" && <div>{item?.longDescription}</div>}
        {value === "reviews" && <div>reviews</div>}
      </Box>

      {/* RELATED ITEMS */}
      <Box mt='50px' width='100%'>
        <Typography variant='h3' fontWeight='bold'>
          Related Products
        </Typography>
        <Box mt='20px' display='flex' flexWrap='wrap' columnGap='1.33%' justifyContent='space-between'>
          {items.slice(0, 4).map((item, i) => (
            <Item key={`${item.name}-${i}`} item={item} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetail;
