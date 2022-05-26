import throttle from 'lodash.throttle';
import storage from './storege.js';

const formEl = document.querySelector('.feedback-form');

const allElOfForm = formEl.elements;
const inputEmailEl = formEl.querySelector('input');
const textareaMessageEl = formEl.querySelector('textarea');

let inputObj = {};

formEl.addEventListener('submit', function (event) {
  event.preventDefault();
  if (inputEmailEl.value && textareaMessageEl.value) {
    console.log({
      [inputEmailEl.name]: inputEmailEl.value,
      [textareaMessageEl.name]: textareaMessageEl.value,
    });
    formEl.reset();
    localStorage.removeItem('feedback-form-state');
    inputObj = {};
    alert('Thanks for your feedback!');
  } else if (inputEmailEl.value || textareaMessageEl.value) {
    alert('Please fill in all fields.');
  }
});

formEl.addEventListener('input', throttle(onInputPress, 500));

function onInputPress(event) {
  inputObj[event.target.name] = event.target.value;
  storage.save('feedback-form-state', inputObj);
}

const saveDateUserObj = storage.load('feedback-form-state');

for (const key in saveDateUserObj) {
  if (saveDateUserObj.hasOwnProperty(key)) {
    allElOfForm[key].value = saveDateUserObj[key];
    inputObj[key] = allElOfForm[key].value;
  }
}
