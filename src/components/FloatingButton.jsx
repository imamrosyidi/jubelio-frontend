import React from "react";
import "./floatingbutton.scss";

function FloatingButton({ onClick }) {
  return (
    <div className="floatingbutton" onClick={onClick}>
      Add Product
    </div>
  );
}

export default FloatingButton;
