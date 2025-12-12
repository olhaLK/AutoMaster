import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
const PORT = 3000;


app.use(cors());
app.use(express.json());


mongoose.connect(
    "mongodb+srv://givan2981_db_user:0973iwg53@forexam.e5djxvd.mongodb.net/ForExam?retryWrites=true&w=majority&appName=ForExam"
)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB error:", err));


const CarSchema = new mongoose.Schema({
    Brand: String,
    Model: String,
    Wheeldrive: String,
    Price: Number,
    Color: String,
    Mileage: Number,
    ImageMain: String,
    SliderImages: [String],
}, { timestamps: true });

const Car = mongoose.model("Car", CarSchema, "Cars");





app.get('/api/cars', async (req, res) => {
    try {
        const cars = await Car.find();
        res.json(cars);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching cars' });
    }
});


app.post('/api/cars', async (req, res) => {
    try {
        const car = await Car.create(req.body);
        res.json(car);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error adding car' });
    }
});


app.put('/api/cars/:id', async (req, res) => {
    try {
        const updatedCar = await Car.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedCar);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating car' });
    }
});


app.delete('/api/cars/:id', async (req, res) => {
    try {
        const deletedCar = await Car.findByIdAndDelete(req.params.id);
        res.json({ message: "Car deleted", car: deletedCar });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting car' });
    }
});

app.get('/api/cars/:id', async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        res.json(car);
    } catch (err) {
        res.status(404).json({ error: "Car not found" });
    }
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
