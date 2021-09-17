const mongoose = require('mongoose');
const env = process.env.NODE_ENV || 'development';
const config = require('./config')[env];
console.log(config)

let mdbUname = config.database.mongodb.mdbUname;
let mdbPass = config.database.mongodb.mdbPass;
let mdbCluster = config.database.mongodb.mdbCluster;

const mongodbUri = `mongodb+srv://${mdbUname}:${mdbPass}@${mdbCluster}.mongodb.net/zode-forum?retryWrites=true&w=majority`;

mongoose.connect(mongodbUri)
.then((success) => {
  console.log('Connected Successfully !!!')
})
.catch(() => {
  console.log(err)
});


// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error: "));
// db.once("open", function () {
//   console.log("Connected successfully");
// });

