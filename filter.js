var filter = {
    year: function(lnk, yearCode) {
        if (lnk.substr(6, 2) == yearCode.substr(2, 2)) {
            return true
        } else {
            return false
        }
    },
    session: function(lnk, sessionID) {
        if (lnk.substr(5, 1) == "s" || lnk.substr(5, 1) == "w") {
            if (lnk.substr(5, 1) == sessionID) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    },
    ptype: function(lnk, ptype) {
        if (lnk.substr(9, 2) == "qp" || lnk.substr(9, 2) == "ms") {
            if (lnk.substr(9, 2) == ptype) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    },
    paper: function(lnk, paper) {
        if (lnk.substr(12, 1) == paper) {
            return true
        } else {
            return false
        }
    }
}

module.exports = filter