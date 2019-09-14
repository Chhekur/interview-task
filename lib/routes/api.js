const mysql = require('mysql');
const crypto = require('crypto');
const config = require('../config');
const md5 = crypto.createHash('md5');

let con;
try{
	con = mysql.createConnection(config.database);
}catch(error){
	console.log(error);
}

module.exports = function(app){
	app.route('/api/login').post(function(req, res){
		let username = req.body.username;
		let password = req.body.password;
		// password = md5.update(password).digest('hex');
		// password = md5.update(password).digest('hex');
		con.query(`select user_id, username, email, password, salt from ilance_users where username = '${username}'`, function(err, result){
			if(err){
				if(err.code == "ECONNREFUSED"){
					console.log("Check you mysql server details and make sure mysql server is running");
				}
				res.json({error: true, msg : err});
			}else{
				if(result.length == 0){
					res.json({error: true, msg : 'Invalid username or password'});
				}else{
					console.log(result);
					const user = result[0];
					if(checkPassword(user['password'], user['salt'], password)){
						req.session.user_id = user['user_id'];
						req.session.username = user['username'];
						req.session.email = user['email'];
						console.log(req.session);
						res.json({error: false, data: result});
					}else{
						res.json({error: true, msg : 'Invalid username or password'});
					}
					
				}
			}
		});
	});

	app.route('/api/get-all-users').get(function(req, res){

		const q = "select p.project_id, p.description, p.project_title, c.category, p.status, u.username from ilance_projects as p, ilance_users as u, category as c where p.user_id = u.user_id and p.cid = c.cid order by p.date_added desc";

		con.query(q, function(err, data){
			if(err){
				if(err.code == "ECONNREFUSED"){
					console.log("Check you mysql server details and make sure mysql server is running");
				}
				res.json({error: true, msg: err});
			}else{
				// console.log(data);
				let final_result = [];
				let labels = [];
				let count = true;
				for(i in data){
					let temp = [];
					for(attribute in data[i]){
						temp.push(data[i][attribute]);
						if(count){
							labels.push({title: attribute});
						}
						// console.log(attribute);
					}
					count = false;
					final_result.push(temp);
					// console.log(data[i]['status']);
				}
				res.json({error: false, data:{labels, data: final_result}});
			}
		});
	});
}

function checkPassword(hash, salt, password){
	console.log(hash, salt, password);

	// update iterations, length and digest to make login work

	// I am doing this because iteration, length, and digest is not given to me.
	// return hash == password;

	return hash == crypto.pbkdf2Sync(password, salt, 1, 512, 'sha512');
}