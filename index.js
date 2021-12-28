const {clientRouter}  = require("./routers/client");
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
app.listen(3000, 'localhost', () => {
    console.log('Listening on port 3000')
});
