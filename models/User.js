const { Schema, model, Types} = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: 'Username is required',
        trim: true,
    },
    email: {
        type: String, 
        required: 'Email address is required',
        unique: true,
        match: [/.+@.+\..+/]
    },
    thoughts: {
        //Array of "_id" values referencing the Thought model

    },
    friends: {
        //Array of "_id" values referencing the User model (self-reference)

    }
});

const User = model('User', UserSchema);

module.exports = User;