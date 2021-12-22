const mongoose = require('mongoose');

const ShoeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Shoe title is required!']
    },
    description: {
        type: String,
        maxlength: [500, 'Max length of description is 500 symbols.'],
        required: [true, 'Shoe description is required!']
    },
    price: {
        type: Number,
        required: [true, 'Shoe price is required!']
    },
    image: {
        type: String,
        required: [true, 'Shoe image is required!']
    },
    _createdAt: {
        type: Date,
        default: Date.now()
    },
    _ownerId: {
        type: mongoose.Types.ObjectId,
    }
});

module.exports = mongoose.model('Shoe', ShoeSchema);