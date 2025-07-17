const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./config');
const { connectDB } = require('./models');
const authRoutes = require('./routes/auth.routes');
const categoryRoutes = require('./routes/category.routes');
const ServiceRoutes = require('./routes/service.routes');

const app = express();
const PORT = config.port;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

connectDB();


app.use('/api', authRoutes);
app.use('/api', categoryRoutes);
app.use('/api', ServiceRoutes);

app.listen(PORT, () => {
    console.log(`App is up and running on ${PORT}`);
});



