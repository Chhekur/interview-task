# interview-task
Auctions software interview task2

# Please follow the instruction in order to run this:
- open `/lib/config.js` file and update the database configuration and port on which you want to run express server.
- upload the `db.sql` onto your database server.

# Used technologies
- Express
- mysql
- ajax
- html/css

# Here is the basic information of all files 
 - `/lib` folder to contain all the library files.
 - `/lib/config.js` contains all the configurations for the app.
 - `/lib/server.js` contails main code for creating the server and handeling the requests.
 - `/lib/routes` folder contains all the route's for web and api.
 - `/lib/routes/web.js` contains all the general web routes.
 - `/lib/routes/api.js` contains all the routes related to api (I didn't use the concept of controllers and models here because here is just on query but I prefer MVC architecture for real projects..)
 - `/views` folder contains all the view of out app.
 - `/views/login.html` contains code related to login UI and ajax request.
 - `/views/home.html` contains code for home page, which having pagination on it, fetching data through ajax request from server.
 - `db.sql` it is the dump file of sql database.