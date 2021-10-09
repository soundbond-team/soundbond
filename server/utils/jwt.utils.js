var jwt = require('jsonwebtoken');
const JWT_SIGN_SECRET ='0sjs6gfmk9nwxq22pzn5hvpxmpgtty34tfx';

module.exports = {
    generateTokenForUser: function(userData){
        return jwt.sign({
            userId: userData.id,
            isAdmin: userData.isAdmin
        },
        JWT_SIGN_SECRET,
        {
            expiresIn:'1h'
        })

        
    }

}