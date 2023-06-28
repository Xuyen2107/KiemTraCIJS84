import React from "react";
import TestHook from "./TestHook.js";
import "./Test.css";

const Test = () => {
   const {
      status,
      inputValue,
      list,
      selectedItems,
      listActive,
      listCompleted,
      statusClick,
      inputChange,
      addBtn,
      handleCheckboxChange,
      actXoa,
      deleteAll,
   } = TestHook();

   return (
      <div className="test">
         <h1 className="title">#todo</h1>
         <div className="header">
            <button
               className={`${status === "All" ? "header-btn" : ""} btn`}
               type="button"
               onClick={() => {
                  statusClick("All");
               }}
            >
               All
            </button>
            <button
               className={`${status === "Active" ? "header-btn" : ""} btn`}
               type="button"
               onClick={() => {
                  statusClick("Active");
               }}
            >
               Active
            </button>
            <button
               className={`${status === "Completed" ? "header-btn" : ""} btn`}
               type="button"
               onClick={() => {
                  statusClick("Completed");
               }}
            >
               Completed
            </button>
         </div>
         {(status === "All" || status === "Active") && (
            <form className="form-add">
               <input
                  className="form-input"
                  type="text"
                  placeholder="add-detail"
                  value={inputValue}
                  onChange={inputChange}
               />
               <button className="form-btn" type="button" onClick={addBtn}>
                  Add
               </button>
            </form>
         )}
         {status === "All" && (
            <div className="list-detail">
               {list &&
                  list.map((item) => (
                     <div key={item.id} className="checkbox">
                        <input
                           type="checkbox"
                           value={item.id}
                           name={item.name}
                           checked={selectedItems.includes(item.id)}
                           onChange={handleCheckboxChange}
                        />
                        <label className={`${selectedItems.includes(item.id) ? "label" : ""}`}>
                           {item.name}
                        </label>
                     </div>
                  ))}
            </div>
         )}

         {status === "Active" && (
            <div className="list-detail">
               {listActive &&
                  listActive.map((item) => (
                     <div key={item.id} className="checkbox">
                        <input
                           type="checkbox"
                           value={item.id}
                           name={item.name}
                           checked={selectedItems.includes(item.id)}
                           onChange={handleCheckboxChange}
                        />
                        <label>{item.name}</label>
                     </div>
                  ))}
            </div>
         )}

         {status === "Completed" && (
            <div className="list-detail">
               {listCompleted &&
                  listCompleted.map((item) => (
                     <div className="delete" key={item.id}>
                        <div className="checkbox">
                           <input
                              type="checkbox"
                              value={item.id}
                              name={item.name}
                              checked={selectedItems.includes(item.id)}
                              onChange={handleCheckboxChange}
                           />
                           <label className={`${selectedItems.includes(item.id) ? "label" : ""}`}>
                              {item.name}
                           </label>{" "}
                        </div>
                        <button
                           className="delete_btn"
                           type="button"
                           onClick={() => actXoa(item.id)}
                        >
                           <i className="fa-solid fa-trash"></i>
                        </button>
                     </div>
                  ))}
               <button className="delete-all" onClick={deleteAll}>
                  Xóa tất cả
               </button>
            </div>
         )}
      </div>
   );
};

export default Test;
