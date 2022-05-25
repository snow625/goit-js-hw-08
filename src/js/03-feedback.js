import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');

const inputEmailEl = formEl.querySelector('input');
const textareaMessageEl = formEl.querySelector('textarea');

formEl.addEventListener('submit', function (event) {
  event.preventDefault();
  if (inputEmailEl.value && textareaMessageEl.value) {
    console.log({
      [inputEmailEl.name]: inputEmailEl.value,
      [textareaMessageEl.name]: textareaMessageEl.value,
    });
    formEl.reset();
    localStorage.removeItem('feedback-form-state');
    inputObj.email = '';
    inputObj.message = '';

    alert('Thanks for your feedback!');
  } else if (inputEmailEl.value || textareaMessageEl.value) {
    alert('Please fill in all fields.');
  }
});

formEl.addEventListener('input', throttle(onInputPress, 500));

const inputObj = {
  email: '',
  message: '',
};

function onInputPress(event) {
  inputObj[event.target.name] = event.target.value;
  localStorage.setItem('feedback-form-state', JSON.stringify(inputObj));
}

const saveDateUserStr = localStorage.getItem('feedback-form-state');
const saveDateUseObj = JSON.parse(saveDateUserStr);

if (saveDateUseObj) {
  inputObj.email = saveDateUseObj.email;
  inputObj.message = saveDateUseObj.message;

  inputEmailEl.value = saveDateUseObj.email;
  textareaMessageEl.value = saveDateUseObj.message;
}
