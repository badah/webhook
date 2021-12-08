const express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    port = 3000;

const hub2b = require('./hub2b.js')

app.use(bodyParser.json())

app.get('/', (req, res) => {
    hub2b.webhookIntegration()
    res.send('Webhook Hub2b')
})

app.post('/', function (req, res) {
    console.log(req.body)
    // Do something with req.body. Ex.: update order in database.
    res.json({
        message: 'Got it!'
    })
})

const server = app.listen(port, function () {
    var host = server.address().address
    var port = server.address().port

    console.log('Example app listening at http://%s:%s', host, port)
})

// Check if hub2b service is up and token is valid.
hub2b.ping()
