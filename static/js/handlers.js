$(document).ready(function() {
    function brewTags(result, callback) {
        var tag = ""
        var counter = 0
        if (result.length !== 0) {
            /*result.forEach(element => {
                tag = tag + "<li><a href=" + element + ">" + element + "</a></li>"
            })*/
            var master = result[result.length - 1]
            console.log(master)
            for (let index = 0; index < result.length-1; index++) {
                tasteNames(result[index], master.code, function(name) {
                    filterTags(name, master, function(check) {
                        if (check) {
                            tag = tag + '<li><a target="_blank" href=' + encodeURI(result[index]) + '>' + name + '</a></li>'
                            counter++
                        }
                    })
                })
            }
            if (counter == 1) {
                tag = "<h3>" + counter + " link found.</h3>" + tag
            } else if (counter == 0) {
                tag = "<h3>Sorry, nothing found.</h3>"
            } else {
                tag = "<h3>" + counter + " links found.</h3>" + tag
            }
            callback(tag)
        } else {
            tag = "<h3>Sorry, syllabus code is invalid.</h3>"
            callback(tag)
        }
    }

    function tasteNames(lnk, code, callback) {
        code = code + ")/"
        var name = ""
        for (let index = 0; index < lnk.length; index++) {
            if (lnk.substr(index, 6) == code) {
                index = index + 6
                name = lnk.substr(index)
            }
        }
        callback(name)
    }

    function filterTags(name, master, callback) {
        var pass = true
        if (master.num !== "") {
            for (let i = 0; i < name.length; i++) {
                if (name.substr(i, 4) == ".pdf") {
                    if (name.substr(i-2, 1) !== master.num) {
                        pass = false
                    }
                }
            }
        }
        if (master.session !== "d") {
            for (let i = 0; i < name.length; i++) {
                if (name.substr(i, 2) == "_s" || name.substr(i, 2) == "_w") {
                    if (name.substr(i+1, 1) !== master.session) {
                        pass = false
                    }
                }
            }
        }
        if (master.year !== "") {
            for (let i = 0; i < name.length; i++) {
                if (name.substr(i, 2) == "_s" || name.substr(i, 2) == "_w") {
                    if (name.substr(i+2, 2) !== (master.year).substr(2, 2)) {
                        pass = false
                    }
                }
            }
        }
        if (master.type !== "") {
            for (let i = 0; i < name.length; i++) {
                if (name.substr(i, 3) == "_qp" || name.substr(i, 3) == "_ms") {
                    if (name.substr(i+1, 2) !== master.type) {
                        pass = false
                    }
                }
            }
        }
        callback(pass)
    }






    $('form').on('submit', function(e) {
        e.preventDefault()

        $('.loader').addClass("visible")
        $('.loader').removeClass("hidden")

        var code = $('#code').val()
        var year = $('#year').val()
        var session = $('#session').val()
        var type = $('#type').val()
        var num = $('#num').val()

        var data = {
            code: code,
            year: year,
            session: session,
            type: type,
            num: num
        }

        $.ajax({
            url: "/",
            type: 'POST',
            timeout: 0,
            data: data,
            success: function(result, status) {
                // location.reload()
                brewTags(result, function(content) {
                    $('.links-container').html(content)
                    $('.loader').removeClass("visible")
                    $('.loader').addClass("hidden")
                })
            }
        })
        return false
    })
})