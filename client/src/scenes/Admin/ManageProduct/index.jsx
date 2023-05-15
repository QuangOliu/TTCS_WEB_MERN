import { Typography } from "@mui/material";
import productApi from "api/productApi";
import { useEffect, useState } from "react";
import TableProduct from "scenes/Admin/ManageProduct/TableProduct";

const head = [
  {
    numeric: true,
    disablePadding: false,
    lable: "Product ID",
    id: "_id",
  },
  {
    numeric: true,
    disablePadding: false,
    lable: "Category",
    id: "category",
  },
  {
    numeric: true,
    disablePadding: false,
    lable: "Name",
    id: "name",
  },
  {
    numeric: true,
    disablePadding: false,
    lable: "Short Description",
    id: "shortDescription",
  },
  {
    numeric: true,
    disablePadding: false,
    lable: "LongDescription",
    id: "longDescription",
  },
  {
    numeric: true,
    disablePadding: false,
    lable: "Quantity",
    id: "quantity",
  },
  {
    numeric: true,
    disablePadding: false,
    lable: "Price",
    id: "price",
  },
  {
    numeric: true,
    disablePadding: false,
    lable: "Sales",
    id: "sales",
  },
  {
    numeric: true,
    disablePadding: false,
    lable: "CreateAt",
    id: "createdAt",
  },
];
const btn = {
  title: "Thêm sản phẩm mới",
  linkTo: "/manage/product/create",
};
function ManageDashboad() {
  const [data, setData] = useState([]);

  useEffect(() => {
    productApi
      .getAllProduct()
      .then((result) => {
        setData(result);
        setData((data) => {
          return data.map((item) => {
            item.linkTo = `/manage/product/edit/${item._id}`;
            // item.linkTo = `/product/${item._id}`;
            return item;
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const submitDelete = async (selected) => {
    const formData = {
      selected: selected,
    };
    productApi
      .deleteProducts(formData)
      .then((result) => {
        const newData = data.filter((item) => {
          return !selected.includes(item._id);
        });
        console.log(newData);
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Typography variant='h3' textAlign='left' sx={{ mb: "15px" }}>
        <b>Product Management</b>
      </Typography>
      <TableProduct head={head} data={data} btn={btn} submitDelete={submitDelete} />
    </div>
  );
}

export default ManageDashboad;
