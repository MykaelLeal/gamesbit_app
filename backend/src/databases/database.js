import mongoose from "mongoose";

const connectDatabase = () => {

    mongoose.connect(process.env.MONGO_URI
    )
    .then(() => console.log("Conexão bem sucessida!"))
    .catch((error) => console.log(error));
};

export default connectDatabase;