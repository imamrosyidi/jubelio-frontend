import React, { useState } from "react";
import "./details.scss";
import img from "./../img/placeholder.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import axios from "axios";
import "swiper/css/navigation";
import { Navigation } from "swiper";

export default function Details({ data }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [cdata, setcdata] = useState(data);

  const updateHandler = async () => {
    setisLoading(true);
    await axios
      .put(process.env.REACT_APP_API_URL + `product/${cdata.id}`, {
        name: cdata.name,
        price: Number(cdata.price),
        description: cdata.description,
      })
      .then((_) => {
        alert("berhasil");
      })
      .catch((err) => alert("Gagal"));
    setisLoading(false);
  };
  const deleteHandler = async () => {
    setisLoading(true);
    await axios
      .delete(process.env.REACT_APP_API_URL + `product/${cdata.id}`)
      .then((_) => {
        alert("berhasil");
      })
      .catch((err) => alert("Gagal"));
    setisLoading(false);
  };

  return (
    <div className="detailsContainer">
      <div className="image">
        {/* <img src={data.images[0]?.src ?? img} alt=""></img> */}
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
          {data.images.length > 0 ? (
            data.images.map((e, i) => (
              <SwiperSlide key={i}>
                <img src={e.src} alt=""></img>
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <img src={img} alt=""></img>
            </SwiperSlide>
          )}
        </Swiper>
      </div>
      {isEditMode ? (
        <div className="editDetails">
          <div className="title">Name</div>
          <input
            type="text"
            className="name"
            value={cdata.name}
            onChange={(e) => setcdata({ ...cdata, name: e.target.value })}
          />
          <div className="title">Price</div>
          <input
            type="number"
            className="price"
            value={cdata.price}
            onChange={(e) => setcdata({ ...cdata, price: e.target.value })}
          />
          <div className="title">Description</div>
          <textarea
            className="description"
            value={cdata.description}
            onChange={(e) =>
              setcdata({ ...cdata, description: e.target.value })
            }
          ></textarea>
          <div className="button">
            <div className="update" onClick={updateHandler}>
              Update
            </div>
            <div
              className="cancel"
              onClick={() => {
                setIsEditMode(false);
              }}
            >
              Cancel
            </div>
          </div>
        </div>
      ) : (
        <div className="details">
          <div className="name">{data.name}</div>
          <div className="price">
            Rp. {data.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
          </div>
          <div className="description">
            {data.description || "asjahvfs jasdvejh"}
          </div>
          <div className="button">
            {isLoading ? (
              <></>
            ) : (
              <div className="  edit  " onClick={() => setIsEditMode(true)}>
                Edit
              </div>
            )}

            {isLoading ? (
              <div className="delete">Loading..</div>
            ) : (
              <div className="delete" onClick={deleteHandler}>
                Delete
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
