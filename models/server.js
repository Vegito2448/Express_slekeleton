const express = require('express');
const cors = require('cors');
const {dbConnection} = require('../database/config.db');

class Server{
  
  constructor(){
    this.app = express();
    this.port = process.env.PORT;
    this.usersPath = '/api/users';
    
    //Conn DB
    this.DBConnect();

    //Middlewares
    this.middlewares();
    // App routes
    this.routes();
  }
  async DBConnect(){
    await dbConnection();
  }
  middlewares(){
    // CORS
    this.app.use(cors());

    // Parsing and reading body
    this.app.use(express.json());
    
    //Public directory 
    this.app.use(express.static('public'));
  }

  routes(){
    this.app.use(this.usersPath, require('../routes/user.routes'));
  }

  listen(){
    this.app.listen(this.port, ()=>{
      console.log('Server runing in port: ', this.port);
    })
  }

}
module.exports = Server;
