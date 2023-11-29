const expres = require("express")
const cors = require("cors")

const app = expres()
app.use(cors())

const PORT = process.env.Port || 5000

app.get("/",(req,res)=>{
    res.json({message:"server is running"})
})

app.listen(PORT,()=>console.log(`server is running ${PORT}`))