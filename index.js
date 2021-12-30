const {clientRouter}  = require("./routers/client");
const {homeRouter}  = require("./routers/home");
const {database} = require("./db/database");
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
   database.deleteDatabaseUser(
       'ef7f3325-1333-4adc-a5d2-3c32aca3e2d9',
   )
    res.send('ok')
})

app.listen(3000, 'localhost', () => {
    console.log('Listening on port 3000')
});
