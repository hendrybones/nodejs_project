const mongoose = require ("mongoose");
const { stringify } = require("uuid");
const Schema = mongoose.Schema;

const userSchema =new Schema({
    username: {
        type: String,
        required: true
    },
    roles: {
        User:{
            type : Number,
            default: 2001
        },
        Ediror: Number,
        Admin: Number
    },
    password: {
        type: String,
        required: true
    },
    refrshToken: String

});

module.exports = mongoose.model("User", userSchema);