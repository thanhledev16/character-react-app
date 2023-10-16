import React from "react";

function Images({ image }) {
  return (
    <img
      src={image}
      alt=""
      height="60"
      className="img-center"
      style={{ top: "50%" }}
    />
  );
}

export default Images;
