import mongoose from "mongoose";
mongoose.set('strictQuery', true);

const DBconnection = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`DB Connected at : ${connection.host+" on port "+connection.port}`.cyan.underline);
  } catch (error) {
    console.error(`Error is : ${error.message}`.red.bold);
  }
};

export default DBconnection;
