const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema:
const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId, // Connecting Schema to object id
    ref: "users" // Connecting PostSchema to reference users
  },
  text: {
    type: String,
    required: true
  },
  name: {
    type: String,
  },
  avatar: {
    type: String
  },
  likes: [ // array of objects
    {
      user: {
        type: Schema.Types.ObjectId, // once liked their user ID will go into the liked array and attached to said like
        ref: "users"
      }
    }
  ],
  comments: [ // array of objects
    {
      user: {
        type: Schema.Types.ObjectId, // once commented their user ID will go into the comments array and attached to said comment
        ref: "users"
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String,
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: { // Date for post
    type: Date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model("post", PostSchema);