const express = require('express');
const path = require('path');
const web_routes = require('./routes/web');
const bodyParser = require('body-parser');
const session = require('cookie-session');
const api_routes = require('./routes/api');
const config = require('./config');

const app = express();

app.use(session({
    name:'session',
    keys: ["Chhekur@Coder@2019", 'gjhgjhgjh'],
}))

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

web_routes(app);
api_routes(app);

app.listen(config.port, function(){
	console.log(`Server is running on port ${config.port}`);
});