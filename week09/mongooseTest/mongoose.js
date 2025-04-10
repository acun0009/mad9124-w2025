const mongoose = require("mongoose");

const main = async () => {
    try {
        mongoose
          .connect("mongodb://localhost:27017/mad9124")
          .then(() => console.log("Connected to mongodb"))
          .catch((e) => console.error(`Error connecting to mongodb: ${e.message}`));

          const catSchema = mongoose.Schema({
            name: {
                type: String,
                required: true
            },
            age: Number
          });
          const Cat = mongoose.model("Cat", catSchema);
          const newCat = new Cat({ name: 'Shiloh' });
          await newCat.save();
          
        //   const cats = await Cat.find({ name: 'Shiloh' }).lean(); to query cats
    } catch(erro) {
        console.error(error);
    } finally {
        await mongoose.disconnect();
    }
}

main();