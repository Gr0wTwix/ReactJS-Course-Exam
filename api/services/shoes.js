const { db } = require('../models/shoe-model');
const shoeModel = require('../models/shoe-model');
const { validateShoePost } = require('../validations');

const toObject = (el) => el.toObject({ getters: true });

const createShoePost = async (req, res) => {
    console.log("Req Body: ", req.body);
    const error = validateShoePost(req.body);
    console.log("Error: ", error);
    
    if (error.details) {
        console.log(error);
        return res.status(422).json({ message: error.details[0].message, status: 422 });
    }
    
    const { title, description, image, price } = req.body;
    const userId = req.userId;
    console.log(req.body, req.userId);

    const newShoePost = new shoeModel({
        title,
        description,
        image,
        price,
        _ownerId: userId
    });

    try {
        await newShoePost.save();
    } catch(err) {
        return res.status(500).json({ message: err.message, status: 500 });
    }

    res.status(201).json(toObject(newShoePost));
}

const getAllShoePosts = async (req, res) => {
    const { sort, limit } = req.query;

    let shoePosts;
    try {
        shoePosts = await shoeModel.find();
    } catch(err) {
        return res.status(500).json({ message: err.message, status: 500 });
    }

    if (limit) {
        shoePosts = shoePosts.slice(0, limit);
    }
    if (sort) {
        shoesPosts = shoePosts.sort((shoeA, shoeB) => {
            if (sort === 'asc') {
                return shoeA.price - shoeB.price
            } else if (sort === 'desc') {
                return shoeB.price - shoeA.price
            }
        });
    }

    return res.json(shoePosts.map(toObject));
}

const getShoeById = async (req, res) => {
    const { shoeId } = req.params;
    
    let shoe;
    try {
        shoe = await shoeModel.findById(shoeId);
    } catch(err) {
        return res.status(500).json({ message: err.message, status: 500 });
    }

    if (!shoe) {
        return res.status(422).json({ message: `No shoe with id of: ${shoeId}`, status: 422 });
    }

    res.json(toObject(shoe));
}

const editShoeById = async (req, res) => {
    const error = validateShoePost(req.body);

    if (error.details) {
        return res.status(422).json({ message: error.details[0].message, status: 422 });
    }

    const { shoeId } = req.params;
    const { title, description, image, price } = req.body;
    let shoe;
    try {
        shoe = await shoeModel.findById(shoeId);
    } catch(err) {
        return res.status(500).json({ message: err.message, status: 500 });
    }

    if (!shoe) {
        return res.status(422).json({ message: `No shoe with id of: ${shoeId}`, status: 422 });
    }

    if (req.userId !== shoe._ownerId) {
        return res.status(403).json({ message: 'Unauthorized to delete this shoe post!', status: 403 });
    }

    shoe.title = title;
    shoe.description = description;
    shoe.image = image;
    shoe.price = price;

    try {
        await shoe.save();
    } catch(err) {
        return res.status(500).json({ message: err.message, status: 500 });
    }

    res.status(203).json(toObject(shoe));
};

const deleteShoeById = async (req, res) => {
    const { shoeId } = req.params;

    let shoe;
    try {
        shoe = await shoeModel.findById(shoeId);
    } catch(err) {
        return res.status(500).json({ message: err.message, status: 500 });
    }

    if (!shoe) {
        return res.status(422).json({ message: `No shoe with id of: ${shoeId}`, status: 422 });
    }
    
    if (req.userId !== shoe._ownerId) {
        return res.status(403).json({ message: 'Unauthorized to delete this shoe post!', status: 403 });
    }

    try {
        await shoeModel.deleteOne({ _id: shoe._id });
    } catch(err) {
        return res.status(500).json({ message: err.message, status: 500 });
    }

    res.status(204).json({ message: 'Successfuly deleted!', status: 204 });
}

module.exports.createShoePost = createShoePost;
module.exports.getAllShoePosts = getAllShoePosts;
module.exports.getShoeById = getShoeById;
module.exports.deleteShoeById = deleteShoeById;
module.exports.editShoeById = editShoeById;