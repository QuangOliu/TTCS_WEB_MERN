import { Box, Typography, useMediaQuery } from "@mui/material";
import orderApi from "api/orderApi";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import TableListItem from "./TableListItem";
// import TableListItem from "./TableListItem";
import OppositeContentTimeline from "components/Timeline";

const arrStatus = ["Order", "Approved", "Shipping", "Success"];

function OrderDetail() {
  const [data, setData] = useState({});
  const [items, setItems] = useState([]);
  const { orderId } = useParams();

  const isNonMobile = useMediaQuery("(min-width:600px)");
  useEffect(() => {
    orderApi
      .getOrderById(orderId)
      .then((result) => {
        setItems(result.data.items);
        setData(result.data);
      })
      .catch((err) => {});
  }, [orderId]);

  return (
    <Box>
      <Typography variant='h2' textAlign='left' sx={{ mb: "15px" }}>
        <b>Order Detail</b>
      </Typography>

      <Box
        display='grid'
        gap='30px'
        gridTemplateColumns='repeat(4, minmax(0, 1fr))'
        sx={{
          "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
        }}
      >
        <Box sx={{ gridColumn: "span 2" }}>
          <Typography sx={{ lineHeight: "1.5", gridColumn: "span 2", textAlign: "left", mb: "20px" }}>
            <strong style={{ minWidth: "150px", display: "block" }}>Order ID:</strong> <span id='order-id'>{data._id}</span>
          </Typography>
          <Typography sx={{ lineHeight: "1.5", gridColumn: "span 2", textAlign: "left", mb: "20px" }}>
            <strong style={{ minWidth: "150px", display: "block" }}>User ID:</strong> <Link to={`/profile/${data.userId}`}>{data.userId}</Link>
          </Typography>
          <Typography sx={{ lineHeight: "1.5", gridColumn: "span 2", textAlign: "left", mb: "20px" }}>
            <strong style={{ minWidth: "150px", display: "block" }}>User Name:</strong> <span id='name'>{data.name}</span>
          </Typography>
          <Typography sx={{ lineHeight: "1.5", gridColumn: "span 2", textAlign: "left", mb: "20px" }}>
            <strong style={{ minWidth: "150px", display: "block" }}>Phone Number:</strong> <span id='phone-number'>{data.phoneNumber}</span>
          </Typography>
          <Typography sx={{ lineHeight: "1.5", gridColumn: "span 2", textAlign: "left", mb: "20px" }}>
            <strong style={{ minWidth: "150px", display: "block" }}>Address:</strong> <span id='address'>{data.address}</span>
          </Typography>
          <Typography sx={{ lineHeight: "1.5", gridColumn: "span 2", textAlign: "left", mb: "20px" }}>
            <strong style={{ minWidth: "150px", display: "block" }}>Total Amount:</strong>
            {items.reduce((total, item) => {
              return total + item.count * item.price;
            }, 0)}{" "}
            VND
          </Typography>
          <Typography sx={{ lineHeight: "1.5", gridColumn: "span 2", textAlign: "left", mb: "20px" }}>
            <strong style={{ minWidth: "150px", display: "block" }}>Status:</strong> <span id='status'>{arrStatus[data.status - 1]}</span>
          </Typography>
        </Box>

        <Box sx={{ gridColumn: "span 2" }}>
          <OppositeContentTimeline data={data.statusHistory} />
        </Box>
      </Box>
      <Typography variant='h3' textAlign='left' sx={{ mb: "15px" }}>
        Items:
      </Typography>
      <TableListItem arrIdOfItem={items} />
    </Box>
  );
}

export default OrderDetail;
