const {clientRouter}  = require("./routers/client");
const {homeRouter}  = require("./routers/home");
const {clientsDB} = require("./db/database");
const express = require('express');
const hbs = require('express-handlebars');

const app = express();
app.use(express.urlencoded({
    extended: true,
}));
app.use(express.static( 'public'));
app.engine('.hbs', hbs.engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.use('/client', clientRouter);
app.use('/', homeRouter);
app.get('/test', (req, res) => {
   res.json(clientsDB.readOneClient(
       'c5a50aa0-bed4-48b6-9fcd-ad9e123d342c',
   ))
})

app.listen(3000, 'localhost', () => {
    console.log('Listening on port 3000')
});
