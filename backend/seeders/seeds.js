const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
const Tweet = require('../models/Tweet');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');

const NUM_USERS = 10;
const NUM_TWEETS = 30;

const users = [];

users.push(
    new User ({
        username: 'demo-user',
        email: 'demo-user@gmail.com',
        hashedPassword: bcrypt.hashSync('password', 10)
    })
)

for (let i = 0; i < NUM_USERS; i++) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    users.push(
        new User ({
            username: faker.internet.userName(firstName, lastName),
            email: faker.internet.email(firstName, lastName),
            hashedPassword: bcrypt.hashSync(faker.internet.password(), 10)
        })
    )
}

const tweets = [];

for (i = 0; i < NUM_TWEETS; i++) {
    tweets.push(
        new Tweet ({
            text: faker.hacker.phrase(),
            author: users[Math.floor(Math.random() * NUM_USERS)]._id
        })
    )
}

const insertSeeds = () => {
    console.log("Resetting db and seedinng users and tweets...");

User.collection.drop()
                .then(() => Tweet.collection.drop())
                .then(() => User.insertMany(users))
                .then(() => Tweet.insertMany(tweets))
                .then(() => {
                    console.log("Done!");
                    mongoose.disconnect();
                })
                .catch(err => {
                    console.error(err.stack);
                    process.exit(1);
                });
}

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to MongoDB successfully');
        insertSeeds();
    })
    .catch(err => {
        console.log(err.stack);
        process.exit(1);
    });