const expres = require("express")
const cors = require("cors")
const mongoose =require("mongoose");


const app = expres()
app.use(expres.json());
app.use(cors(
    {
        origin: ["https://survey-form-failu026.vercel.app"],
        methods: ["POST", "GET"],
        credentials: true
      }
))

const PORT = process.env.Port || 5000
const mongoDBURL = "mongodb+srv://root:root@cluster0.kb0qfyl.mongodb.net/survey?retryWrites=true&w=majority"

const surveySchema =  mongoose.Schema({
    name:{
      type:String},
    gender:{ type:String},
    nationality: {type:String},
    email: {type:String},
    phoneNumber: {type:Number},
    address: {type:String},
    message: {type:String},
  },
  {
    timestamps : true
  });

  const Survey = mongoose.model("Survey", surveySchema ) 

app.get("/",(req,res)=>{
    res.json({message:"server is running"})
})

app.post('/create', async (request, response) => {
    const surveyData = request.body;
  
    try {
      const newSurvey = new Survey(surveyData);
      await newSurvey.save();
      response.json({ success: true, message: 'Survey submitted successfully' });
    } catch (error) {
      response.status(500).json({ error: 'Internal Server Error' });
    }
  }); 

//Read the data

  app.get('/read', async (request, response) => {
    try {
      const surveys = await Survey.find();
      response.json(surveys);
    } catch (error) {
      console.log(error.message);
      response.status(500).json({ error: 'Internal Server Error' });
    }
  });

  //Update the data

  app.put("/update", async(request, response)=>{

    console.log(request.body)
    const { id,...rest} = request.body
    console.log(rest)
    const surveys = await Survey.updateOne({_id : id}, rest)
    response.send({success: true, message: "data update successfully", data: surveys})
    
    });

    //delete the data
    //http://localhost:5000/delete/id

    app.delete("/delete/:id", async(request, response)=>{
      const id = request.params.id
      console.log(id)
      const surveys = await Survey.deleteOne({_id : id})
      response.send({success: true, message: "data deleted successfully", data: surveys})
      
      });
      
      mongoose.connect(mongoDBURL)
  .then(()=>{
    console.log("App connected to database");
    app.listen (PORT, () =>{
      console.log(`App is listening to port : ${PORT}`)
    });
  })
  .catch((error) =>{
    console.log(error)

  });
