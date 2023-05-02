import React, { useEffect, useState } from "react";
import style from "./Search.module.css";
import axios from "axios";
import { addPackages, allPackagesSlice } from "../redux/packageSlice";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/buttons/button";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const selectData = useSelector((state) => state.packages.packages);
  const [input, setInput] = useState("");
  const [select, setSelect] = useState("");
  const [msg, setMsg] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    setInput("");
    setSelect(null);
    setMsg("");
  }

  function handleNavigation() {
    navigate("/");
  }

  return (
    <div>
      <div className={style.mainBox}>
        <div
          style={{
            alignSelf: "start",
            fontWeight: "900",
            color: "#576775",
            fontSize: "18px",
            alignSelf: "start",
          }}
        >
          Search for NPM Packages
        </div>
        <input id={style.input} onChange={(e) => setInput(e.target.value)} />
        <div
          style={{
            alignSelf: "start",
            fontWeight: "900",
            color: "#576775",
            fontSize: "15px",
            alignSelf: "start",
          }}
          classname={style.baseFont}
        >
          Results
        </div>
        <div id={style.packageMap}>
          {selectData
            .filter((x) => {
              return input !== "" && x.name.includes(input);
            })
            // .slice(0, 10)
            .map((ele) => (
              <div
                style={{ alignSelf: "start", fontSize: "20px" }}
                key={ele.id}
                onClick={() => setSelect(ele.id)}
              >
                <input type="radio" />
                <span>{ele.name}</span>
              </div>
            ))}
        </div>
        <div
          style={{
            alignSelf: "start",
            fontWeight: "900",
            color: "#576775",
            fontSize: "18px",
            alignSelf: "start",
          }}
          classname={style.baseFont}
        >
          Why is this your favourite?
        </div>
        <textarea
          id={style.textArea}
          onChange={(e) => setMsg(e.target.value)}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
            gap: "2rem",
          }}
        >
          <Button name="Go To Fav" onClick={handleNavigation} />
          <Button name="Submit" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
}
