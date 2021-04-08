import './styles.css';
import 'material-design-icons/index';
import toastr from 'toastr';
import 'toastr/toastr.scss'

import apiService from './components/apiService';
import photoCardTpl from './templates/photo-card.hbs';

const api = new apiService();

const refs = {
  form: document.getElementById('search-form'),
  list: document.querySelector('.gallery'),
  loadMore: document.querySelector('[data-load-more]')
};

refs.form.addEventListener('submit', onFormSubmit);
refs.loadMore.addEventListener('click', search);


function onFormSubmit(e) {
  e.preventDefault();
  const searchQuery = e.target.elements.query.value.trim();
  if (!searchQuery) {
    toastr.error('Enter some word');
    return;
  }
  api.searchQuery = searchQuery;
  reset();
  search();
}

function reset(){
  refs.list.textContent = '';
}

async function search() {
  try {
    const pics = await api.fetchImages();
    refs.list.insertAdjacentHTML('beforeend', photoCardTpl(pics.hits));
  } catch (error) {
    toastr.error(error)
  }
}
