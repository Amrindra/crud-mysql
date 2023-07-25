import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

// This is a middleware and it allows us to send any json data by using "req.body"
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Amrin",
  database: "test",
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
    return;
  }
  console.log("Connected to the MySQL database");
});

app.get("/", (req, res) => {
  res.json("Hello from the backend");
});

app.get("/books", (req, res) => {
  const query = "SELECT * FROM books";
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/books", (req, res) => {
  const { title, desc, cover, price } = req.body;

  // Execute the INSERT query
  const query =
    "INSERT INTO books (`title`, `desc`, `price`, `cover`) VALUES (?)";
  const values = [title, desc, price, cover];

  db.query(query, [values], (err, result) => {
    if (err) {
      console.error("Error executing query:", err.message);
      return res.status(500).json({ error: "Failed to add user" });
    }

    console.log("Data added successfully");
    return res.status(201).json("Data added successfully");
  });
});

// UPDATE
app.put("/books/:id", (req, res) => {
  const { title, desc, cover, price } = req.body;

  const bookId = req.params.id; //This comes from the book/:id
  const query =
    "UPDATE books SET `title` = ?, `desc` = ?, `cover`= ?, `price` = ? WHERE id = ?";

  const values = [title, desc, cover, price];

  //in  this case the WHERE id = bookId
  db.query(query, [...values, bookId], (err, result) => {
    if (err) {
      console.error("Cannot update the book", err.message);
      return res.status(500).json({ error: "Failed to udpate book" });
    }

    console.log("Book has been updated successfully");
    return res.status(201).json("Book has been updated successfully");
  });
});

// DELETE
app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id; //This comes from the book/:id
  const query = "DELETE FROM books WHERE id = ?";

  db.query(query, [bookId], (err, result) => {
    if (err) {
      console.error("Cannot delete the book", err.message);
      return res.status(500).json({ error: "Failed to delete book" });
    }

    console.log("Book has been deleted successfully");
    return res.status(201).json("Book has been deleted successfully");
  });
});

app.listen(8800, () => {
  console.log("Connected to backend!");
});
