import axios from "axios";
import moment from "moment";

const key = '587f618ce1104e4cac5d3aaa47792ba2';
const url = `https://newsapi.org/v2/top-headlines?apiKey=${key}`;

class NewsService {

  constructor(country = 'fr') {
    this.country = country;
  }

 capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  async getNewsByCategories(categories = []) {
    let news = [];
    let promises = categories.map(category => axios.get(`${url}&country=${this.country}&category=${category}`));
    let res = await Promise.all(promises);
    res.map(({data}, index) => data.articles.map(article => news.push({ category: this.capitalize(categories[index]), ...article })));
    news.sort(({publishedAt: a}, {publishedAt: b}) => {
      let ma = moment(a).format('X');
      let mb = moment(b).format('X');
      return ma > mb ? -1 : mb > ma ? 1 : 0;
    });
    return news;
  }

}

export default NewsService;
