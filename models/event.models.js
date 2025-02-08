
const mongoose=require('mongoose');

const eventSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    thumbnail:{
        type:String
    },
    host:{
        type:String,
        required:true
    },
    day:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    startTime:{
        type:String,
        required:true
    },
    endTime:{
        type:String,
        required:true
    },
    type:{
        type:String,
        enum:["Online Event","Offline Event","Both"],
        default:"Online Event"
    },
    address:{ 
        type: String
    },
    price:{
        type:Number,
        default:0
    },
    details:{
        type:String
    },
    speakers:[{
        _id:false,
        name:{
            type:String,
            required:true
        },
        role:{
            type:String,
            required:true
        },
        image:{
            type:String
        }

    }],
    tags:[{
        type:String
    }],
    attendenceInfo:{
        dressCode:{
            type:String,
            default:'Smart Casual'
        },
        ageLimit:{
            type:String,
            default:"18 and above"
        }
    }
})

const Event=mongoose.model("Event",eventSchema);

module.exports={Event}
