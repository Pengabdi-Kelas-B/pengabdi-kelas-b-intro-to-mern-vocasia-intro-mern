const mongoose = require("mongoose");
require("dotenv").config();
const fs = require("fs");

async function main() {
  const mongoUri = process.env.MONGODB_URI;
  const collection = process.env.MONGODB_COLLECTION;

  const args = process.argv.slice(2);

  const command = args[0];

  // Connect to MongoDB
  await mongoose.connect(mongoUri);

  // Define a schema for the collection
  const schema = new mongoose.Schema({
    title : String,
    year : Number,
    genre : [String],
    description : String,
    director : String,
    cast : [String]
  }, { strict: false });
  const Model = mongoose.model(collection, schema);

  switch (command) {
    case "check-db-connection":
      await checkConnection();
      break;
      case "bulk-insert":
        const data = JSON.parse(fs.readFileSync("seed.json", 'utf-8'))

        for (const movie of data) {
          const movieModel = new Model()
          movieModel.title = movie.title
          movieModel.year = movie.year
          movieModel.genre = movie.genre
          movieModel.description = movie.description
          movieModel.director = movie.director
          movieModel.cast = movie.cast

          await movieModel.save()
        }
        
          console.log("Bulk Insert Berhasil")
      
      break;
      case "get-all":
        const movieDataGetAll = await Model.find()
          console.log(movieDataGetAll);
          console.log("Get Data Berhasil")
      
      break;
      case "reset-db":
       await Model.deleteMany()   
      console.log("Reset Data Berhasil")
      break;
    // TODO: Buat logic fungsionalitas yg belum tersedia di bawah
    default:
      throw Error("command not found");
  }

  await mongoose.disconnect();
  return;
}

async function checkConnection() {
  console.log("check db connection started...");
  try {
    await mongoose.connection.db.admin().ping();
    console.log("MongoDB connection is successful!");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
  }
  console.log("check db connection ended...");
}

main();
