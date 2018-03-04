var validate = {
    isValidPaperLink: function(url) {
        if (url.substr(url.length-4) == ".pdf") {
            return true
        } else {
            return false
        }
    },

    isValidSubjectLink: function(url, code) {
        if (url.substr(url.length-6, 4) == code) {
            return true
        } else {
            return false
        }
    }
}

module.exports = validate