import { connectToMongoDB } from "./mongodb";
import express from "express";
import { router } from "./routes";

export const app = express();
app.use(express.json());
app.use(router);

connectToMongoDB();

const port = process.env.PORT ?? 3000

app.listen(port, () => {
    console.log("Server is running on http://localhost:" + port);
});