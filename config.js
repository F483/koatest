module.exports = {
    jwt_expire: '1h',
    jwt_secret: process.env.JWT_SECRET,  // errors on start if not set
    port: process.env.PORT || 3000
}
