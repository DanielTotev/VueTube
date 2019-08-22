const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const dotEnv = require('dotenv');
const port = process.env.PORT || 3000;

dotEnv.config({ path: './config/config.env' });

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

app.use(passport.initialize());
require('./config/auth')(passport);

require('./config/db-config')();

require('./config/routes-config')(app);

// handle production
if(process.env.NODE_ENV === 'production') {
    // static folder
    app.use(express.static(__dirname + '/public/'));

    // Handle SPA
    app.get(/.*/, (req, res)=> {
        res.sendFile(__dirname + '/public/index.html');
    });
}

app.listen(port, () => console.log(`Server is up and running on port ${port}`));