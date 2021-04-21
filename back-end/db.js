const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const url = `mongodb+srv://yushin420:Dbtlsld9317@travelwise.dwvrv.mongodb.net/users?retryWrites=true&w=majority`;
const client = new MongoClient(url);

client.connect();
const User = new mongoose.Schema({
    fullname: String,
    email: String,
    password: String
});

mongoose.model('User', User);

const Pollschema = new mongoose.Schema({
    name: String,
    date: String,
    message: String,
    opa: String,
    opb: String,
    opc: String
});

mongoose.model('Pollschema', Pollschema);
const Pref = new mongoose.Schema({
    budget: Number,
    time: String,
    length: Number,
    type: String,
    rating: Number,
    transport: String
});

mongoose.model('Pref', Pref);

const Itin = new mongoose.Schema({
    type: String,
    name: String,
    location: String,
    time: String
});

mongoose.model('Itin', Itin);

mongoose.connect(url)
    .then(() => {
        console.log('Connected to database!')
    })
    .catch((err) => {
        console.error(`Error connecting to the database. \n${err}`);
    });

