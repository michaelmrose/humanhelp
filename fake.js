let mongoose = require('mongoose')
require('dotenv').config()
const Location = require('./models/location')
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;

db.on('connected', async function() {
  console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
await Location.deleteMany({})
await Location.create({
    name: "Narnia: Home Depot",
    password: "beetleguise",
    authorizedUsers: [],
    requests: [],
})
await Location.create({
    name: "Narnia: Best Buy",
    password: "beetleguise",
    authorizedUsers: [],
    requests: [],
})

await Location.create({
    name: "Narnia: Lowes",
    password: "beetleguise",
    authorizedUsers: [],
    requests: [],
})
process.exit()
});
