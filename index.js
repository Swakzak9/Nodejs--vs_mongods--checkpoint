const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number },
  favoriteFoods: { type: [String] }
});

const Person = mongoose.model('Person', personSchema);

const person = new Person({
    name: 'John Doe',
    age: 30,
    favoriteFoods: ['Pizza', 'Pasta']
  });
  
  person.save(function(err, data) {
    if (err) return console.error(err);
    console.log('Person saved:', data);
  });

  const arrayOfPeople = [
    { name: 'Alice', age: 28, favoriteFoods: ['Salad', 'Tacos'] },
    { name: 'Bob', age: 34, favoriteFoods: ['Burger', 'Fries'] }
  ];
  
  Person.create(arrayOfPeople, function(err, people) {
    if (err) return console.error(err);
    console.log('People created:', people);
  });

  Person.find({ name: 'John Doe' }, function(err, people) {
    if (err) return console.error(err);
    console.log('Found people:', people);
  });

  //Find one person by favorite food
  Person.findOne({ favoriteFoods: 'Pizza' }, function(err, person) {
    if (err) return console.error(err);
    console.log('Found person:', person);
  });

  // Find a person by _id
  const foodieId = '60d5f1c2e5b6b2f3f4a5c6d7'; 

Person.findById(foodieId, function(err, person) {
  if (err) return console.error(err);
  console.log('Found person:', person);
});

//Update a document by _id:
const updateId = '60d5f1c2e5b6b2f3f4a5c6u7'; 

Person.findById(updateId, function(err, person) {
  if (err) return console.error(err);
  person.favoriteFoods.push('hamburger');
  person.save(function(err, updatedPerson) {
    if (err) return console.error(err);
    console.log('Updated person:', updatedPerson);
  });
});
 
//Update a document with findOneAndUpdate()
const personName = 'Alice';

Person.findOneAndUpdate({ name: personName }, { age: 20 }, { new: true }, function(err, updatedPerson) {
  if (err) return console.error(err);
  console.log('Updated person:', updatedPerson);
});

//Delete multiple documents by name:
Person.remove({ name: 'Mary' }, function(err, result) {
    if (err) return console.error(err);
    console.log('Delete result:', result);
  });

  //Find people who like burritos, sort, limit, and hide age:
  Person.find({ favoriteFoods: 'burritos' })
  .sort({ name: 1 })
  .limit(2)
  .select('-age') // Exclude age from the result
  .exec(function(err, people) {
    if (err) return console.error(err);
    console.log('People who like burritos:', people);
  });