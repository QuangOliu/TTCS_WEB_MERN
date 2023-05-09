import { Box } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import orderApi from "api/orderApi";
import StyledTableCell from "components/StyledTableCell";
import StyledTableRow from "components/StyledTableRow";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ManageOrder() {
  const [data, setData] = useState([]);
  useEffect(() => {
    orderApi
      .getOrder()
      .then((result) => {
        setData(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const head = ["Order ID", "User Name", "Phone Number", "Delivery Address", "Total Amount", "Order At"];
  return (
    <Box>
      <Box m='0 auto' p={"0 15px"}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label='customized table'>
            {head && (
              <TableHead>
                <TableRow>
                  {head.map((item, index) => (
                    <StyledTableCell align='left' key={index}>
                      {item}
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
            )}
            <TableBody>
              {data.map((row) => (
                <StyledTableRow key={row._id}>
                  <StyledTableCell align='left'>
                    <Link to={`/order/${row._id}`}>{row._id}</Link>
                  </StyledTableCell>

                  <StyledTableCell align='left'>{row.name.length > 50 ? `${row.name.slice(0, 50)}...v.v` : row.name}</StyledTableCell>
                  <StyledTableCell align='left'>{row.phoneNumber}</StyledTableCell>
                  <StyledTableCell align='left'>{row.address.length > 50 ? `${row.address.slice(0, 50)}...v.v` : row.address}</StyledTableCell>
                  <StyledTableCell align='left'>
                    {row.items.reduce((acc, item) => {
                      return acc + item.price * item.count;
                    }, 0)}
                  </StyledTableCell>
                  <StyledTableCell align='left'>{row.createdAt.slice(0, 10)}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default ManageOrder;
