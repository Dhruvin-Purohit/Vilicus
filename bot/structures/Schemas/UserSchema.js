const mongoose = require('mongoose')
const UserDB = require('../UserDB')

const UserSchema = new mongoose.Schema ({
    id: {
        type:String,
        required: true
    },
    trusted: {
        type: Boolean,
        required: true,
        default: false
    },
    bs: {
        type: Array,
        default: null
    },
    coc: {
        type: Array,
        default: null
    },
    cr: {
        type: Array,
        default: null
    }
})

module.exports = UserDB.model("UserModel", UserSchema)