const {MongoClient} = require('mongodb')

let dbConnection
function connetToDb(callback){
    dbConnection = MongoClient.connect('mongodb+srv://Gayu1221:Gayu1221@cluster0.beajrtb.mongodb.net/ExpenseData?retryWrites=true&w=majority')
    .then(function(client){ //parameter
        dbConnection = client.db() //access to the parameter //variable(dbcoll)//connectivity-client
        callback() //connection establish 
    }).catch(function(error){
        callback(error)
    })
    //console.log(dbConnection) //to check the connection we print
}

function getDb(){
    return dbConnection
}

//exporting the required dbcollection

module.exports= {connetToDb,getDb}