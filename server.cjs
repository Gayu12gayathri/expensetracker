const express = require('express')
const bodyParser= require('body-parser')
//importing the required function from dbcollection.cjs
const {connetToDb,getDb}= require('./dbconnection.cjs')
const { ObjectId } = require('mongodb')
const app= express('path')
app.use(bodyParser.json())


connetToDb(function(error){
    if(error){// if error is there if occures
        console.log('could not establish connection...')
        console.log(error)
    }
    else{ //if there is no error this runs
        app.listen(8000)
        db=getDb() //reassignment
        console.log('listening on port 8000...')
    } 
})

app.get('/',function(request,response){
    response.send('working fine..')
})
//sending request-post
/**
 * crud: create,Read,update and delete
 * get enries/get data-get request-post
 * add-entry - post entru
 * edit entry- post,patch entry
 * delete-entry-post entry
 */
app.post('/add-entry',function(request,response){
    db.collection('ExpenseData').insertOne(request.body).then(function(){
        response.status(201).json({
            "status":"Entry added sucessfully"
        })
    }).catch(function(){
        response.status(500).json({
            "status":"Entry not added"
        })
    })
}) //add entry of the data line but wrong way 

//database create how to fetch 
app.get('/get-entries',function(request,response){
    //declare an empty array
    const entries =[]
    db.collection('ExpenseData').find().forEach(entry =>entries.push(entry)) //travese array-iteration
    .then(function(){
        response.status(200).json(entries)
    }).catch(function(){
        response.status(500).json({
            "status":"file not found"
        })
    })
})
app.delete('/delete-entry',function(request,response){
    db.collection('ExpenseData').deleteOne({
        _id : new ObjectId(request.query.id)
    }).then(function(){
        response.status(200).json({
            "status":"file deleted sucessfully"
        })
    }).catch(function(){
        response.status(500).json({
            "status":"nothing is deleted"
        })
    })
})

app.patch('/update-entry/:id',function(request,response){
    //console.log(request.params)
    if(ObjectId.isValid(request.params.id)){
        db.collection('ExpenseData').updateOne(
            {_id: new ObjectId(request.params.id)},
            { $set : request.body }
        ).then(function(){
            response.status(200).json({
                "status" : "Entry updated successfully"
            })
        }).catch(function(){
            response.status(500).json({
                "status":"Unsuccessfull on update"
            })
        })
    } else{
        response.status(500).json({
            "status":"ObjectId not valid"
        })
    }
})
