import React, { useState } from "react";
import style from "./Wishlist.module.css";

export default function Wishlist() {
  let PkgDataFromLocal = JSON.parse(localStorage.getItem("fav"));
  const [localData, setLocalData] = useState(PkgDataFromLocal);

  function handleDelete(id) {
    const dataAfterDel = localData.filter((item) => item.id !== id);
    setLocalData(dataAfterDel);
    localStorage.setItem("fav", JSON.stringify(dataAfterDel));
    // console.log(dataAfterDel);
  }

  return (
    <>
      <div>{JSON.stringify(PkgDataFromLocal)}</div>
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
                <span>view</span>
                <span>edit</span>
                <span onClick={() => handleDelete(ele.id)}>delete</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
