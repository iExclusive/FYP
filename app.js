const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes');

const app = express();
app.use(bodyParser.json());
app.use('/products', productRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/db', { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
