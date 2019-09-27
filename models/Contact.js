const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// !! Do we also need address field?
const ContactSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    }
});


module.exports = Contact = mongoose.model("contact", ContactSchema); 