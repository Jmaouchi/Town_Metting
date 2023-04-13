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


// set code to use express-session and sequelize.store
// This code sets up an Express.js session and connects the session to our Sequelize database
const session = require('express-session');

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