var fetch = require('node-fetch')
var uj = require('url-join')

var apiUrl = process.env.CREDENTIALS_API_URL
var mockTlsTermination = {}

if (process.env.MOCK_TLS_TERMINATION) {
    mockTlsTermination = {
        'X-Forwarded-Proto': 'https'
    }
}

async function verify_user(username, password) {
    return fetch(
        uj(apiUrl, '/account/auth'),
        {
            method: 'POST',
            body: JSON.stringify({ username: username, password: password }),
            headers: {
                'Content-Type': 'application/json',
                ...mockTlsTermination
            }
        })
        .then(function (res) {
            return res.json();
        })
}

var credentialsApi = {
    verify_user: async function (user, secret) {
        return verify_user(user, secret)
    }
};

module.exports = credentialsApi;
