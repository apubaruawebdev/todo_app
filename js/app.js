// get elements 
let todo_name = document.querySelector('#todo_name');
let clientName = document.querySelector('#clientName');
let todo_date = document.querySelector('#todo_date');
let todo_time = document.querySelector('#todo_time');
let todo_form = document.querySelector('#todo_form');
let showContent = document.querySelector('.showContent');




// Form submit to add data 
todo_form.onsubmit = (e) => {
  e.preventDefault();

  let day1 = new Date(todo_date.value + ' ' + todo_time.value);
  let day2 = new Date();


  let storageVal = localStorage.getItem('todoapps');
  let doArray;

  if(storageVal == null){
    doArray = [];
  }else{
    doArray = JSON.parse(storageVal);
  }

  doArray.push({
    name : todo_name.value,
    client : clientName.value,
    remain : (day1.getTime() - day2.getTime()),
    dead_line : day1.getTime()
  });

  localStorage.setItem('todoapps', JSON.stringify(doArray));
  
  todo_form.reset();
  showList();
  
}

/**
 * Auto load showList
 */
setInterval(() => {
  showList();
}, 1000);

/**
 * Show list 
 */
 showList();
function showList(){

  let day = new Date();
  
  let storageVal = localStorage.getItem('todoapps');
  let doArray;
  let data = '';

  if(storageVal == null){
    doArray = [];
  }else{
    doArray = JSON.parse(storageVal);
  }

  doArray.map((val, index) => {
     data += `<li class="list-group-item shadow">
    ${val.name} | Client : ${val.client} | Remain time : <strong>[ ${reamainTime(val.dead_line, day.getTime())} ]</strong>
    <span style="${rangeBar(val.remain, val.dead_line)}" class="status"></span>
  </li>`;
  });

  showContent.innerHTML = data;
  
}


function rangeBar(remain, dead_line){
  let day = new Date();
  let current_remain =  dead_line - day.getTime();
  
  let remainPer = (100*current_remain) / remain;

  let width =  Math.floor(remainPer);

  if( width <= 0 ){
    width = `width:100%; background-color:red;`;
  }else if(width >= 0 && width <= 30){
    width = `width:${width}%; background-color:pink;`;
  }else if(width >= 30 && width <= 40){
    width = `width:${width}%; background-color:orange;`;
  }else if(width >= 41 && width <= 70){
    width = `width:${width}%; background-color:blue;`;
  }else if(width >= 71 && width <= 100){
    width = `width:${width}%; background-color:green;`;
  }

  return width;

}

/**
 * Remain Date 
 */

 function reamainTime(dead_line, current_time){
   
  let total_sec = Math.floor((dead_line - current_time) / 1000);
  let total_min = Math.floor(total_sec / 60);
  let total_hours = Math.floor(total_min / 60);
  let total_Days = Math.floor(total_hours / 24);


  let hours = total_hours - (total_Days * 24);
  let min = total_min - (total_Days * 24 * 60) - (hours * 60);
  let sec = total_sec - (total_Days * 24 * 60 * 60) - (hours * 60 * 60) - (min * 60);

  if(dead_line > current_time){
    return `${total_Days} days ${hours} hours ${min} mins ${sec} Sec`;
  }else{
    return `<strong style="color:red;">Time over</strong>`;
  }

  
 }


 /**
  * Delete Do List
  */
 function deleteList(index){
  
  
  let storageVal = localStorage.getItem('todoapps');
  let doArray;


  if(storageVal == null){
    doArray = [];
  }else{
    doArray = JSON.parse(storageVal);
  }

  doArray.splice(index, 1);
  localStorage.setItem('todoapps', JSON.stringify(doArray));
  showList();

 }



