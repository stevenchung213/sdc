const faker = require('faker');
// const mongoose = require('mongoose');
// const House = require('./House.js');
const db = require('./index.js');
const csv = require('fast-csv');
const fs = require('fs');

const random = num => Math.ceil(Math.random() * num);

// const zestHistory = () => {
//   let total = 300000;
//   const years = 8 + random(2);
//   const months = random(12);
//   let count = 0;
//   const spike = [12, 7, 12, 5, 8, 5, 14, 3, 19, 1000];
//   const slope = [
//     -4000,
//     -3000,
//     -1000,
//     2000,
//     5000,
//     2000,
//     5000,
//     3000,
//     10000,
//     7000,
//     700,
//     -700,
//   ];
//   let moreSlope = 0;
//
//   return Array.from({ length: years * 12 + months }, () => {
//     count++;
//     if (count % spike[0] === 0) {
//       const rand = random(4);
//       moreSlope = rand > 2 ? 2000 : rand === 2 ? -2000 : 0;
//       if (spike[0] === 14) {
//         moreSlope = 8000;
//       }
//       spike.shift();
//     }
//     total += slope[Math.floor(count / 12)] + moreSlope;
//
//     return total + random(7000);
//   });
// };

console.time();

const statusArray = ['For Sale', 'Sold'];

const seedFunc = () => {
  let count = 1;
  return Array.from({length: 10000000}, () => {
    const id = count;
    count++;

    // const zestimate = zestHistory();
    return {
      propertyid: id,
      address: `'${faker.address.streetAddress()}'`,
      baths: 2.5 + 0.5 * Math.floor(Math.random() * 3),
      beds: 3 + Math.floor(Math.random() * 2.5),
      city: `'${faker.address.city()}'`,
      sqft: 1150 + 10 * random(20),
      status: `'${statusArray[Math.floor(Math.random() * 2)]}'`,
      zip: 98100 + random(99)
      // zestimate,
      // , taxAssessment: zestimate[zestimate.length - 1] * 0.937,
    };
  });
};

const seed = seedFunc();
console.timeEnd();


const sdcSeed = () => {
  console.time();
  const csvStream = csv.createWriteStream({headers: false}),
    writableStream = fs.createWriteStream("pg.csv");

  writableStream.on("finish", () => {
    console.log('CSV DONE!');
  });

  csvStream.pipe(writableStream);

  for (let i = 0; i < 10000000; i++) {
    csvStream.write(seed[i]);
  }

  csvStream.end();
  console.timeEnd();
};


sdcSeed();



// module.exports = seed;

// const seedDatabase = () => {
//   House.create(seed)
//     .then(() => mongoose.connection.close())
//     .catch(err => console.error(err));
// };
//
// seedDatabase();
