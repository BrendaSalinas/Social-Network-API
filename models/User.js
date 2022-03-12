const { Schema, model, Types } = require("mongoose");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: 'Username is required',
      trim: true,
    },
    email: {
      type: String,
      required: "Email address is required",
      unique: true,
      match: [/.+@.+\..+/, "Please add correct email!"],
    },
    //Array of "_id" values referencing the Thought model
    thoughts: [
      {
        type: Types.ObjectId,
        ref: 'Thought',
      },
    ],
    //Array of "_id" values referencing the User model (self-reference)
    friends: [
      {
        type: Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

UserSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

const User = model('User', UserSchema);
module.exports = User;
