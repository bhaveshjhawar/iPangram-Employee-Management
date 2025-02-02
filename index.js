require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db.config');
const adminRoutes = require('./routes/adminRoutes');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

connectDB();
app.use('/api', adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
