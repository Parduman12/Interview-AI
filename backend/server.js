import "dotenv/config";

import { connectDB } from "./src/config/database.js";

import app from "./src/app.js";

connectDB();
const PORT = process.env.PORT || 3000;
app.get('/', (req, res)=>{
    res.send("Hello World!");
})

app.listen(PORT,
    ()=>console.log(`SERVER IS LISTENING ON PORT ${PORT}`)
)