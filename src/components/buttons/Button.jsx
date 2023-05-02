import React from "react";
import style from "./Button.module.css";

export default function Button({ name, onClick }) {
  return (
    <button id={style.btn} onClick={onClick}>
      {name}
    </button>
  );
}
