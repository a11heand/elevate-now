/*
  Filename: AdvancedDataManipulation.js
  
  This code demonstrates advanced data manipulation techniques.
*/

// Import external libraries
const fs = require('fs');
const moment = require('moment');
const axios = require('axios');

// Global variables
let data = [];
let results = [];

// Read data from a JSON file
try {
  const rawData = fs.readFileSync('data.json');
  data = JSON.parse(rawData);
} catch (error) {
  console.error('Error reading data file:', error);
  process.exit(1);
}

// Manipulate and filter data
data.forEach((item) => {
  const { name, age, dateOfBirth } = item;

  // Age validation
  if (age < 18 || age > 99) {
    return;
  }

  // Calculate date and time difference
  const dob = moment(dateOfBirth);
  const now = moment();
  const yearsSinceBirth = now.diff(dob, 'years');
  const monthsSinceBirth = now.diff(dob, 'months');
  const daysSinceBirth = now.diff(dob, 'days');

  // Fetch additional data from external API
  axios
    .get(`https://api.example.com/users?name=${name}`)
    .then((response) => {
      const { data } = response;
      const user = data[0];

      // Further data manipulation and processing
      const { email, address } = user;
      const formattedAddress = `${address.street}, ${address.city}, ${address.country}`;

      results.push({
        name,
        age,
        email,
        address: formattedAddress,
        yearsSinceBirth,
        monthsSinceBirth,
        daysSinceBirth
      });
    })
    .catch((error) => {
      console.error('Error fetching user data:', error);
    });
});

// Save results to a JSON file
fs.writeFileSync('results.json', JSON.stringify(results));

// Display final results
console.log(results);

// Helper functions...

function fetchData(url) {
  return axios.get(url);
}

function processData(data) {
  // Process the data...
}

// ...more helper functions

// Start the program
fetchData('https://api.example.com/data')
  .then((response) => {
    const { data } = response;
    processData(data);
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
  });

// ...more code

// End of the file