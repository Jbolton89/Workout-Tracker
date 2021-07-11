const mongoose = require("mongoose"); 

const Schema = mongoose.Schema; 

const ExercisesSchema = new Schema({ 
    type: { 
        type: String, 
        trim: true, 
        required: 'What is the type of workout you are performing?'
    },
    name: { 
        type: String, 
        trim:true, 
        required: 'What is the name of your workout?',
    },
    duration: { 
        type: Number, 
        required: 'How many minutes does your workout take?'
    }, 
    weight: { 
        type: Number, 
    },
    reps: { 
        type: Number, 
    }, 
    sets: { 
        type: Number,
    }, 
    distance: { 
        type: Number, 
    },

}); 

const SessionSchema = new Schema({
    day: { 
        type: Date,
        default: Date.now(), 
    },
    exercises: [ExercisesSchema], 
});  
   
  
const WorkoutSession = mongoose.model("Session", SessionSchema);
  
module.exports = WorkoutSession;