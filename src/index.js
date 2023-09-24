import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import SlimSelect from "slim-select";
import "slim-select/dist/slimselect.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const items = {
  selector: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};
  
 const { selector, loader, error, catInfo } = items;

 function onError(error) {
  selector.classList.remove('is-hidden');
  loader.classList.replace('loader', 'is-hidden');

  Notify.failure('Oops! Something went wrong! Try reloading the page or select another cat breed!', {
    position: 'center-center',
    timeout: 5000,
    width: '400px',
    fontSize: '24px'
  });
}
selector.addEventListener('change', selectorChange);
getBreeds();

function selectorChange (evt) {
  catInfo.classList.remove('is-visible');
  loader.classList.remove('is-hidden');
  const breedId = evt.currentTarget.value;
  fetchCatByBreed(breedId)
    .then(breed => {
      catInfo.innerHTML = catHtml(breed);
      loader.classList.add('is-hidden');
      catInfo.classList.add('is-visible');
    })
    .catch(onError);
}

function getBreeds() {
  fetchBreeds()
    .then(breeds => {
      selector.insertAdjacentHTML("beforeend", selectCatBreed(breeds));
      selector.classList.add('is-visible');
      loader.classList.add('is-hidden');
      new SlimSelect({
        select: '.breed-select',
      });
    })
    .catch(error => {
      onError(error); 
    });
}
function selectCatBreed(breeds) {
  return breeds.map(({ id, name }) =>
    `<option value="${id}">${name}</option>`
  ).join('');
}

function catHtml(breed) {
  if (breed.length === 0) return null;

  const [{ url, breeds: [{ name, description, temperament }] }] = breed;
  return `<img class="cat-img" src="${url}" alt="" width="600"/>
    <div class="wrap-descr">
    <h1 class="title">${name}</h1>
    <p class="descr">${description}</p>
    <p class="temperament-txt">
    <span class="temperament">Temperament:</span>
    ${temperament}</p>
    </div>`;
}


