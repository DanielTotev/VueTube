const validator = require('validator');
const errors = [];

module.exports = (email, password) => {
    if(email === null || email === undefined || email === '') {
        errors.push('Plaese provide valid email!');
    }
    
    if(!validator.isEmail(email)) {
        errors.push('Plaese provide valid email!');
    }

    if(password === null || password === undefined || password === '') {
        errors.push('Passsword is required!');
    }

    if(!validator.isLength(password, { min: 3 }) || !validator.isAlphanumeric(password)) {
        errors.push('Plaese provide valid password');
    }

    return new Set(errors);
}