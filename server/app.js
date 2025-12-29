import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import express from 'express';


const app = express();
const PORT = 3000;


app.use(cors());
app.use(express.json());

const sessions = {};


function authRequired(req, res, next) {
    const sessionId = req.headers['x-session-id'];
    const userId = sessions[sessionId];

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    req.userId = userId;
    next();
}


mongoose.connect(
    "mongodb+srv://givan2981_db_user:0973iwg53@forexam.e5djxvd.mongodb.net/ForExam?retryWrites=true&w=majority&appName=ForExam"
)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB error:", err));

//Schema for mongodb (car)
const CarSchema = new mongoose.Schema({
    Brand: String,
    Model: String,
    Wheeldrive: String,
    Price: Number,
    Color: String,
    Mileage: Number,
    ImgURL: String,
    SliderImages: String,
}, { timestamps: true });

const Car = mongoose.model("Car", CarSchema, "Cars");

//Schema for mongodb (test drive)
const TestDriveSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    carId: { type: mongoose.Schema.Types.ObjectId, required: true },

    fullname: String,
    email: String,
    phone: String,
    preferredDate: String,
    preferredTime: String,
    comment: String,

    status: { type: String, default: 'requested' },
}, { timestamps: true });

const TestDrive = mongoose.model('TestDrive', TestDriveSchema, 'TestDrives');

//Schema for mongodb (order)
const OrderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    carId: { type: mongoose.Schema.Types.ObjectId, required: true },

    fullname: String,
    email: String,
    phone: String,
    address: String,
    date: String,
    time: String,
    comment: String,

    status: { type: String, default: 'in_process' },

    type: {
        type: String,
        enum: ['purchase', 'test-drive'],
        default: 'purchase'
    },
    progress: {
        type: String,
        default: 'in process'
    }
}, { timestamps: true });

const Order = mongoose.model('Order', OrderSchema, 'Orders');

//Schema for mongodb (user)
const UserSchema = new mongoose.Schema({
    UserName: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
        unique: true,
    },
    Password: {
        type: String,
        required: true,
    },
    Phone: {
        type: String,
    },
    Role: {
        type: String,
        enum: ['User', 'Admin'],
        default: 'User',
    },
}, { timestamps: true });

const User = mongoose.model('User', UserSchema, 'Users');

//Back for cars
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

//Back for test drives
app.get('/api/test-drives', async (req, res) => {
    try {
        const tds = await TestDrive.find().sort({ createdAt: -1 });
        res.json(tds);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching test drives' });
    }
});

app.get('/api/test-drives/:id', async (req, res) => {
    try {
        const td = await TestDrive.findById(req.params.id);
        res.json(td);
    } catch (error) {
        res.status(404).json({ error: 'Test drive not found' });
    }
});

app.delete('/api/test-drives/:id', async (req, res) => {
    try {
        const deletedTD = await TestDrive.findByIdAndDelete(req.params.id);
        res.json({ message: "Test drive deleted", testDrive: deletedTD });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting test drive' });
    }
})

app.put('/api/test-drives/:id', authRequired, async (req, res) => {
    try {
        const updatedTD = await TestDrive.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedTD);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating test drive' });
    }
})

app.patch('/api/test-drives/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await TestDrive.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Test drive not found' });
    return res.status(200).json(updated);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Failed to update test drive status' });
  }
});

//Back for orders
app.get('/api/orders/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        res.json(order);
    } catch (error) {
        res.status(404).json({ error: 'Order not found' });
    }
});

app.delete('/api/orders/:id', async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        res.json({ message: "Order deleted", order: deletedOrder });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting order' });
    }
});

app.put('/api/orders/:id', authRequired, async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating order' });
    }
})

app.get('/api/orders', async (req, res) => {
    try {
        const orders = await Order
            .find()
            .sort({ createdAt: -1 });

        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching orders' });
    }
});

app.patch('/api/orders/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const updated = await Order.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updated) return res.status(404).json({ message: 'Order not found' });
        return res.status(200).json(updated);
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Failed to update order status' });
    }
});

//Back for users (registration and login)
app.post('/api/register', async (req, res) => {
    try {
        const { UserName, Email, Password, Phone, Role } = req.body;

        const existingUser = await User.findOne({ Email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(Password, 10);

        const newUser = await User.create({
            UserName,
            Email,
            Password: hashedPassword,
            Phone,
            Role: Role || 'User',
        });

        res.status(201).json({
            id: newUser._id,
            UserName: newUser.UserName,
            Email: newUser.Email,
            Phone: newUser.Phone,
            Role: newUser.Role,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Registration error' });
    }
});


app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ Email: email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.Password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const sessionId = crypto.randomUUID();
        sessions[sessionId] = user._id;

        res.json({
            user: {
                id: user._id,
                UserName: user.UserName,
                Email: user.Email,
                Phone: user.Phone,
                Role: user.Role,
            },
            sessionId,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Login error' });
    }
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


app.post('/api/pay', async (req, res) => {
    const { items, userId } = req.body;

    for (const item of items) {

        if (item.type === 'purchase') {
            await Order.create({
                userId,
                carId: item.id,
                ...item.data,
                status: 'paid',
                type: 'purchase',
                progress: 'paid',
            });
        }

        if (item.type === 'test-drive') {
            await TestDrive.create({
                userId,
                carId: item.id,
                preferredDate: item.date,
                preferredTime: item.time,
                comment: item.data?.comment || '',
                status: 'scheduled',
            });
        }
    }

    res.json({ success: true });
});
