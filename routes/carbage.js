const express = require('express');
// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;

const router = express.Router();

// const url =
//   // 'mongodb+srv://maximilian:MfwKGzkrovQHJGbf@cluster0-ntrwp.mongodb.net/locations?retryWrites=true&w=majority';
//      'mongodb+srv://bakr:k3Y1VfeGQoBzIL5Q@cluster0.gk8kb.mongodb.net/locations?retryWrites=true&w=majority'
//        const urlAddress = encodeURI(url);

// const client = new MongoClient(url);

// const locationStorage = {
//   locations: []
// };

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb+srv://Bakr:Bakr2020@cluster0.gk8kb.mongodb.net/locations?retryWrites=true&w=majority';

// Database Name
const dbName = 'locations';

// Create a new MongoClient
const client = new MongoClient(url);



router.post('/add-location', (req, res, next) => {
  // const id = Math.random();
  client.connect(function(err, client) {
    const db = client.db(dbName);

    // Insert a single document
    db.collection('user-locations').insertOne(
      {
        address: req.body.address,
        coords: { lat: req.body.lat, lng: req.body.lng }
      },
      function(err, r) {
        // if (err) {}
        console.log(r);
        res.json({ message: 'Stored location!', locId: r.insertedId });
      }
    );
  });

  // locationStorage.locations.push({
  //   id: id,
  //   address: req.body.address,
  //   coords: { lat: req.body.lat, lng: req.body.lng }
  // });

  // Use connect method to connect to the Server
// client.connect(function(err, client) {
//   assert.equal(null, err);
//   console.log("Connected correctly to server");

//   const db = client.db(dbName);

//   // Insert a single document
//   db.collection('inserts').insertOne({a:1}, function(err, r) {
//     assert.equal(null, err);
//     assert.equal(1, r.insertedCount);

//     // Insert multiple documents
//     db.collection('inserts').insertMany([{a:2}, {a:3}], function(err, r) {
//       assert.equal(null, err);
//       assert.equal(2, r.insertedCount);

//       client.close();
//     });
//   });
// });

});

router.get('/location/:lid', (req, res, next) => {
  const locationId = req.params.lid;

  client.connect(function(err, client) {
    const db = client.db('locations');

    // Insert a single document
    db.collection('user-locations').findOne(
      {
        _id: new mongodb.ObjectId(locationId)
      },
      function(err, doc) {
        // if (err) {}
        if (!doc) {
          return res.status(404).json({ message: 'Not found!' });
        }
        res.json({ address: doc.address, coordinates: doc.coords });
      }
    );
  });
});

module.exports = router;
