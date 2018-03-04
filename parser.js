var validate = require('./validator')

var parser = {
    getTags: function(content) {
        content = String(content)
        var tag = ""
        var tags = []

        for (let index = 0; index < content.length; index++) {
            if (content.substr(index, 2) == "<a") {
                tag = "<a"
                index = index + 2
                while (content.substr(index, 1) !== ">") {
                    tag += content.substr(index, 1)
                    index++
                }
                tag = tag + ">"
                tags.push(tag)
            }
        }
        return tags
    },
    getLinks: function(tag, code, callback) {
        tag = String(tag)
        var link = ""

        for (let index = 0; index < tag.length; index++) {
            if (tag.substr(index, 4) == "href") {
                index = index + 6
                while (tag.substr(index, 1) !== '"') {
                    link += tag.substr(index, 1)
                    index++
                }
            }
        }
        if (validate.isValidSubjectLink(link, code)) {
            callback(link)
        }
    },
    getPDFs: function(tag, callback) {
        tag = String(tag)
        var link = ""

        for (let index = 0; index < tag.length; index++) {
            if (tag.substr(index, 4) == "href") {
                index = index + 6
                while (tag.substr(index, 1) !== '"') {
                    link += tag.substr(index, 1)
                    index++
                }
            }
        }
        if (validate.isValidPaperLink(link)) {
            callback(link)
        }
    }
}

module.exports = parser