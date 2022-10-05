'use strict';
const itemBox = document.querySelector('.to-do-items');

const btn = document.getElementById('btn');
const itemContainer = document.querySelector('.to-do-container');
const input = document.querySelector('#input');
const tasks = document.querySelectorAll('.to-do-items');
const checkBox = document.querySelector('.check');
const textBox = document.querySelector('.text');
const deleteIcons = document.querySelectorAll('.delete');
const url ='https://jsonplaceholder.typicode.com/todos';

//////////Click Event Function Declaration
const clickEvent = function() {
alert('Succesful POST request made!');
///// POST REQUEST
const newTask = document.getElementById('input').value;
const newItem = {
title: `${newTask}`,
completed: false,
userID: 2,
};

const options = {
method: 'POST',
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify(newItem),
};

fetch(url, options)
  .then(data => {
      if (!data.ok) {
        throw Error(data.status);
       }
       return data.json();
     }).then(newItem => {
      console.log(newItem);
      }).catch(e => {
      console.log(e);
      });
}
///////////////////////////////////////////////

btn.addEventListener('click', clickEvent);
input.addEventListener('keydown', (e)=>{
  if(e.key === 'Enter')clickEvent();
})

////////////////////////////////////////////////////////////////////////////////////////////
// GET REQUEST

const completedTasks = [];
const pendingTasks = [];
const request = fetch(url);
request.then(function (response) {
  return response.json();
}).then(function(data) {
  data.forEach((item, i) => {
    // Display completed tasks
    if(item.completed === true){
      // console.log(item);
      completedTasks.push(item);
    }else{
      pendingTasks.push(item);
    }
  });
  // console.log(pendingTasks);
  completedTasks.forEach(function (task, i) {
    const title = `<div class='task'>${i + 1}. ${task.title}</div>`;
    document.querySelector('.completed').insertAdjacentHTML("beforeend", title);
  })
  pendingTasks.forEach(function (task, i) {
    const title = `<div class='task'>${i + 1}. ${task.title}</div>`;
    document.querySelector('.pending').insertAdjacentHTML("beforeend", title);
  })
});

////////////////////////PUT REQUEST////////////////////////////

// Target objet with ID 2
const target = 'https://jsonplaceholder.typicode.com/todos/2';
const modifiedItem = {
  id: 2,
  userID: 1,
  title: "Ekene's PUT request",
  completed: true,
}

const putOptions = {
  method: 'PUT',
  body: JSON.stringify(modifiedItem),
  }
fetch(target, putOptions).then(function (response) {
  //////Check if post request was succesful/////
  console.log(response.status)
  return response.json();
})
