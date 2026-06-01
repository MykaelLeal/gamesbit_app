import mongoose from "mongoose";

const connectDatabase = () => {

    mongoose.connect(
        "mongodb+srv://mykael:g4mes3D!@cluster0.vedwt78.mongodb.net/?appName=Cluster0"
    )
    .then(() => console.log("Conexão bem sucessida!"))
    .catch((error) => console.log(error));
};

export default connectDatabase;