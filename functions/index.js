const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const express = require('express');
const app = express();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//


app.get('/Comments',(req,res)=>{
    admin
    .firestore()
    .collection("Posts")
    .orderBy('timeStamp','desc')
    .get()
    .then(data=>{
       var posts = [];
       data.forEach(doc=>{
           posts.push(doc.data());
       })
       return res.json(posts);
    })
    .catch(Error=>{console.error()}
    );

})


app.post('/Comments',(req,res)=>{
    const newPost = {
        body: req.body.body,
        username : req.body.username,
        timeStamp: admin.firestore.Timestamp.fromDate(new Date()) 
    }
    admin.firestore()
    .collection("Posts")
    .add(newPost)
    .then(docs=>{
        res.json({
            message: `document: ${docs.id} created successfully`,
        })

    })
    .catch(err=>{console.error(err)});
})

exports.api = functions.https.onRequest(app);