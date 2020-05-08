const mongoose = require( 'mongoose' );
const uuid = require( 'uuid' );

/* Your code goes here */

const sports = mongoose.Schema({
   id:{
       type: String,
       required: true
   },
   name:{
       type: String, 
       required: true
   },
   num_players:{
    type: Number, 
    required: true
   }
});


const sportsCollection = mongoose.model('sportsdb', sports);

const sportsController = {
    delete: function(id){
        return sportsCollection
                .deleteOne({id: id})
                .then(deleted =>{
                    return deleted;
                })
                .catch(err =>{
                    return err;
                });
    }
}

module.exports = {
    sportsController
};

/*
sport = {
id: uuid.v4(), // This is a String type holding a uuid
name: String,
num_players: Number
}

*/