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
            item.linkTo = `/product/${item._id}`;
            return item;
          });
        });
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const submitDelete = (selected) => {
    const formdata = {
      selected: selected,
    };
    productApi
      .deleteProduct(formdata)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <TableProduct head={head} data={data} btn={btn} submitDelete={submitDelete} />
    </div>
  );
}

export default ManageDashboad;
