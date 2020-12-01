listArray = [
  {
     value: 'Пункт 1.',
     children: null,
  },
  {
     value: 'Пункт 2.',
     children: [
        {
           value: 'Подпункт 2.1.',
           children: null,
        },
        {
           value: 'Подпункт 2.2.',
           children: [
              {
                 value: 'Подпункт 2.2.1.',
                 children: null,
              },
              {
                 value: 'Подпункт 2.2.2.',
                 children: null,
              }
           ],
        },
        {
           value: 'Подпункт 2.3.',
           children: null,
        }
     ]
  },
  {
     value: 'Пункт 3.',
     children: null,
  }
];

console.log(listArray.length);
let parent = document.getElementById('body');
let k = false;

function createList(title, list){
	if(k){
		let a = document.getElementsByTagName('li');
		parent = a[a.length - 1];
	}
	else{
		let title1 = document.createElement('h2');
		title1.innerHTML = title;
		parent.appendChild(title1);
	}
	
	let ul = document.createElement('ul');
	parent.appendChild(ul);
  if(!k)
    ul.className = 'list';
	for(let i = 0; i < list.length; i++){
		let li = document.createElement('li');
		li.innerHTML = '<b>' + list[i].value + '</b>';
		ul.appendChild(li);
		if(list[i].children !== null){
			k = true;
			createList(title, list[i].children);
		}	
	}
  
  let elOfList = document.querySelector('.list');
  elOfList.addEventListener('click', click);
}

function click(event){
  if(event.target.tagName !== 'B'){
    return;
  }

  let article = event.target.parentElement;
  let parentElemChildNodes = article.querySelector('ul');
  if(parentElemChildNodes !== null){
    if(parentElemChildNodes.style.display === 'none'){
      parentElemChildNodes.style.display = 'block';
    }
    else{
      parentElemChildNodes.style.display = 'none';
    }
  }
  
}

let a = 'lk';
createList(a, listArray);