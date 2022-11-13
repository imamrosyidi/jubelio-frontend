import React from "react";
import "./card.scss";
import img from "./../img/placeholder.png";
function Card({ data, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      <img src={data.images[0]?.src ?? img} alt="products" />
      <div className="name">{data.name}</div>
      <div className="price">
        Rp. {data.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
      </div>
    </div>
  );
}

export default Card;
