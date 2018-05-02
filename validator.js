// var filter = require('./filter')

var validate = {
    isValidPaperLink: function(url, filterData) {
        if (url.substr(url.length-4) == ".pdf") {
            if (url.substr(9,2) == 'qp' || url.substr(9,2) == 'ms') {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
        // console.log(url + ": =>  " + check)
        return check
    },

    isValidSubjectLink: function(url, code) {
        if (url.substr(url.length-5, 4) == code) {
            return true
        } else {
            return false
        }
    }
}

module.exports = validate