const path = require('path');

module.exports = function(app){
	app.route('/').get(function(req, res){
		if(!req.session.user_id){
			res.redirect('/login');
		}else{
			res.sendFile(path.join(__dirname, '..', '..', 'views', 'home.html'));
		}
	});

	app.route('/login').get(function(req, res){
		if(req.session.user_id){
			res.redirect('/');
		}else{
			res.sendFile(path.join(__dirname, '..', '..', 'views', 'login.html'));
		}
	});

	app.route('/logout').get(function(req, res){
		req.session = null;
		res.redirect('/login');
	});
}