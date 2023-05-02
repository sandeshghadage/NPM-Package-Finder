import React, { useEffect, useState } from "react";
import style from "./Search.module.css";
import axios from "axios";
import { addPackages, allPackagesSlice } from "../redux/packageSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Search() {
  const selectData = useSelector((state) => state.packages.packages);
  const [input, setInput] = useState("");
  const [select, setSelect] = useState("");
  const [msg, setMsg] = useState("");
  const dispatch = useDispatch();

  let packageNames = "";
  if (localStorage.getItem("fav")) {
    packageNames = JSON.parse(localStorage.getItem("fav"));
  }

  useEffect(() => {
    axios
      .get("https://api.npms.io/v2/search?q=reactjs")
      .then((response) => dispatch(addPackages(response.data.results)));
  }, []);

  function handleSubmit() {
    const x = [...selectData];
    const selectedPackage = x.find((ele) => ele.id === select);
    const selectPkgWithMsg = { ...selectedPackage };
    selectPkgWithMsg.msg = msg;
    let allData = [...packageNames, selectPkgWithMsg];
    localStorage.setItem("fav", JSON.stringify(allData));
  }

  return (
    <div className={style.mainBox}>
      <input onChange={(e) => setInput(e.target.value)} />
      {selectData
        .filter((x) => {
          return input !== "" && x.name.includes(input);
        })
        .slice(0, 10)
        .map((ele) => (
          <div key={ele.id} onClick={() => setSelect(ele.id)}>
            <input type="radio" />
            <span>{ele.name}</span>
          </div>
        ))}
      <textarea onChange={(e) => setMsg(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
