const fs = require('fs');
const csv = require('csv-parser');
// const fetch = require('node-fetch');
const supabase = '../database';
const apiKey = 'd769c6d72b58557bdef8f2c3893df62f330b04d6';
const baseUrl = 'https://www.giantbomb.com/api';
const endpoint = '/game';
const format = 'json';
const number = 1;
let field_list = 'rating,description,developers,genres,number_of_reviews,original_release_date';
let results = [];
const fetchData = async () => {
  try {
    console.log(number)
    const response = await fetch(`${baseUrl}${endpoint}/${api_detail_url}?api_key=${apiKey}&format=${format}&field_list=${field_list}`);
    let data = await response.json();
    results.push(...data.results);
    // console.log(data.results)
    // return
    if (number <= 3) {
      return
      number++;
      fetchData();
    }
    else if (results.length === 10000) {
      console.log(10000)
      return
      // number++;
      // appendToCsv(data.results);
      // fetchData(); // Fetch the next game
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
  // const { data, error } = await supabase
  // .from('games')
  // .upsert({ ...results })
  // .select()
};

const appendToCsv = (data) => {
  const existingCsv = fs.readFileSync('giant_bomb_games_list.csv', 'utf8'); // Replace 'existing.csv' with your file name

    // Append the new data to the existing CSV content
    const updatedCsv = existingCsv + jsonDataToCsv(data);

    // Write the updated CSV content back to the file
    fs.writeFileSync('giant_bomb_games_list.csv', updatedCsv);
}

function jsonDataToCsv(jsonData) {
  const rows = jsonData.map(obj => {
     // const aliases = obj.aliases;
     const api_detail_url = obj.api_detail_url;
     // const date_added = obj.date_added;
     // const date_last_updated = obj.date_last_updated;
     const deck = JSON.stringify(obj.deck);
     // const description = obj.description;
     // const expected_release_day = obj.expected_release_day;
     // const expected_release_month = obj.expected_release_month;
     // const expected_release_quarter = obj.expected_release_quarter;
     // const expected_release_year = obj.expected_release_year;
     const guid = obj.guid;
     const id = obj.id;
     // const image = obj.image;
     // const image_tags = obj.image_tags;
     const name = obj.name;
     // const number_of_user_reviews = obj.number_of_user_reviews;
     // const original_game_rating = obj.original_game_rating;
     // const original_release_date = obj.original_release_date;
     // const platforms = obj.platforms;
     // const site_detail_url = obj.site_detail_url;
    const row = `${api_detail_url},${deck},${guid},${id},${name}\n`
    return row
  });
  return rows.join('\n');
}

const createAndWriteToCsv = (data) => {
  // Define the CSV file name
  const csvFileName = 'giant_bomb_games_list.csv';

  // Create a write stream to the CSV file
  const writeStream = fs.createWriteStream(csvFileName);

  // Write the CSV header
  writeStream.write(
    'rating, description, developers, genres, number_of_reviews, release_date\n'
  );

  // data.forEach(item => {
  //   fs.appendFile(csvFileName, item, function (err) {
  //     if (err) throw err;
  // })})
  // fs.appendFile(csvFileName, data, function (err) {
  //   if (err) throw err;
  //   console.log('Saved!');
  // })

  // Iterate through the data and write each record to the CSV

  data.forEach((item) => {
    // const aliases = item.aliases;
    const api_detail_url = item.api_detail_url;
    // const date_added = item.date_added;
    // const date_last_updated = item.date_last_updated;
    const deck = JSON.stringify(item.deck);
    // const description = item.description;
    // const expected_release_day = item.expected_release_day;
    // const expected_release_month = item.expected_release_month;
    // const expected_release_quarter = item.expected_release_quarter;
    // const expected_release_year = item.expected_release_year;
    const guid = item.guid;
    const id = item.id;
    // const image = item.image;
    // const image_tags = item.image_tags;
    const name = item.name;
    // const number_of_user_reviews = item.number_of_user_reviews;
    // const original_game_rating = item.original_game_rating;
    // const original_release_date = item.original_release_date;
    // const platforms = item.platforms;
    // const site_detail_url = item.site_detail_url;

    // Write the record to the CSV file
    writeStream.write(
      `${api_detail_url},${deck},${guid},${id},${name}\n`
    )
    // writeStream.write(
    //   `${aliases},${api_detail_url},${date_added},${date_last_updated},${deck},${description},`
    //   + `${expected_release_day},${expected_release_month},${expected_release_quarter},${expected_release_year},`
    //   + `${guid},${id},${image},${image_tags},${name},${number_of_user_reviews},${original_game_rating},`
    //   + `${original_release_date},${platforms},${site_detail_url}\n`
    // );
  });
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