const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

const { User } = require('./models');

// sapp.use(require('./routes'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('./routes'));


mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://conner11:USCaptain33@cluster0.tnjjm.mongodb.net/social-network-api', {
  
  useNewUrlParser: true,
  useUnifiedTopology: true
} )
  
mongoose.set('debug', true)


app.listen(PORT, () => console.log(`local host :${PORT}`));