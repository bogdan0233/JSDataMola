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
		parent.appendChild(title1)
	}
	
	let ul = document.createElement('ul');
	parent.appendChild(ul);

	for(let i = 0; i < list.length; i++){
		let li = document.createElement('li');
		li.innerHTML = list[i].value;
		ul.appendChild(li);
		if(list[i].children !== null){
			k = true;
			createList(title, list[i].children);
		}	
	}
}

let a = 'lk';
createList(a, listArray);