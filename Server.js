const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      connectionString : 'postgres://facerecognizer_database_postgres_user:w9hUTrcbUNPPLb7vYRNexAZjwzWI6tsa@dpg-civq9cs07spr6t9kmem0-a/facerecognizer_database_postgres',
      ssl: { rejectUnauthorized: false },
      host: 'dpg-civq9cs07spr6t9kmem0-a',
      port : 5432,
      user : 'facerecognizer_database_postgres_user',
      password : 'w9hUTrcbUNPPLb7vYRNexAZjwzWI6tsa',
      database : 'facerecognizer_database_postgres'
    }
});



const app = express();
app.use(express.json());
app.use(cors());

// ===================================================

app.get('/', (req, res) => {
    res.send('success');
})


// const database = {
//     users:[
//         {
//             id: '123',
//             name: 'John',
//             email: 'john@gmail.com',
//             password: 'cookies',
//             entries: 0,
//             joined: new Date()
//         },
//         {
//             id: '124',
//             name: 'sally',
//             email: 'sally@gmail.com',
//             password: 'muffins',
//             entries: 0,
//             joined: new Date()
//         }
//     ],
//     login:[
//         {
//             id: '987',
//             hash: '',
//             email: 'john@gmail.com'
//         }
//     ]
// }



app.post('/signin', (req,res) => { signin.handleSignin(req, res, db, bcrypt) })

app.post('/register', (req,res) => { register.handleRegister(req, res, db, bcrypt) })

app.get('/profile/:id', (req,res) => { profile.handleProfile(req, res, db) })


app.put('/image', (req, res) => { image.handleImage(req, res, db) })

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })



app.listen(3000, () =>{
    console.log('Server running on Port:3000');
})

/*
    / -->res = Hey server is at Root
    /signin --> POST -->SUCCESS/FAIL
    /register --> POST -->user
    /profile/:userId --> GET = user
    /image --> PUT --> user
*/