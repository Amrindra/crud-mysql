import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books");
        setBooks(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBooks();
    // axios
    //   .get("http://localhost:8800/books")
    //   .then((response) => {
    //     // Handle the successful response
    //     setBooks(response.data); // Assuming the API returns an array of data
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     // Handle errors
    //     console.error("Error fetching data:", error.message);
    //   });
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8800/books/" + id);
      // To refresh the windows
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Amrindra's Book Shop</h1>
      <div className="books">
        {books.map((book) => (
          <div className="book" key={book.id}>
            {/* if there is no cover, don't show */}
            {book.cover && <img src={book.cover} alt="" />}
            <h2>{book.title}</h2>
            <p>{book.desc}</p>
            <span>{book.price}</span>
            <button className="delete" onClick={() => handleDelete(book.id)}>
              Delete
            </button>
            <button className="update">
              <Link to={`/update/${book.id}`}>Update</Link>
            </button>
          </div>
        ))}
      </div>

      <button>
        <Link to="/add">Add New Book</Link>
      </button>
    </div>
  );
};

export default Books;
