const express = require ('express');
const path = require ('path');
const bodyParser = require ('body-parser');
const cors = require ('cors');
const passport = require ('passport');
const mongoose = require ('mongoose');

const app = express();

const users = require('./routes/users');

// Database
const config = require('./config/database');

// Connect
mongoose.connect(config.database, { useNewUrlParser: true });

// On connect
mongoose.connection.on('connected', () => {
	console.log('Connected to database: ' + config.database);
});

// On Error
mongoose.connection.on('error', (err) => {
	console.log('Database error: ' + err);
});

// Port Number
const port = process.env.PORT || 8080;

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

// Index Route
app.get('/', (req, res) => {
	res.send('Invalido');
});

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'public/Index.html'));
});

// Start Server
app.listen(port, () => {
	console.log("Server started on port: " + port);
}); 