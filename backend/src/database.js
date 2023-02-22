import mongoose from "mongoose";

const uri = "mongodb://127.0.0.1:27017/crudFullStack";

mongoose.set("strictQuery", false);

export const connectDb = async () => {
  try {
    const db = await mongoose.connect(uri);
    console.log(
      "La base de datos ha sido conectada con éxito a",
      db.connection.name
    );
  } catch (error) {
    console.log(
      `Ha sucedido un error al conectar a la base de datos ${error.message}`
    );
  }
};
