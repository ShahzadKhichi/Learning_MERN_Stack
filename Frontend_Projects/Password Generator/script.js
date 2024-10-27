const dispaly = document.querySelector("#display");
const copyMsg = document.querySelector(".copyMsg");
const passLength = document.querySelector(".Length");
const slider = document.querySelector(".slider");
const msgBtn = document.querySelector(".msg-btn");
let length = 10;
let password = "";
let message = "";
const indicator = document.querySelector(".data-indicator");
const genratePassword = document.querySelector(".genrate");
const checkBoxes = document.querySelectorAll(".check");
checkBoxes[0].checked = true;
//setting intial value of length
passLength.innerHTML = length;
slider.value = length;
//function to genrate a random number between given min and max values
function genrateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
// adding Event Listner to get lastest length of password from range input
slider.addEventListener("input", (e) => {
  length = e.target.value;
  passLength.innerHTML = length;
  checkLength();
});
//adding event listener for copy msg
msgBtn.addEventListener("click", () => {
  copy();
  if (dispaly.value) {
    message = "copied";
  } else {
    message = "failed";
  }
  copyMsg.innerHTML = message;
  setTimeout(() => {
    copyMsg.innerHTML = "";
  }, 2000);
});
async function copy() {
  await navigator.clipboard.writeText(dispaly.value);
}
//funtion to genrate Upper Case Letters randomly
function upperCase() {
  return String.fromCharCode(genrateRandomNumber(65, 91));
}
//function to genrate lower case letters randomly
function lowerCase() {
  return String.fromCharCode(genrateRandomNumber(97, 123));
}
//function to genrate 0 to 9 numbers randomly
function Numbers() {
  return genrateRandomNumber(0, 10);
}
// function gentrate symbols randomly
function symbols() {
  let arr = "~!@#$%^&*()_+=-[]{}:;/?.>,<|";
  return arr[genrateRandomNumber(0, 28)];
}
//function to check length of password by comparing with number checked boxes
function checkLength() {
  let count = 0;
  checkBoxes.forEach((box) => {
    if (box.checked) {
      count++;
    }
  });
  if (count > length) {
    length = count;
    slider.value = count;
    passLength.innerHTML = length;
  }
}
checkBoxes.forEach((box) => {
  box.addEventListener("change", checkLength);
});
//password Shuffling
function shuffle(oldPassword) {
  for (let i = oldPassword.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = oldPassword[i];
    oldPassword[i] = oldPassword[j];
    oldPassword[j] = temp;
  }

  let str = "";
  oldPassword.forEach((el) => {
    str += el;
  });

  return str;
}
// genrating password

function genratePass() {
  dispaly.value = "";
  password = "";
  let funArr = [];
  checkBoxes.forEach((box) => {
    if (box.checked) {
      if (box.id == "Upper-case") {
        funArr.push(upperCase);
      }
      if (box.id == "Lower-case") {
        funArr.push(lowerCase);
      }
      if (box.id == "Numbers") {
        funArr.push(Numbers);
      }
      if (box.id == "Symbols") {
        funArr.push(symbols);
      }
    }
  });
  funArr.forEach((fun) => {
    password += fun();
  });
  for (let index = 0; index < length - funArr.length; index++) {
    let i = genrateRandomNumber(0, funArr.length);
    password += funArr[i]();
  }
  password = shuffle(Array.from(password));
  console.log(password);
  dispaly.value = password;
}
genratePassword.addEventListener("click", genratePass);
