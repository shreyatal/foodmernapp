const mongoose = require('mongoose');
const mongoURI = 'mongodb://mittalshreya666:Lenovo123@ac-j3naexk-shard-00-00.firaaxq.mongodb.net:27017,ac-j3naexk-shard-00-01.firaaxq.mongodb.net:27017,ac-j3naexk-shard-00-02.firaaxq.mongodb.net:27017/foodie?ssl=true&replicaSet=atlas-b6a483-shard-0&authSource=admin&retryWrites=true&w=majority'
const mongoDB = async () => {
    await mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
        if (err)
            console.log("---", err)
        else {
            console.log("connected");
            const fetched_data = await mongoose.connection.db.collection("food_items");
            fetched_data.find({}).toArray(async function (err, data) {
                const foodCategory = await mongoose.connection.db.collection("food_category");
                foodCategory.find({}).toArray(function (err, categorydata) {
                    if (err)
                        console.log(err);
                    else {
                        global.food_items = data;
                        global.foodCategory= categorydata;

                    }
                });
            });
        }
    });
}
module.exports = mongoDB;