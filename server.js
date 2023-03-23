const express = require('express');
// const sequelize = require('sequelize')
const path = require('path')


const app = express();
const PORT = process.env.PORT || 3001;

// middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req,res) => {
  console.log('sup');
})


app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));