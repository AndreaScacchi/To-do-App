const input = document.querySelector('.div-1 input');
const button = document.querySelector('.div-1 button');
const list = document.querySelector('.ul');
const buttonClear = document.querySelector('.div-3 button');

input.onkeyup = ()=>{
    let userValue = input.value;
    if(userValue.trim() != 0) {
        button.classList.add('active');
    } else {
        button.classList.remove('active');
    }
}

displayTask();

button.onclick = ()=>{
    let userValue = input.value.toUpperCase();
    let storageData = localStorage.getItem('New Task');
    if(storageData == null) {
        array = [];
    } else {
        array = JSON.parse(storageData);
    }
    array.push(userValue);
    localStorage.setItem('New Task', JSON.stringify(array));
    displayTask();
    button.classList.remove('active');
}


function displayTask() {
    let storageData = localStorage.getItem('New Task');
    if(storageData == null) {
        array = [];
    } else {
        array = JSON.parse(storageData);
    }
    const currentlyTask = document.querySelector('.tasks');
    currentlyTask.textContent = array.length;
    if(array.length > 0) {
        buttonClear.classList.add('active');
    } else {
        buttonClear.classList.remove('active');
    }
    let newList = "";
    array.forEach((element, index) => {
        newList += `<li class="checked">${element}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
    });
    list.innerHTML = newList;
    input.value = "";
}


function deleteTask(index) {
    let storageData = localStorage.getItem('New Task');
    array = JSON.parse(storageData);
    array.splice(index, 1);
    localStorage.setItem('New Task', JSON.stringify(array));
    displayTask();
}


buttonClear.onclick = ()=>{
    array = [];
    localStorage.setItem('New Task', JSON.stringify(array));
    displayTask();
}


let clock = () => {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let period = 'AM';
    if(hours == 0) {
        hours = 12;
    } else if(hours >= 12) {
        hours = hours - 12;
        period = 'PM';
    }
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    let time = `${hours}:${minutes}:${seconds}:${period}`;
    document.getElementById('clock').innerText = time;
    setTimeout(clock, 1000);
}

clock();
