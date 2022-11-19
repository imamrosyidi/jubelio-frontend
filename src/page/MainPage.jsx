import React from "react";
import Header from "../components/Header";
import FloattingButton from "../components/FloatingButton";
import "./mainpage.scss";
import Card from "../components/Card";
import Loading from "../components/Loading";
import { Dialog } from "@mui/material";
import { useState } from "react";
import Details from "../components/Details";
import AddProduct from "../components/AddProduct";
import { useEffect } from "react";
import myState from "../context/state";
import { observer } from "mobx-react";

const MainPage = observer(() => {
  const [myst] = useState(() => new myState());

  useEffect(() => {
    myst.setlistPorudcts();
  }, []);

  const onScroll = (event) => {
    const target = event.target;
    console.log(
      Math.floor(target.scrollHeight - target.scrollTop) +
        "   " +
        target.clientHeight
    );
    if (
      (Math.floor(target.scrollHeight - target.scrollTop - 1) <=
        target.clientHeight) &
      !myst.isMax
    ) {
      console.log("in buttom");
      myst.appendListPorudcts();
    }
  };
  return (
    <div className="mainpage">
      <Header></Header>
      <div className="container" id="container" onScrollCapture={onScroll}>
        <div className="listporducts">
          {myst.listPorudcts?.map((data, i) => (
            <Card
              key={i}
              data={data}
              onClick={() => {
                myst.setDetails(data);
                myst.setisdetailOpen(true);
              }}
            ></Card>
          ))}
        </div>

        {!myst.isMax && <Loading></Loading>}
      </div>
      <FloattingButton
        onClick={() => myst.setisAddProductOpen(true)}
      ></FloattingButton>
      <Dialog
        open={myst.isDetailOpen}
        onClose={(e) => {
          myst.setisdetailOpen(false);
        }}
      >
        <Details
          data={myst.details}
          deleteList={() => myst.deleteListProduct(myst.details.id)}
          updateList={(id, newdata) => myst.updateListProduct(id, newdata)}
        ></Details>
      </Dialog>
      <Dialog
        open={myst.isAddProductOpen}
        onClose={(e) => {
          myst.setisAddProductOpen(false);
        }}
      >
        <AddProduct></AddProduct>
      </Dialog>
    </div>
  );
});

export default MainPage;
