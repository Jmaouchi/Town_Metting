const express = require('express');
const sequelize = require('./config/connection')
const path = require('path')
const routes = require ('./controllers')


const app = express();
const PORT = process.env.PORT || 3001;

// middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

// setup handlebars later 
// set up Handlebars.js as your app's template engine
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// use all routes from the controllers folder

app.use(routes);

// sequelize will create the tables for us behind the scenes scenes
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});