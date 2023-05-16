import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import orderApi from "api/orderApi";
import userApi from "api/userApi";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserWidget from "scenes/widgets/UserWidget";
import OrderList from "./OrderList";
import { useTheme } from "@emotion/react";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [orders, setOrders] = useState([]);
  const [ordersByStatus, setOrdersByStatus] = useState({});
  const { palette } = useTheme();

  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  useEffect(() => {
    userApi
      .getUserById(userId)
      .then((result) => {
        setUser(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  useEffect(() => {
    orderApi
      .getOrderByUserId(userId)
      .then((result) => {
        setOrders(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  useEffect(() => {
    const x = {};
    for (const order of orders) {
      const status = order.status;
      if (!x[status]) {
        x[status] = [];
      }
      x[status].push(order);
    }
    setOrdersByStatus(x);
  }, [orders]);

  return (
    <Box>
      <Box width='100%' display={isNonMobileScreens ? "flex" : "block"} gap='2rem' flexWrap={"wrap"}>
        <Box flexBasis={isNonMobileScreens ? "30%" : undefined}>
          <UserWidget userId={userId} picturePath={user?.picturePath} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} orders={orders} />
          <Box m='2rem 0' />
        </Box>
        <Box flex={isNonMobileScreens ? "1" : undefined} mt={isNonMobileScreens ? undefined : "2rem"}>
          {orders.length > 0 ? (
            <OrderList ordersByStatus={ordersByStatus[selectedIndex]} />
          ) : (
            <Box>
              <Typography>Chưa có order nào</Typography>
              <Button
                fullWidth
                sx={{
                  m: "1rem 0 0 0",
                  p: "1rem",
                  backgroundColor: palette.primary.main,
                  color: palette.background.alt,
                  "&:hover": { color: palette.primary.main },
                }}
                onClick={() => {
                  navigate("/");
                }}
              >
                Xem sản phẩm
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
