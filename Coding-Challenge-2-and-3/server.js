const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );
const jsonParser = bodyParser.json();
const { DATABASE_URL, PORT } = require( './config' );
const { sportsController } = require('./sport-model.js')
const app = express();
const uuid = require( 'uuid' );


/* Your code goes here */

//params

let sport = {
    id : uuid.v4(),
    name: String,
    num_players: Number
};

app.delete('/sports/delete:id', (req, res) =>{
    let id = req.params.id;
    sportsController.delete(id)
        .then(result =>{
            if(result.cuenta == 0){
                res.statusMessage = 'id not found';
                return res.status(404).end();
            }else{
                return res.status(204).end()
            }
        })
        .catch(error =>{
            res.statusMessage = "db failure";
            return res.status(500); //por convencion...

        });

});

app.listen( PORT, () => {
    console.log( "This server is running on port 8080" );
    new Promise( ( resolve, reject ) => {
        const settings = {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true
        };
        mongoose.connect( DATABASE_URL, settings, ( err ) => {
            if( err ){
                return reject( err );
            }
            else{
                console.log( "Database connected successfully." );
                return resolve();
            }
        })
    })
    .catch( err => {
        console.log( err );
    });
});