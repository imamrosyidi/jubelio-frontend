import React, { useState } from "react";
import "./addproduct.scss";
import axios from "axios";

function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setdescription] = useState("");

  const onAddHandler = () => {
    if ((name != "") & (price != "") & (description != "")) {
      axios
        .post(process.env.REACT_APP_API_URL + "product", {
          name: name,
          price: price,
          description: description,
        })
        .then((_) => {
          alert("Berhasil");
        })
        .catch((_) => {
          alert("Gagal");
        });
    } else {
      alert("Lengkapi data !");
    }
  };

  return (
    <div className="addproduct">
      <div className="title">Name</div>
      <input
        type="text"
        className="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div className="title">Price</div>
      <input
        type="number"
        className="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <div className="title">Description</div>
      <textarea
        className="description"
        onChange={(e) => setdescription(e.target.value)}
      >
        {description}
      </textarea>
      <div className="button">
        <div className="add" onClick={onAddHandler}>
          add
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
