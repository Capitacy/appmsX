const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')

var manager = require('./fetcher')


// initialize app
const app = express()


// set view engine for dynamic html generation
app.set("view engine", "ejs")


// set path for static files like css, js, images
app.use("/static", express.static('static'))


// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


// render main page for request made on "/" page
app.get("/", function(req, res){
    // res.render("index", {result: ""})
    res.render("maintainence")
    console.log("GET request made on '/'")
})


// handle POST requests
app.post("/", urlencodedParser, function(req, res) {
    console.log("POST request made on '/'")
    manager.fetchSubjectLink(req.body.code, function(data) {
        manager.fetchPaperLinks(data[0], function(result) {
            result.push(req.body)
            console.log(result)
            res.json(result)
        })
    })
})


// render 404 page for request made on any unspecified page
app.use(function(req, res) {
    res.render('404', {})
})


// set port for server to listen
app.listen(process.env.PORT || 3000)