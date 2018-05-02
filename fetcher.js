const request = require('request')
const parser = require('./parser')
const filter = require('./filter')

mainPageLink = "https://papers.gceguide.com/A%20Levels/"

var manager = {
    fetchSubjectLink: function(code, callback) {
        var links = []
        var tags = []
        var subjectID = ""
        request(mainPageLink, function(err, res, body){
            tags = parser.getTags(body)

            tags.forEach(item => {
                parser.getLinks(item, code, function(res) {
                    links.push("https://papers.gceguide.com/A%20Levels/" + res)
                    subjectID = res
                })
            })
            callback(links, subjectID)
        })
    },
    fetchPaperLinks: function(url, filterData, subID, callback) {
        var tags = []
        var links = []
        var validLinks = []
        if (url !== undefined) {
            request(url, function(err, res, body){
                tags = parser.getTags(body)
                for (let index = 0; index < tags.length; index++) {
                    parser.getPDFs(tags[index], filterData, function(res) {
                        links.push("https://papers.gceguide.com/A Levels/" + subID + "/" + res)
                    })
                }
                if (filterData.year !== "") {
                    links.forEach(url => {
                        url = url.toString().substr(url.indexOf("/" + filterData.code) + 1)
                        if (filter.year(url, filterData.year)) {
                            validLinks.push(url)
                        }
                    })
                    links = validLinks
                }
                if (filterData.session !== "d") {
                    validLinks = []
                    links.forEach(url => {
                        url = url.toString().substr(url.indexOf("/" + filterData.code) + 1)
                        if (filter.session(url, filterData.session)) {
                            validLinks.push(url)
                        }
                    })
                    links = validLinks
                }
                if (filterData.type !== "d") {
                    validLinks = []
                    links.forEach(url => {
                        url = url.toString().substr(url.indexOf("/" + filterData.code) + 1)
                        if (filter.ptype(url, filterData.type)) {
                            validLinks.push(url)
                        }
                    })
                    links = validLinks
                }
                if (filterData.num !== "") {
                    validLinks = []
                    links.forEach(url => {
                        url = url.toString().substr(url.indexOf("/" + filterData.code) + 1)
                        if (filter.paper(url, filterData.num)) {
                            validLinks.push(url)
                        }
                    })
                    links = validLinks
                }
                callback(links)
            })
        } else {
            callback(links)
        }
    } 
}

module.exports = manager