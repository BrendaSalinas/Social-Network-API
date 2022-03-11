const { Schema, model } = require('mongoose');

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String, 
        required: true, 
        //must be between 1 to 280 characters
        arguments: [1,280]
    },
    createdAt: {
        type: Date,
        default: Date.now, 
    },
    username: {
    //the user that created this thought
        type: String, 
        required: true,
    },
    reactions: [ReactionSchema]
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;