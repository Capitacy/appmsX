$(document).ready(function() {
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
                console.log(result)
                setTags(result, data.code, function(tags) {
                    $('.links-container').html(tags)
                    $('.loader').removeClass("visible")
                    $('.loader').addClass("hidden")
                })
            }
        })
        return false
    })


    function setTags(links, code, callback) {
        var tags = ""
        var tag = ""
        if (links.length == 1) {
            tag = "<h3>" + links.length + " link found.</h3>" + tag
        } else if (links.length == 0) {
            tag = "<h3>Sorry, nothing found.</h3>"
        } else {
            tag = "<h3>" + links.length + " links found.</h3>" + tag
        }
        tags += tag
        links.forEach(item => {
            item = item.toString()
            tag = "<li><a target='_blank' href=" + encodeURI(item) + ">" + item.substr(item.indexOf("/" + code) + 1) + "</a></li>"
            tags += tag
        });
        callback(tags)
    }
})