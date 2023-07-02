import { useState, useEffect } from "react";

const TestHook1 = () => {
   const [status, setStatus] = useState("All");
   const [inputValue, setInputValue] = useState("");
   const [list, setList] = useState([]);
   const [listActive, setListActive] = useState([]);
   const [listCompleted, setListCompleted] = useState([]);

   useEffect(() => {
      const storageList = localStorage.getItem("ListDetail");

      if (storageList) {
         setList(JSON.parse(storageList));
      }
   }, []);

   useEffect(() => {
      const newListActive = list?.filter((item) => item?.active === false);
      const newListCompleted = list?.filter((item) => item?.active === true);

      if (newListActive) {
         setListActive(newListActive);
      }
      if (newListCompleted) {
         setListCompleted(newListCompleted);
      }
   }, [list]);

   const statusClick = (name) => {
      if (name === "All") {
         setStatus("All");
      } else if (name === "Active") {
         setStatus("Active");
      } else if (name === "Completed") {
         setStatus("Completed");
      }
   };

   const inputChange = (e) => {
      setInputValue(e.target.value);
   };

   const genId = () => {
      const Id = Math.floor(Math.random() * 100);
      const check = list?.find((x) => x.id === Id);
      if (check) {
         genId();
      }
      return Id;
   };

   const addBtn = () => {
      if (inputValue) {
         const newUser = {
            id: genId(),
            active: false,
            name: inputValue,
         };
         const newList = [...list, newUser];
         setList(newList);
         setInputValue("");
         localStorage.setItem("ListDetail", JSON.stringify(newList));
      } else {
         alert("Không được để trống");
      }
   };

   const handleCheckboxChange = (e) => {
      const { value, checked } = e.target;
      if (checked) {
         const newList = list?.map((user) => {
            if (user.id === parseInt(value)) {
               return { ...user, active: true };
            }
            return user;
         });
         setList(newList);
         localStorage.setItem("ListDetail", JSON.stringify(newList));
      } else {
         const newList = list?.map((user) => {
            if (user.id === parseInt(value)) {
               return { ...user, active: false };
            }
            return user;
         });
         setList(newList);
         localStorage.setItem("ListDetail", JSON.stringify(newList));
      }
   };

   const actXoa = (id) => {
      const updatedList = list.filter((item) => item.id !== id);
      const updatedListComplete = listCompleted.filter((item) => item.id !== id);
      if (updatedListComplete) {
         setListCompleted(updatedListComplete);
      }
      if (updatedList) {
         setList(updatedList);
         localStorage.setItem("ListDetail", JSON.stringify(updatedList));
      }
   };

   const deleteAll = () => {
      setListCompleted([]);

      const updatedList = list.filter(
         (item) => !listCompleted.some((completedItem) => completedItem.id === item.id)
      );
      setList(updatedList);

      localStorage.setItem("ListDetail", JSON.stringify(updatedList));
   };

   return {
      status,
      inputValue,
      list,
      listActive,
      listCompleted,
      statusClick,
      inputChange,
      addBtn,
      handleCheckboxChange,
      actXoa,
      deleteAll,
   };
};
export default TestHook1;
