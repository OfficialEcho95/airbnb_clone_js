const mongoose = require('mongoose');
const faker = require('faker');
const Place = require('./models/place');

// Connect to MongoDB
mongoose.connect('mongodb+srv://emmanuel:Emma55527378.@cluster0.wumdwwd.mongodb.net/airbnb_clone?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// Function to generate a random number within a range
const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Generate fake data for Places
const generateFakePlaces = async (count) => {
  const fakePlaces = [];

  for (let i = 0; i < count; i++) {
    const fakePlace = {
      city: mongoose.Types.ObjectId(), // Generate a fake ObjectId for City
      user: mongoose.Types.ObjectId(), // Generate a fake ObjectId for User
      state: mongoose.Types.ObjectId(), // Generate a fake ObjectId for State
      name: faker.company.companyName(),
      description: faker.lorem.sentence(),
      number_rooms: getRandomNumber(1, 5),
      number_bathrooms: getRandomNumber(1, 3),
      max_guest: getRandomNumber(1, 10),
      price_by_night: getRandomNumber(50, 200),
      latitude: faker.address.latitude(),
      longitude: faker.address.longitude(),
      image: faker.image.imageUrl(),
      ratings: getRandomNumber(1, 5),
    };

    fakePlaces.push(fakePlace);
  }

  return fakePlaces;
};

// Save fake places to the database
const saveFakePlaces = async () => {
  try {
    const fakePlaces = await generateFakePlaces(50);
    await Place.insertMany(fakePlaces);
    console.log('50 Fake places created successfully');
  } catch (error) {
    console.error('Error creating fake places:', error);
  } finally {
    // Disconnect from MongoDB after creating fake places
    mongoose.disconnect();
  }
};

// Call the function to save 50 fake places
saveFakePlaces();
