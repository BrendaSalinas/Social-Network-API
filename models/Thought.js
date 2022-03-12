const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema({
    thoughtText: {
        type: String, 
        required: true, 
        //must be between 1 to 280 characters
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => dateFormat(timestamp) 
    },
    username: {
    //the user that created this thought
        type: String, 
        required: true,
    },
    reactions: [reactionSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
}
);

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);
module.exports = Thought;