const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '21036025-0af45920d07b4b5893c60df1e';

export default class apiService {
  constructor() {
    this.page = 1;
    this.query = '';
    this.per_page = 12;
  }
  get searchQuery() {
    return this.query;
  }
  set searchQuery(query) {
    this.page = 1;
    this.query = query;
  }

  async fetchImages() {
    const response = await fetch(
      `${BASE_URL}?key=${API_KEY}&page=${this.page}&per_page=${this.per_page}`
    );
    const json = await response.json();
    this.page++;
    return json;
  }

}
