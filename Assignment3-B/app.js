const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');

const app = express();
const dbURI = "mongodb://127.0.0.1:27017/crud";

mongoose.connect(dbURI)
  .then(() => {
    console.log("Database connected");
    app.listen(3000, () => console.log("Server listening on port 3000"));

  })
  .catch(err => console.log(err));

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.redirect('/users'));

app.get('/users', async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.render('index', { users, title: 'Home' });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching users");
  }
});

app.get('/user/create', (req, res) => res.render('adduser', { title: 'Add-User' }));

app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.render('details', { user, title: 'User Details' });
  } catch (err) {
    console.log(err);
    res.status(404).render('404', { title: 'User Not Found' });
  }
});

app.get('/edit/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.render('edit', { user, title: 'Edit-User' });
  } catch (err) {
    console.log(err);
    res.status(404).render('404', { title: 'User Not Found' });
  }
});

app.post('/user/create', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.redirect('/users');
  } catch (err) {
    console.log(err);
    res.status(500).send("Error creating user");
  }
});

app.post('/edit/:id', async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/users');
  } catch (err) {
    console.log(err);
    res.status(500).send("Error updating user");
  }
});

app.post('/users/delete/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.redirect('/users');
  } catch (err) {
    console.log(err);
    res.status(500).send("Error deleting user");
  }
});

app.use((req, res) => res.status(404).render('404', { title: 'NotFound' }));

