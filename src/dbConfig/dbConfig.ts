import mongoose from "mongoose";

export async function dbconnect() {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log("Connected");
        })
        connection.on('error', (err) => {
            console.log("Error Connecting", err);
            process.exit();
        })
    } catch (error) {
        console.log("Error Occured");
        console.log(error);
    }
}