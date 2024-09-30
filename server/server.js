const express = require('express');
const app = express();
const dotenv = require ('dotenv');
dotenv.config();
const path = require('path');

const mongoConnect = require('./db/connect');

const router = require('./routes/movieroutes');

//>>>>?



app.use(express.static("../client"));
app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use(router);



// database connection
mongoConnect();

app.use(express.json({ limit: '2045mb' })); 
app.use(express.urlencoded({ extended: true, limit: '2045mb' }));


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`)
});