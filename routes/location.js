const express = require("express");

const router = express.Router();
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const assert = require("assert");

// Connection URL
const url =
  "mongodb+srv://Bakr:Bakr2020@cluster0.gk8kb.mongodb.net/locations?retryWrites=true&w=majority";

// Database Name
const dbName = "locations";

// Create a new MongoClient
const client = new MongoClient(url);

router.post("/add-location", (req, res, next) => {
  // const id = Math.random();
  client.connect(function (err, client) {
    const db = client.db(dbName);

    // Insert a single document
    db.collection("user-locations").insertOne(
      {
        address: req.body.address,
        coords: { lat: req.body.lat, lng: req.body.lng },
      },
      function (err, r) {
        // if (err) {}
        console.log(r);
        res.json({ message: "Stored location!", locId: r.insertedId });
      }
    );
  });
});

router.get("/location/:lid", (req, res, next) => {
  const locationId = req.params.lid;
  // const id = Math.random();
  client.connect(function (err, client) {
    const db = client.db(dbName);

    // let locationId;
    // try {
    //   locationId = new mongodb.ObjectId(locationId);
    // } catch (error) {
    //   // return to make sure the other code does not execute
    //   return res.status(500).json({ message: "Invalid id!" });
    // }
    // // END OF ADDED CODE

    // Insert a single document
    db.collection("user-locations").findOne(
      {
        _id: new mongodb.ObjectId(locationId),
      },
      function (err, doc) {
        // if (err) {}
        if (!doc) {
          return res.status(404).json({ message: "Not found!" });
        }
        res.json({ address: doc.address, coordinates: doc.coords });
      }
    );
  });

  // client.connect(function (err, client) {
  //   const db = client.db("locations");

  //   // Insert a single document
  //   db.collection("user-locations").findOne(
  //     {
  //       _id: new mongodb.ObjectId(locationId),
  //     },
  //     function (err, doc) {
  //       // if (err) {}
  //       if (!doc) {
  //         return res.status(404).json({ message: "Not found!" });
  //       }
  //       res.json({ address: doc.address, coordinates: doc.coords });
  //     }
  //   );
  // });
});

module.exports = router;
