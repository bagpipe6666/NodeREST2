// require("dotenv").config();

// const express = require("express");
// const app = express();
// const port = process.env.PORT || 3000; // ถ้าไฟล์ .env ไม่ใส่ค่า port ให้ใช้ port 3000

// app.get("/", (req, res) => {
//   res.send("hello world chack nodemon chisanucha");
// });

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });


// ----------------------------------------------------

// require("dotenv").config();
// const express = require("express");
// const app = express();

// app.use(express.json());

// let books = [
//     {
//         id: 1,
//         title: 'book1',
//         author: 'Author 1'
//     },
//     {
//         id: 2,
//         title: 'book2',
//         author: 'Author 2'
//     },
//     {
//         id: 3,
//         title: 'book3',
//         author: 'Author 3'
//     }
// ]

// app.get('/books', (req, res) => {
//     res.json(books);
// })

// app.get('/books/:id', (req, res) => {

//     const book = books.find(b => b.id === parseInt(req.params.id));
//     if (!book) res.status(404).send("book not found");
//     res.json(book);

// })

// app.post('/books', (req, res) => {

//     const book = {
//         id: books.length + 1,
//         title: req.body.title,
//         author: req.body.author
//     }
//     books.push(book);
//     res.send(book);

// })

// app.put('/books/:id', (req, res) => {

//     const book = books.find(b => b.id === parseInt(req.params.id));
//     if (!book) res.status(404).send("book not found");
//     book.title = req.body.title;
//     book.author = req.body.author;
//     res.json(book);
// })

// app.delete('/books/:id', (req, res) => {
//     const book = books.find(b => b.id === parseInt(req.params.id));
//     if (!book) res.status(404).send("book not found");
//     const index = books.indexOf(book);
//     books.splice(index, 1);
//     res.json(book);
// })

// const port = process.env.PORT || 3000;
// app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));


// ------------------------------------------------------------------------------------------------


// const express = require('express');
// const sqlite3 = require('sqlite3');
// const app = express();

// // connect to database
// const db = new sqlite3.Database('./Database/Book.sqlite');

// // parse incoming requests 
// app.use(express.json());

// // create books table if it doesn't exist 
// db.run(`CREATE TABLE IF NOT EXISTS books( 
//     id INTEGER PRIMARY KEY,
//     title TEXT,
//     author TEXT 
// )`)



// // route to get all books 
// app.get('/books', (req, res) => {
//     db.all('SELECT * FROM books', (err, rows) => {
//         if (err) {
//             res.status(500).send(err);
//         } 
//         else {
//             res.json(rows);
//         }
//     });
// });


// // route to get a book by id
// app.get('/books/:id', (req, res) => {
//     db.get('SELECT * FROM books WHERE id = ?', req.params.id, (err, row) => {
//         if (err) {
//             res.status(500).send(err);
//         } else {
//             if (!row) {
//                 res.status(404).send('Book not found');
//             } else {
//                 res.json(row);
//             }
//         }
//     });
// });



// // route to create a new book
// app.post('/books', (req, res) => {
//     const book = req.body;
//     db.run('INSERT INTO books (title, author) VALUES (?, ?)', book.title, book.author, function (err) {
//         if (err) {
//             res.status(500).send(err);
//         } else {
//             book.id = this.lastID;
//             res.send(book);
//         }
//     });
// });

// // route to update a book
// app.put('/books/:id', (req, res) => {
//     const book = req.body;
//     db.run('UPDATE books SET title= ?, author = ? WHERE id = ?', book.title, book.author, req.params.id, function (err) {
//         if (err) {
//             res.status(500).send(err);
//         } else {
//             res.send(book);
//         }
//     });
// });



// // route to delete a book
// app.delete('/books/:id', (req, res) => {
//     db.run('DELETE FROM books WHERE id = ?', req.params.id, function (err) {
//         if (err) {
//             res.status(500).send(err);
//         } else {
//             res.send({});
//         }
//     });
// });
// const port = process.env.PORT || 3000;
// app.listen(port, () => console.log(`Listening on port ${port}...`))

// -------------------------------------

// const express = require('express');
// const Sequelize = require('sequelize');
// const app = express();

// app.use(express.json());

// const dbUrl = 'postgres://webadmin:ZQRrqi91106@node57862-chijom-noderest.proen.app.ruk-com.cloud/Books'; // postPg
// const sequelize = new Sequelize(dbUrl);
// // const sequelize = new Sequelize('database', 'username', 'password',{
// //     host: 'localhost',
// //     dialect: 'sqlite',
// //     storage: './Database/SQBooks.sqlite'
// // });


// const Book = sequelize.define('book',{
//     id: { 
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         primaryKey: true
//     },
//     title:{
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     author:{
//         type: Sequelize.STRING,
//         allowNull: false
//     }
// });

// sequelize.sync();

// app.get('/books',(req, res)=>{
//     Book.findAll().then(books=>{
//         res.json(books);
//     }).catch(err =>{
//         res.status(500).send(err);
// });
// });

// app.get('/books/:id', (req, res) => {
//     Book.findByPk(req.params.id).then(book => {
//         if(!book){
//             res.status(404).send('Book not Found');
//         }else{
//             res.json(book);
//         }
//     }).catch(err => {
//         res.status(500).send(err);
//     });
// });

// app.post('/books',(req,res) => {
//     Book.create(req.body).then(book => {
//         res.send(book);
//     }).catch(err => {
//         res.status(500).send(err);
//     });
// });

// app.put('/books/:id', (req, res) => {
//     Book.findByPk(req.params.id).then(book => {
//         if(!book){
//             res.status(404).send('Book not found');
//         }else{
//             book.update(req.body).then(() => {
//                 res.send(book);
//             }).catch(err => {
//                 res.status(500).send(err);
//             });
//         };
//     }).catch(err => {
//         res.status(500).send(err);
//     });
// });

// app.delete('/books/:id', (req, res) => {
//     Book.findByPk(req.params.id).then(book => {
//         if (!book){
//             res.status(404).send('Book not found');
//         }else{
//             book.destroy().then(() => {
//                 res.send({});
//             }).catch(err => {
//                 res.status(500).send(err);
//             });
//         }
//     }).catch(err => {
//         res.status(500).send(err);
//     });
// });

// const port = process.env.POST || 3000;
// app.listen(port, () => console.log(`Listening on port ${port}....`));

//------------------------------------------------------------

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors')

mongoose.connect(
  "mongodb://admin:XEAald62347@node57863-chijom-noderest.proen.app.ruk-com.cloud:11840",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const Book = mongoose.model("Book", {
  id: {
    type: Number,
    unique:true,
    required: true,
  },
  title: String,
  author: String,
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Create
app.post("/books", async (req, res) => {
  try {
    const lastBook = await Book.findOne().sort({id: -1});
    const nextId = lastBook ? lastBook.id + 1 :1;
    
    const book = new Book({
        id: nextId,
        ...req.body,
    });

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
    const book = await Book.findOneAndUpdate({id:req.params.id}, req.body, {
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
    const book = await Book.findOneAndDelete({id:req.params.id});
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