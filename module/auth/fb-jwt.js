var request = require('request');
const resMessage = require('../utils/responseMessage');
const statusCode = require('../utils/statusCode');
const authUtil = require('../utils/authUtil');

module.exports = {
    login: (req, res, next) => {
        var accessToken = req.headers.access_token;
        var api_url = 'https://graph.facebook.com/v5.0/me?access_token=' + accessToken + '&fields=id,name,friends';
        var options = {
            url: api_url,
        };

        if (!accessToken){
            return res.statusCode(400).send(authUtil.successFalse(statusCode.BAD_REQUEST, resMessage.EMPTY_TOKEN));
        }

        request.get(options, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                var data = JSON.parse(body)
                // console.log(data.friends.data)
                // req.decoded.id = data.id
                // req.decoded.name = data.name
                // req.decoded.friends = data.friends.data
                req.decoded = {
                    id: data.id,
                    name: data.name,
                    friends: data.friends.data
                };
                next();
            } else {
                res.status(500).send(authUtil.successFalse(statusCode.BAD_REQUEST, resMessage.INTERNAL_SERVER_ERROR));
            }
        });
    }
}