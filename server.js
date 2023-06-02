const express = require('express');
// Call the connection to the database using sequelize 
const sequelize = require('./config/connection')
// require the path package, to be able to use it when we want to access outside paths from html. like css and js files
const path = require('path')
// Require the controllers to be able to get the data from the api's
const routes = require ('./controllers')
 
// Require express package to build the express server
const app = express();
// Set up a port
const PORT = process.env.PORT || 3001;

// middlewares
app.use(express.json()) // this is to get the data as json format
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public'))); 


// set up Handlebars.js as your app's template engine
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


// set code to use express-session and sequelize.store
// This code sets up an Express.js session and connects the session to our Sequelize database
const session = require('express-session');
const { log } = require('console');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: process.env.DB_SECRET,
  cookie: {}, // add maxAge: 900000  inside the cookies, to add a timer
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};
// use sessions
app.use(session(sess));



// use all routes from the controllers folder
app.use(routes);

// sequelize will create the tables for us behind the scenes scenes
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});