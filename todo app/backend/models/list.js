const mongoose = require('mongoose');
const User = require('./user');

const listSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    },
    user:[
        {
            type: mongoose.Types.ObjectId,
            ref:  'User'
        }
    ]
},
{timestamps: true}
);

const List = new mongoose.model('List', listSchema);

module.exports = List;

