let body = document.getElementById('body');

let table = document.createElement('table');
table.className = 'table';
table.style.borderCollapse = 'collapse';

let text = document.createElement('div');
body.appendChild(text);

body.style.fontSize = '28px';

let button = document.createElement('button');
button.className = 'button';
button.style.width='6rem';
button.style.height = '2rem';
button.textContent = 'Start again';
body.appendChild(button);
button.style.display = 'none';
button.style.border = '0';
button.style.background = '#C5FFCA';

let k = 0;
let t = 0;

let arr = new Array(3);
for (let i = 0; i < arr.length; i++) {
  arr[i] = new Array(3);
}

for (let i = 0; i < arr.length; i++) {
  for (let j = 0; j < arr.length; j++) {
    arr[i][j] = 0;
  }
}

for(let i = 0; i < 3; i++){
  let tr = document.createElement('tr');

  for( let i = 0; i < 3; i++){
        let td = document.createElement('td');
        td.style.border = '1px solid black';
        td.style.width = '5rem';
        td.style.height = '5rem';
        td.style.textAlign = 'center';
        td.id = k;
        tr.appendChild(td);
        k++;
  }

  table.appendChild(tr);
}

table.style.width = '15rem';
table.style.height = '15rem';

body.appendChild(table);

let elOfTable = document.querySelector('.table');

elOfTable.addEventListener('click', click);

button.addEventListener('click', () => {
  table.style.display = 'block';
  button.style.display = 'none';
  text.style.display = 'none';
  body.style.color = 'black';
  for(let i = 0; i < 9; i++){
    document.getElementById(+i).textContent = '';
  }
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
     arr[i][j] = 0;
    }
  }
  t = 0;
});

let end = false;

function click(event){
  if(event.target.tagName !== 'TD'){
    return;
  }

  if(event.target.innerHTML !== ''){
    return;
  }
 
  event.target.innerHTML = 'X';
  event.target.style.padding = '0';
  arr[Math.floor(Number(event.target.id) / 3)][Math.floor(Number(event.target.id) % 3)] = 3;
  let el;
  let a;
  end = false;
  
  while(true){
    if( t === 4){
      break;
    }  
    a = getRandomIntFromRange(0, 8);
    el = document.getElementById(a);
    if(el.textContent === ''){
      el.textContent = 'O';
      arr[Math.floor(Number(el.id) / 3)][Math.floor(Number(el.id) % 3)] = 2;
      t++;
      break;
    }
    
  }
  
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if(arr[i][j] === 0){
        end = true;
      }
    } 
  }
  if(win(arr)){
    button.style.display = 'block';
    table.style.display = 'none';
    text.style.display = 'block';
    text.textContent = 'You win!';
    body.style.color = 'green';
    return;
  }
      
  if(lose(arr)){
    table.style.display = 'none';
    text.style.display = 'block';
    text.textContent = 'You lose:(';
    body.style.color = 'red';
    button.style.display = 'block';
    return;
  }
      
  if(!end){
    table.style.display = 'none';
    text.style.display = 'block';
    text.innerHTML = 'Draw';
    button.style.display = 'block';
    return;
  }
  
}

function getRandomIntFromRange(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; 
}

function win(arr){

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {

      if((arr[0][j] === 3 && arr[1][j] === 3 && arr[2][j] === 3) || (arr[i][0] === 3 && arr[i][1] === 3 && arr[i][2] === 3)){
        return true;
      }

      if((arr[0][2] === 3 && arr[1][1] === 3 && arr[2][0] === 3) || (arr[0][0] === 3 && arr[1][1] === 3 && arr[2][2] === 3)){
        return true;
      }
    } 
  }
  return false;
}


function lose(arr){
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {

      if((arr[0][j] === 2 && arr[1][j] === 2 && arr[2][j] === 2) || (arr[i][0] === 2 && arr[i][1] === 2 && arr[i][2] === 2)){
        return true;
      }

      if((arr[0][2] === 2 && arr[1][1] === 2 && arr[2][0] === 2) || (arr[0][0] === 2 && arr[1][1] === 2 && arr[2][2] === 2)){
        return true;
      }
    } 
  }
  return false;
}