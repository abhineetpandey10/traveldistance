const express=require('express');
const cors=require('cors');
const distance=require('./routes/distance-route');
const cities=require('./routes/city-route');

const app=express();

app.use(cors());
app.use(express.json());
app.use("/cities",cities);
app.use("/distance",distance);

const PORT=process.env.PORT || 3001;

app.listen(PORT,()=>{
    console.log("Server started on PORT "+PORT);
});