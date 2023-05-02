import React, { useState } from "react";
import style from "./Wishlist.module.css";
import Button from "../components/buttons/button";
import { MdDelete, MdVisibility } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function Wishlist() {
  let PkgDataFromLocal = JSON.parse(localStorage.getItem("fav"));
  const [localData, setLocalData] = useState(PkgDataFromLocal);
  const navigate = useNavigate();

  function handleDelete(id) {
    const dataAfterDel = localData.filter((item) => item.id !== id);
    setLocalData(dataAfterDel);
    localStorage.setItem("fav", JSON.stringify(dataAfterDel));
    // console.log(dataAfterDel);
  }

  function HandleAddPackage() {
    navigate("/search");
  }

  return (
    <div className={style.mainBox}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h3>Welcome to Favourite NPM Packages</h3>
        {localData.length != 0 && (
          <Button name="Add Fav" onClick={HandleAddPackage} />
        )}
      </div>
      {localData.length !== 0 ? (
        <table>
          <thead>
            <tr>
              <th>Package Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {localData.map((ele) => (
              <tr key={ele.id}>
                <td>{ele.name}</td>
                <td id={style.actions}>
                  <span>
                    <MdVisibility className={style.icons} />
                  </span>
                  <span>
                    <FiEdit className={style.icons} />
                  </span>
                  <span onClick={() => handleDelete(ele.id)}>
                    <MdDelete className={style.icons} />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <NoPackages onClick={HandleAddPackage} />
      )}
    </div>
  );
}

function NoPackages({ onClick }) {
  return (
    <div id={style.emptyBox}>
      <div classname={style.baseFont}>
        You don't have any favs yet. Please add.
      </div>
      <Button name="Add Fav" onClick={onClick} />
    </div>
  );
}
