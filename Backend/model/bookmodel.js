import mongoose from "mongoose";

// MongoDB connection string
const mongoDBURI = "mongodb://localhost:27017/bookStore";

// Connect to MongoDB database
mongoose.connect(mongoDBURI)
.then(() => console.log("Connected to MongoDB"))
.catch(error => console.log("Error", error));


// Define the book schema and model
const bookSchema = new mongoose.Schema({
    name: String,
    price: Number,
    category: String,
    image: String,
    title: String,
});

const Book = mongoose.model("Book", bookSchema);

// Define controller functions
export const getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json(error);
    }
};

// You can add other controller functions here

export default Book;
