const https = require('https')
const querystring = require('querystring')
const config = require('./config.json')
const params = {
    access_token: config.access_token,
}
const options = {
    hostname: 'rest.hub2b.com.br',
    port: 443
}

function ping() {
	options.path = '/ping?' + querystring.stringify(params)
	options.method = 'GET'
	options.headers = {
		'Content-Type': 'application/x-www-form-urlencoded'
	}
	const request = https.request(options, response => {
	    console.log(`statusCode: ${response.statusCode}`)
	    response.on('data', d => {
	        process.stdout.write(d)
	    })
	})
	request.on('error', error => {
	  console.error(error)
	})

	request.end()
}

function webhookIntegration() {
	let obj = {
	    system: "ERPOrdersNotification",
	    idTenant: 2032,
	    responsibilities: [
	        {
	            type: "Orders",
	            flow: "HubTo"
	        }
	    ],
	   	apiKeys: [
	        {
	            key: "URL_ERPOrdersNotification",
	            value: config.webhook_callback_url
	        },
	        {
	            key: "authToken_ERPOrdersNotification",
	            value: "Bearer " + config.credentials.access_token
	        },
	        {
	            key: "AuthKey_ERPOrdersNotification",
	            value: "ApiKey"
	        },
	        {
	            key: "HUB_ID_ERPOrdersNotification",
	            value: "2032"
	        }
	    ]
	}

	const data = JSON.stringify(obj)

	options.path = '/Setup/integration?' + querystring.stringify(params)
	options.method = 'PUT'
	options.headers =  {
    	'Content-Type': 'application/json',
    	'Content-Length': data.length
  	}

	const req = https.request(options, res => {
	  console.log(`statusCode: ${res.statusCode}`)

	  res.on('data', d => {
	    process.stdout.write(d)
	  })
	})

	req.on('error', error => {
	  console.error(error)
	})

	req.write(data)
	req.end()
}

module.exports = {ping, webhookIntegration}
