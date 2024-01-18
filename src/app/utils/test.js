const fs = require('fs'); // Import the file system module
const csv = require('csv-parser'); // Import the csv-parser module
const fetch = require('node-fetch'); // Import the fetch module
const apiKey = 'd769c6d72b58557bdef8f2c3893df62f330b04d6';
const baseUrl = 'https://www.giantbomb.com/api';
const endpoint = '/games'; // Replace with your specific endpoint
const limit = 100; // Set the number of results per page
let page = 1; // Start with page 1
const format = 'json';
let field_list = 'api_detail_url,deck,guid,id,name';
let results = [];
const fetchData = async () => {
  try {
    console.log(page)
    const response = await fetch(`${baseUrl}${endpoint}?api_key=${apiKey}&limit=${limit}&page=${page}&format=${format}&field_list=${field_list}`);
    let data = await response.json();
    results.push(...data.results);
    // data.results.map(item => results.push(deepFlattenToObject(item)))
    // Process and use the data from this page as needed
    
    // Check if there are more pages
    // if (data.number_of_total_results > page * limit) {
    // if (page === 1) {
    //   createAndWriteToCsv(data.results)
    // }
    if (page < 3) {
      page++;
      createAndWriteToCsv(data.results);
      fetchData(); // Fetch the next page
    } else {
      return
      createAndWriteToCsv(data.results);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const createAndWriteToCsv = (data) => {
  // Define the CSV file name
  const csvFileName = 'giant_bomb_games_list.csv';

  // Create a write stream to the CSV file
  const writeStream = fs.createWriteStream(csvFileName);

  // Write the CSV header
  writeStream.write(
    'api_detail_url,deck,guid,id,name\n'
  );

  data.forEach(item => {
    fs.appendFile(csvFileName, item, function (err) {
      if (err) throw err;
  })})
  // fs.appendFile(csvFileName, data, function (err) {
  //   if (err) throw err;
  //   console.log('Saved!');
  // })

  // Iterate through the data and write each record to the CSV
  // data.forEach((item) => {
  //   // const aliases = item.aliases;
  //   const api_detail_url = item.api_detail_url;
  //   // const date_added = item.date_added;
  //   // const date_last_updated = item.date_last_updated;
  //   const deck = item.deck;
  //   // const description = item.description;
  //   // const expected_release_day = item.expected_release_day;
  //   // const expected_release_month = item.expected_release_month;
  //   // const expected_release_quarter = item.expected_release_quarter;
  //   // const expected_release_year = item.expected_release_year;
  //   const guid = item.guid;
  //   const id = item.id;
  //   // const image = item.image;
  //   // const image_tags = item.image_tags;
  //   const name = item.name;
  //   // const number_of_user_reviews = item.number_of_user_reviews;
  //   // const original_game_rating = item.original_game_rating;
  //   // const original_release_date = item.original_release_date;
  //   // const platforms = item.platforms;
  //   // const site_detail_url = item.site_detail_url;

  //   // Write the record to the CSV file
  //   writeStream.write(
  //     `${api_detail_url},${deck},${guid},${id},${name}\n`
  //   )
  //   // writeStream.write(
  //   //   `${aliases},${api_detail_url},${date_added},${date_last_updated},${deck},${description},`
  //   //   + `${expected_release_day},${expected_release_month},${expected_release_quarter},${expected_release_year},`
  //   //   + `${guid},${id},${image},${image_tags},${name},${number_of_user_reviews},${original_game_rating},`
  //   //   + `${original_release_date},${platforms},${site_detail_url}\n`
  //   // );
  // });
  writeStream.end();

  console.log(`Data written to ${csvFileName}`);
};


fetchData();


function deepFlattenToObject(obj) {
  return Object.keys(obj).reduce((acc, k) => {
    if (typeof obj[k] === 'object' && obj[k] !== null) {
      Object.assign(acc, deepFlattenToObject(obj[k]));
    } else {
      acc[k] = obj[k];
    }
    return acc;
  }, {});
}