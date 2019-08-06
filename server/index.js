const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const port = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
require('./config/auth')(passport);

require('./config/db-config')();

require('./config/routes-config')(app);

app.listen(port, () => console.log(`Server is up and running on port ${port}`));