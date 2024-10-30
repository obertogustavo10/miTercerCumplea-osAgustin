import React from "react";
import "../App.css";
import DinoRun from "../assets/dinoRun.png";

function DinosaurJump() {
  return (
    <div style={{ position: "absolute", bottom: "10px", left: "10%" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ fontSize: "50px" }}>2</div>
        <img
          src={DinoRun}
          className="dino-move"
          style={{
            width: "100px",
            height: "100px",
            marginLeft: "90px",
            marginRight: "90px",
          }}
        />
        <div style={{ fontSize: "50px" }}>3</div>
      </div>
    </div>
  );
}

export default DinosaurJump;
