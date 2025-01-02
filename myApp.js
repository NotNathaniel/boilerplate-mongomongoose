require('dotenv').config();
const mongoose = require('mongoose'); // Import mongoose

const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

let Person;

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age:{
    type: Number,
  },
  favoriteFoods: {
    type: [String]
  }

});

Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  const personObject = {
    name: "John Doe", // Correctly matches the schema
    age: 30, // Matches the schema type
    favoriteFoods: ["Spicy Tuna Roll", "Taco"], // Matches the schema type
  };

  const person = new Person(personObject); // Create a new Person instance

  // Save the person document using a callback
  person.save(function(err, data) {
    if (err) {
      console.error(err); // Handle the error
      return done(err); // Pass the error to the callback
    }
    console.log(data); // Log the saved data
    done(null, data); // Pass the saved data to the callback
  });
};


const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) {
      console.error(err); // Handle any errors
      return done(err);   // Pass the error to the callback
    }
    console.log("Created documents:", data); // Log the created documents
    done(null, data); // Pass the created documents to the callback
  });
};


const findPeopleByName = (personName, done) => {
  Person.find({name:personName}, (err, data)=>{
    if(err){
      console.error(err);
      return done(err);
    }
    console.log("Found person:", data);
    done(null, data);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, data)=>{
    if(err){
      console.error(err);
      return done(err);
    }
    console.log("Found person:", data);
    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data)=>{
    if(err){
      console.error(err);
      return done(err);
    }
    console.log("Found person:", data);
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  
  Person.findById(personId, (err, data)=>{
    if(err){
      console.error(err);
      return done(err);
    }
    console.log("Found person:", data);
    data.favoriteFoods.push(foodToAdd);
    data.save((err, data)=>{
      if(err){
        console.error(err);
        return done(err);
      }
      console.log("Successfull saved:", data);
      done(err,data);
    })
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOne({name: personName}, (err, data)=>{
    if(err){
      console.error(err);
      return done(err);
    }
    console.log("Found Person", data);
    data.name = personName;
    data.save((err, data)=>{
      if(err){
        console.error(err);
        return done(err);
      }
      console.log("Updated age", data);
      done(err, data);

    });
  })

};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
