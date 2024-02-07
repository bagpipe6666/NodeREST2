const { request } = require('express');

const Sequelize = request('sequelize');
const app = express();

app.use(express.json());

const sequelize = new Sequelize('database', 'username', 'password',{
    host: 'localhost',
    dialect: 'sqlite',
    storage: './Database/SQBooks.sqlite'
});

const Book = sequelize.define('book',{
    id: { 
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    author:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

sequelize.sync();

app.get('/book',(req, res)=>{
    Book.findAll().then(book=>{
        res.json(books);
    });
}).catch(err =>{
    res.status(500).send(err);
});

app.get('/books/:id', (req, res) => {
    Book.findByPk(req.params.id).then(book => {
        if(!book){
            res.status(404).send('Book not Found');
        }else{
            res.json(book);
        }
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.post('/book',(req,res) => {
    Book.create(req.body).then(book => {
        res.send(book);
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.put('/books/"id', (req, res) => {
    Bokk.findByPk(req.params.id).then(book => {
        if(!book){
            res.status(404).send('Book not found');
        }else{
            book.update(res.body).then(() => {
                res.send(book);
            }).catch(err => {
                res.status(500).send(err);
            });
        };
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.delete('/book/:id', (req, res) => {
    Book.findByPk(req.params.id).then(book => {
        if (!book){
            res.status(404).send('Book not found');
        }else{
            book.destroy().then(() => {
                res.send({});
            }).catch(err => {
                res.status(500).send(err);
            });
        }
    }).catch(err => {
        res.status(500).send(err);
    });
});

const port = process.env.POST || 3000;
app.listen(port, () => console.log(`Listening on port ${port}....`));


