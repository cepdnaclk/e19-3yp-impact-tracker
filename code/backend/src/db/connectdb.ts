const uri =
  "mongodb+srv://impax-user:impax1234@3ypcluster.grcuqte.mongodb.net/impax?retryWrites=true&w=majority";

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
