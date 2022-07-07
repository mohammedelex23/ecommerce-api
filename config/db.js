const mongoose = require("mongoose");

const connectToMongoDB = async () => {
  try {
    let conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
    });
    console.log(`connected to mongoDB: ${conn.connection.host}`);
  } catch (error) {
    console.error("Error: " + error.message);
    process.exit();
  }
};

module.exports = connectToMongoDB;
