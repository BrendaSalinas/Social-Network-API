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
    //Post a new thought
    createThought({params, body}, res) {
        Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { username: body.username},
                { $push: { thoughts: _id }},
                { new: true }
            )
        })
        .then(dbUserData => {
            if(!dbUserData){ 
                res.status(404).json({ message: 'No user found with this id! '})
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => res.json(err));
    },
    //Update a thought by its _id PUT route
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id }, body, { new: true, runValidators: true }
        )
        .then(dbUpdatedThought => {
            if(!dbUpdatedThought){
                res.status(404).json({ message: 'No thought found with this id! '})
                return;
            }
            res.json(dbUpdatedThought);
        })
        .catch(err => res.json(err));
    },
    //Remove a thought by its _id DELETE route
    deleteThought({ params, body }, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then(dbDeletedThought => {
            if(!dbDeletedThought) {
                res.status(404).json({ message: 'No thought found with this id! '})
                return;
            }
            res.json(dbDeletedThought);
        })
        .catch(err => res.json(err));
    },
    //Create a reaction stored in a single thought's reaction array field 
    createReaction({ params, body}, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true }
        )
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id! '})
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },
    //pull and remove a reaction by the reaction's reactionId value
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId }}},
            { new: true }
        )
        .then(dbThoughData => {
            if(!dbThoughData) {
                res.status(404).json({ message: 'No thought found with this id! '});
                return;
            }
            res.json(dbThoughData);
        })
        .catch(err => res.json(err));
    }
};

module.exports = thoughtController;