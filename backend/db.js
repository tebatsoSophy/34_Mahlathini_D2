// db.js
const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://u22611704:ZqXwiyPDGiGy9Wv6@imy220prac.p77nn.mongodb.net/?retryWrites=true&w=majority&appName=imy220PRAC"; // Replace with your connection string
const client = new MongoClient(uri);

async function connectDB() {
    try {
        await client.connect();
        console.info("Connected to MongoDB");
        return client.db("ProjectDB"); // Replace with your DB name
    } catch (error) {
        console.error("Could not connect to MongoDB:", error);
        process.exit(1);
    }
}

module.exports = connectDB;

