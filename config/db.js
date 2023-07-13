const mongoose = require('mongoose');

module.exports = () => {
    return mongoose.connect(
        {
    mongoURI: process.env.mongoURI,
    jwtSecret: process.env.jwtSecret
}
    )
}
