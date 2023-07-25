import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [inputBook, setInputBook] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/books", inputBook);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h1>Add New Book</h1>
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

      <button type="submit">Add</button>
    </form>
  );
};

export default Add;
