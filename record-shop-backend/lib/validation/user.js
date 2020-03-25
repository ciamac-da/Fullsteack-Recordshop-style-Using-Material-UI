const {check} = require('express-validator')

exports.userValidationRules = [
    check('email').isEmail(),
    check('firstName').isLength({min:3})
]