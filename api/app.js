const express = require('express');
const databaseConfig = require("./config/database");
const expressConfig = require("./config/express");
const storage = require("./middleware/storage");
const usersRoute = require("./controllers/userController.js");
const shoesRoute = require("./controllers/shoesController.js");

const PORT = process.env.PORT || 5000;

const app = express();

databaseConfig(app);
app.use(storage());
expressConfig(app);

app.use('/api/users', usersRoute);
app.use('/api/shoes', shoesRoute);

app.listen(PORT, () =>
    console.log(`Server is running on http://localhost:${PORT}`)
);

// require('dotenv').config();

// Default middlewares -> they apply to all routes
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors());

// Routes middlewares -> they apply to specific path

// mongoose.connect('mongodb+srv://sadkat69:122302@shoesdatabase.sknba.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
//     .then(() => {
//         app.listen(PORT, () => {
//             console.log(`Server is running on http://localhost:${PORT}`);
//         })
//     })
//     .catch((error) => {
//         console.log(error);
//     });

