const request = require('request')
const parser = require('./parser')

mainPageLink = "http://papers.xtremepapers.com/CIE/Cambridge%20International%20A%20and%20AS%20Level/"

var manager = {
    fetchSubjectLink: function(code, callback) {
        var links = []
        var tags = []
        request(mainPageLink, function(err, res, body){
            body = decodeURI(body)
            tags = parser.getTags(body)
            for (let index = 0; index < tags.length; index++) {
                parser.getLinks(tags[index], code, function(res) {
                    links.push("http://papers.xtremepapers.com/" + res.substr(15))
                })
            }
            callback(links)
        })
    },
    fetchPaperLinks: function(url, callback) {
        var tags = []
        var links = []
        if (url !== undefined) {
            request(url, function(err, res, body){
                body = decodeURI(body)
                tags = parser.getTags(body)
                for (let index = 0; index < tags.length; index++) {
                    parser.getPDFs(tags[index], function(res) {
                        links.push("http://papers.xtremepapers.com/" + res.substr(3))
                    })
                }
                callback(links)
            })
        } else {
            callback(links)
        }
    } 
}

module.exports = manager