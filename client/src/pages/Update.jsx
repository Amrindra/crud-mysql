import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Update = () => {
  const [inputBook, setInputBook] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  // console.log(location.pathname.split("/").findLast((element) => element));
  //Get the last element of the array
  const bookId = location.pathname.split("/")[2];

  const handleChange = (e) => {
    setInputBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:8800/books/" + bookId, inputBook);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h1>Updating the Book</h1>
      <input
        type="text"
        name="title"
        placeholder="Title"
        onChange={handleChange}
      />
      <input
        type="text"
        name="desc"
        placeholder="Desc"
        onChange={handleChange}
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        onChange={handleChange}
      />
      <input
        type="text"
        name="cover"
        placeholder="Cover"
        onChange={handleChange}
      />

      <button type="submit">Update</button>
    </form>
  );
};

export default Update;
