const uri = process.env.DB;

const mongoose = require("mongoose");

const connectToDatabase = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.error(err);
  }
};

export { connectToDatabase };
