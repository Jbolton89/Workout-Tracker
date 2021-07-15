const router = require('express').Router();
const WorkoutSession = require('../models/WorkoutSession.js');

// Add exercises to the most recent workout plan
router.put('/workouts/:id', (req, res) => { 
    WorkoutSession.findByIdAndUpdate({
        _id: req.params.id,
    }, 
    {
        $push: { 
            exercises: req.body,
        },
    }, 
    { 
        new:true,
    }
)
    .then((workouts) => { 
        res.json(workouts); 
    })
    .catch((err) => { 
        res.json(err);
    }); 
});

// Add new exercises to a new plan
router.post('/workouts', ({ body }, res ) => { 
    WorkoutSession.create(body)
        .then(Workouts => { 
            res.json(Workouts); 
         })
        .catch (err => { 
              res.status(400).json(err);
         });
});

// View total duration of seven workouts on stats page
router.get('/workouts', (req, res) => { 
    WorkoutSession.aggregate([{
        $addFields: {
            totalDuration: {
                $sum: '$exercise.duration'
            }
        }
    }])
    .then(Workouts => {
        console.log(Workouts)
        res.json(Workouts); 
    })
    .catch(err => { 
        res.status(400).json(err);
    });
}); 

// View combined weight of exercises from past 7 workouts of stats page
router.get('/workouts/range', (req, res) => { 
    WorkoutSession.aggregate([{ 
        $addFields: {
            totalDuration: { 
                $sum: '$exercises.duration' } 
            },
        },
        // { $match: { $gte: { day: new Date(new Date().setDate(new Date().getDate() - 7)) }}}
    ])
    .sort({_id:-1})
    .limit(7)
    .then(Workouts => { 
        res.json(Workouts)
    })
    .catch(err => { 
        res.status(400).json(err);
    });
});

module.exports = router; 