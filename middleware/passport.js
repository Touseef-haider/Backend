const User = require('../SchoolManagementSystem/user');
const {Strategy,ExtractJwt} = require('passport-jwt');


const options = {
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:'secretkey'
}

module.exports = passport =>{
    passport.use(new Strategy(options,async (payload,done)=>{
        await User.findById(payload.User_id).then(user=>{
            if (user) {
                return done(null,user)
            }
            return done(null,false)
        }).catch(err=>{
            return done(null,false)
        })
    }))
}