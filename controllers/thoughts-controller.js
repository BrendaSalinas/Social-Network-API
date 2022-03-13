const { User, Thought } = require('../models');

const thoughtController = {
    //get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbThoughData => res.json(dbThoughData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    //get a single thought by its _id
    getThoughtById({ params, }, res) {
        Thought.findOne({ _id: params.id })
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbThoughData => res.json(dbThoughData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        });
    },
    
}