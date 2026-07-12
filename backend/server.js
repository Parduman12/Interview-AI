import "dotenv/config";

import { connectDB } from "./src/config/database.js";

import app from "./src/app.js";

connectDB();
const PORT = process.env.PORT;
app.get('/', (req, res)=>{
    res.send("Hello World!");
})






app.listen(PORT,
    ()=>console.log("SERVER IS LISTENING ON PORT 3000")
)