const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose.connect(
  "mongodb://admin:XEAald62347@node57863-chijom-noderest.proen.app.ruk-com.cloud:11840",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const Book = mongoose.model("Book", {
  id: Number,
  title: String,
  author: String,
});

const app = express();
app.use(bodyParser.json());

// Create
app.post("/books", async (req, res) => {
  try {
    const book = new Book(req.body);
    book.id = (await Book.countDocuments()) + 1;
    await book.save();
    res.send(book);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Read all
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    res.send(books);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Read one
app.get("/books/:id", async (req, res) => {
  try {
    const book = await Book.findOne({ id: req.params.id });
    res.send(book);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update
app.put("/books/:id", async (req, res) => {
  try {
    const book = await Book.findOneAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.send(book);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete
app.delete("/books/:id", async (req, res) => {
  try {
    const book = await Book.findOneAndDelete(req.params.id);
    res.send(book);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});