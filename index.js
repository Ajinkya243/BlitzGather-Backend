const {connectDB} = require("./db/db.connect");
const {Event} =require("./models/event.models");
const express=require('express');
require('dotenv').config();
const port=process.env.PORT
const app=express();
app.use(express.json());

connectDB().then(()=>console.log("Database connected.")).then(()=>app.listen(port,()=>{
    console.log('Express running port:',port);
})).catch(error=>{throw "Error occur while connecting"});

//save data
const saveEvent=async(data)=>{
    const event=await Event(data);
    event.save();
    return event;
}

app.post("/events",async(req,resp)=>{
    try{
        const event=await saveEvent(req.body);
        if(event){
            resp.send(event);
        }
        else{
            resp.status(400).json({error:"Error occur while posting data."})
        }
    }
    catch(error){
        resp.status(500).json({error:"Error occur while fetching"})
    }
    

})
// get all data

const getData=async()=>{
    const events=await Event.find();
    return events;
}

app.get("/events",async(req,resp)=>{
    try{
        const events=await getData();
        if(events.length){
            resp.send(events);
        }
        else{
            resp.status(404).json({error:"Events not found."})
        }
    }
    catch(error){
        resp.status(500).json({error:"Error occur while gfetching data"})
    }
})

//filter data on event type

const filterByEventType=async(data)=>{
    const event=await Event.find({type:data});
    return event;
}

app.get("/events/type/:type",async(req,resp)=>{
    try{
        const event=await filterByEventType(req.params.type);
        if(event.length){
            resp.json(event);
        }
        else{
            resp.status(404).json({message:"Event not found."})
        }
    }
    catch(error){
        resp.status(500).json({error:"Error occur while fetching data"})
    }
})

//search event by title
const searchByTitle=async(data)=>{
    const event=await Event.find({title:{ $regex: data, $options: "i" }});
    return event;
}

app.get("/events/title/:title",async(req,resp)=>{
    try{    
        const items=await searchByTitle(req.params.title);
        if(items.length){
            resp.send(items);
        }
        else{
            resp.status(404).json({message:"Events not found"});
        }
    }
    catch(error){
        resp.status(500).json({error:"Error occur while fetching data."})
    }
})

//get data by id

const getEventById=async(id)=>{
    const event=await Event.findById(id);
    return event;
}

app.get("/events/_id/:id",async(req,resp)=>{
    try{
        const event=await getEventById(req.params.id);
        if(event){
            resp.send(event);
        }
        else{
            resp.status(404).json({error:"Event not found."})
        }
    }
    catch(error){
        resp.status(500).json({error:"Error occur while fetching."})
    }
})

//add initial page
app.get("/",(req,resp)=>{
    resp.send("Welcome to BlitzGather-Backend API")
})