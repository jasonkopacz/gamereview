const apiKey = "25c2bcabe0f84c32b4c1a41d66f18c9b";
const baseUrl = "https://api.rawg.io/api";
const endpoint = "/games";
let page = 1;
let results = [];

export const fetchData = async () => {
  try {
    console.log(page);
    const response = await fetch(
      `${baseUrl}${endpoint}?key=${apiKey}&page=${page}&page_size=40`
    );
    let data = await response.json();
    let formattedGames = data.results.forEach((game) => {
      // console.log(game);
      const genres = game.genres.flatMap((genre) => genre.name);
      const platforms = game.platforms.flatMap(
        (platform) => platform.platform.name
      );
      const screenshots = game.short_screenshots.flatMap(
        (screenshot) => screenshot.image
      );
      const tags = game?.tags.flatMap((tag) => tag.name);
      const slug = game?.slug;
      const name = game?.name;
      const released = game?.released;
      const background_image = game?.background_image;
      const rating = game?.rating;
      const metacritic = game?.metacritic;
      const esrb_rating = game?.esrb_rating?.name;
      results.push({
        name,
        slug,
        genres,
        tags,
        platforms,
        released,
        background_image,
        screenshots,
        esrb_rating,
        rating,
        metacritic
      });
    });
    if (page % 100 === 0) {
      // console.log(results);
      page++;
      fetchData();
    } else if (page < 11) {
      // console.log(results.length);
      page++;
      fetchData();
    } else {
      // console.log(results);
      return;
      // return results;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
