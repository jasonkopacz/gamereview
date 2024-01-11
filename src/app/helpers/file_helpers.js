import fs from 'fs/promises';
import path from 'path';

export async function getGamesData() {
    let games = await readFile('./games.json')
    let list = []
    let data = JSON.parse(games)
    data["results"].map(game => {
        let newObj = {
            'name': game.name,
            'slug': game.slug,
            'released': game.released,
            'background_image': game.background_image,
            'rating': game.rating,
            // 'ratings': [game.ratings],
            'reviews_text_count': game.reviews_text_count,
            'metacritic': game.metacritic,
            'esrb_rating': game.esrb_rating,
            // 'platforms': game.platforms
        }
        list.push(newObj)
    })
    return list;
}

function readFile(localPath) {
  return fs.readFile(
    path.join(process.cwd(), localPath),
    'utf8'
  );
}