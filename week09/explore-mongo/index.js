"use strict";

const mongoose = require("mongoose");

const trickSchema = new mongoose.Schema({
  name: String,
  dateLearned: Date,
});

const personSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
}, {
  timestamps: true
});

const catSchema = new mongoose.Schema(
  {
    name: String,
    age: Number,
    lives: Number,
    favouriteFoods: [String],
    trick: [trickSchema],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Person',
    }
  },
  {
    timestamps: true,
  }
);

const Cat = mongoose.model("Cat", catSchema);
const Person = mongoose.model('Person', personSchema);

(async function() {
  const me = new Person({ firstName: 'atlas', lastName: 'acuna' });
  await me.save();
})();

const main = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/explore-mongo");

    // Get all cats
    const allCats = await Cat.find({});
    console.log("all:", allCats.length);

    // Get all cats with 9 lives
    const nineCats = await Cat.find({ lives: 9 });
    console.log('9 lives:', nineCats.length);

    // Get all cats older than 9 years old
    const olderThanNine = await Cat.find({ age: { $gt: 9 }});
    console.log('older than 9:', olderThanNine.length);

    // Get all cats whose name starts with `G`
    const startsWithG = await Cat.find({ name: { "$regex": "^G" }});
    console.log('starts with "G":', startsWithG.length);

    // Get all cats that like tuna
    const likesTuna = await Cat.find({ favouriteFoods: 'tuna' });
    console.log('likes tuna:', likesTuna.length);

    // Get all cats that don't like tuna
    // const doesntLikeTuna = await Cat.find({ favouriteFoods: { $nin: 'tuna' }}); // for array
    const doesntLikeTuna = await Cat.find({ favouriteFoods: { $ne: 'tuna' }});
    console.log('does not like tuna:', doesntLikeTuna.length);

    // Get all cats that like potatoes or strawberry
    // const likesPotatoesOrStrawberries = await Cat.find({ $or: [{ favouriteFoods: 'potatoes' }, { favouriteFoods: 'strawberries' }]});
    const likesPotatoesOrStrawberries = await Cat.find({ $in: ['potatoes', 'strawberries']});
    console.log('likes potatoes or strawberries:', likesPotatoesOrStrawberries.length);

    // Get all cats that like mice and biscuits
    const likesMiceAndBiscuits = await Cat.find({ favouriteFoods: { $all: ['mice', 'biscuits']}});
    console.log('likes mice and biscuits:', likesMiceAndBiscuits.length);

    // Get the oldest cat
    const oldestCat = await Cat.find({})
    // Get the oldest cat that likes fish

    // Get the cat with the least lives that like milk and biscuits
  } catch (error) {
    console.log(error);
  } finally {
    await mongoose.disconnect();
  }
};

main();
