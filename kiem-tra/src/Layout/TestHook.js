import { useState, useEffect } from "react";

const TestHook = () => {
   const [status, setStatus] = useState("All");
   const [inputValue, setInputValue] = useState("");
   const [list, setList] = useState([]);
   const [selectedItems, setSelectedItems] = useState([]);
   const [listActive, setListActive] = useState([]);
   const [listCompleted, setListCompleted] = useState([]);

   useEffect(() => {
      const storedList = localStorage.getItem("ListDetail");
      const storedSelectedItems = localStorage.getItem("SelectedItems");
      if (storedList) {
         setList(JSON.parse(storedList));
      }
      if (storedSelectedItems) {
         setSelectedItems(JSON.parse(storedSelectedItems));
      }
   }, []);

   useEffect(() => {
      const newListActive = list.filter((listItem) => {
         return !selectedItems.some((selectedItem) => selectedItem === listItem.id);
      });
      setListActive(newListActive);

      const newListCompleted = list?.filter((listItem) => {
         return selectedItems?.some((selectedItem) => selectedItem === listItem.id);
      });
      setListCompleted(newListCompleted);
   }, [list, selectedItems]);

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
         const user = {
            id: genId(),
            name: inputValue,
         };
         const newList = [...list, user];
         setList(newList);
         setInputValue("");
         localStorage.setItem("ListDetail", JSON.stringify(newList));
      } else {
         alert("Không được để trống");
      }
   };

   const handleCheckboxChange = (e) => {
      const { value, checked } = e.target;
      let updatedSelectedItems = JSON.parse(JSON.stringify(selectedItems));
      if (checked) {
         updatedSelectedItems = [...updatedSelectedItems, parseInt(value)];
         localStorage.setItem("SelectedItems", JSON.stringify(updatedSelectedItems));
      } else {
         updatedSelectedItems = updatedSelectedItems.filter((item) => item !== parseInt(value));
         localStorage.setItem("SelectedItems", JSON.stringify(updatedSelectedItems));
      }
      setSelectedItems(updatedSelectedItems);
   };

   const actXoa = (id) => {
      const updatedListComplete = listCompleted.filter((item) => item.id !== id);
      const updatedList = list.filter((item) => item.id !== id);
      const updatedSelectedItems = selectedItems.filter((item) => item !== id);
      if (updatedListComplete) {
         setListCompleted(updatedListComplete);
      }
      if (updatedList) {
         setList(updatedList);
         localStorage.setItem("ListDetail", JSON.stringify(updatedList));
      }
      if (updatedSelectedItems) {
         setSelectedItems(updatedSelectedItems);
         localStorage.setItem("SelectedItems", JSON.stringify(updatedSelectedItems));
      }
   };

   const deleteAll = () => {
      setListCompleted([]);

      const updatedList = list.filter(
         (item) => !listCompleted.some((completedItem) => completedItem.id === item.id)
      );
      setList(updatedList);

      const updatedSelectedItems = selectedItems.filter(
         (item) => !listCompleted.some((completedItem) => completedItem.id === item)
      );
      setSelectedItems(updatedSelectedItems);

      localStorage.setItem("ListDetail", JSON.stringify(updatedList));
      localStorage.setItem("SelectedItems", JSON.stringify(updatedSelectedItems));
   };

   return {
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
      deleteAll
   };
};
export default TestHook;
