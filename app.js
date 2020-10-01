const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./config/database');

//do not allow insecure access not a safe option
// const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
// const insecureHandlebars = allowInsecurePrototypeAccess(exphbs);

//test db
db.authenticate()
    .then(() => console.log('Database connected... '))
    .catch(err => console.log('Error' + err));

const app = express();

//handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//body parser
app.use(bodyParser.urlencoded({ extended: false }));

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//index route
app.get('/', (req, res) => res.render('index', { layout: 'landing' }));

//gig routes
app.use('/gigs', require('./routes/gigs'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`listening on the port ${PORT}`));