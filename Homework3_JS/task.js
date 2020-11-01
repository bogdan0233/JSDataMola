const messages = [
  {
     id: '1',
     text: 'Привет!',
     createdAt: new Date('2020-10-12T23:00:00'),
     author: 'Иванов Иван',
     isPersonal: true,
     to: 'Петров Петр'
  },
  {
     id: '2',
     text: 'Как дела?',
     createdAt: new Date('2020-11-12T12:46:00'),
     author: 'Петров Петр',
     isPersonal: false
  },
  {
     id: '3',
     text: 'Отлично!',
     createdAt: new Date('2020-11-12T13:18:00'),
     author: 'Федор Вереницкий',
     isPersonal: true,
     to: 'Петров Петр'
  },
  {
     id: '4',
     text: 'Что делаешь?',
     createdAt: new Date('2015-06-12T14:12:00'),
     author: 'Петров Петр',
     isPersonal: false
  },
  {
     id: '5',
     text: 'Ничего особоенного',
     createdAt: new Date('2004-12-12T14:46:00'),
     author: 'Федор Вереницкий',
     isPersonal: true,
     to: 'Петров Петр'
  },
  {
     id: '6',
     text: 'А я дома убираюсь',
     createdAt: new Date('2000-03-12T13:51:00'),
     author: 'Петров Петр',
     isPersonal: false
  },
  {
     id: '7',
     text: 'Какие планы на завтра?',
     createdAt: new Date('2020-10-12T11:00:00'),
     author: 'Иванов Иван',
     isPersonal: true,
     to: 'Петров Петр'
  },
  {
     id: '8',
     text: 'Ничего нового, все то же',
     createdAt: new Date('2021-12-12T12:46:00'),
     author: 'Федор Вереницкий',
     isPersonal: false
  },
  {
     id: '9',
     text: 'Что именно?',
     createdAt: new Date('2013-11-23T13:18:00'),
     author: 'Иванов Иван',
     isPersonal: true,
     to: 'Петров Петр'
  },
  {
     id: '10',
     text: 'Работа, дом, семья',
     createdAt: new Date('2011-04-07T14:23:00'),
     author: 'Федор Вереницкий',
     isPersonal: false
  },
  {
     id: '11',
     text: 'Понятненько',
     createdAt: new Date('2010-01-19T14:46:00'),
     author: 'Иванов Иван',
     isPersonal: true,
     to: 'Петров Петр'
  },
  {
     id: '12',
     text: 'Кто ходил вчера на матч?',
     createdAt: new Date('2020-10-12T15:51:00'),
     author: 'Петров Петр',
     isPersonal: false
  },
  {
     id: '13',
     text: 'Какой? Батэ Арсенал?',
     createdAt: new Date('2020-02-12T10:00:00'),
     author: 'Федор Вереницкий',
     isPersonal: true,
     to: 'Петров Петр'
  },
  {
     id: '14',
     text: 'Да, на этот',
     createdAt: new Date('2002-03-06T10:45:00'),
     author: 'Петров Петр',
     isPersonal: false
  },
  {
     id: '15',
     text: 'Я, наши как всегда победили))',
     createdAt: new Date('2022-11-12T13:18:00'),
     author: 'Иванов Иван',
     isPersonal: true,
     to: 'Петров Петр'
  },
  {
     id: '16',
     text: 'О, клево!',
     createdAt: new Date('2017-04-12T14:23:00'),
     author: 'Иванов Иван',
     isPersonal: false
  },
  {
     id: '17',
     text: 'Согласен',
     createdAt: new Date('2015-03-08T14:46:00'),
     author: 'Иванов Иван',
     isPersonal: true,
     to: 'Петров Петр'
  },
  {
     id: '18',
     text: 'Ну ладно, я спать пойду, спокойной ночи',
     createdAt: new Date('2000-03-12T15:51:00'),
     author: 'Федор Вереницкий',
     isPersonal: false
  },
  {
     id: '19',
     text: 'Споки ноки',
     createdAt: new Date('2009-10-12T23:00:00'),
     author: 'Иванов Иван',
     isPersonal: true,
     to: 'Петров Петр'
  },
  {
     id: '20',
     text: 'До завтра',
     createdAt: new Date('2020-11-12T12:46:00'),
     author: 'Федор Вереницкий',
     isPersonal: false
  }
];


for (index = 0; index < messages.length; ++index) {
  if(messages[index].text.length > 200)
    messages[index].text.substr(200, Infinity);
}

obj={
  author: null,
  dateFrom: null,
  dateTo: null,
  text: null
}

//Вспомогательные методы для функции getMessages
function filterByDate(arr2, obj1){
  
  if(obj1.dateTo !== undefined || obj1.dateFrom !== undefined){
    let arr3=[];
    let k = 0;
    if(obj1.dateTo!== undefined && obj1.dateFrom!== undefined){
      for (index = 0; index < arr2.length; ++index) {
        if(arr2[index].createdAt > obj1.dateFrom && arr2[index].createdAt < obj1.dateTo){
          arr3.push(arr2[index]);
        }
      }
      k++;
    }

    if(obj1.dateTo!== undefined && k === 0){
      for (index = 0; index < arr2.length; ++index) {
        if(arr2[index].createdAt < obj1.dateTo) {
          arr3.push(arr2[index]);          
        }
      }

      k++;
    }

    if(obj1.dateFrom!== undefined && k === 0){
      for (index = 0; index < arr2.length; ++index) {
        if(arr2[index].createdAt > obj1.dateFrom){
          arr3.push(arr2[index]);          
        }
      }

    }

    return arr3;
  }else{
    return arr2;
  }
  
 
}

function filterByAuthor(arr2, obj1){ 
  if(obj1.author !== undefined){
    let arr3=[];
    for (index = 0; index < arr2.length; ++index) {
      if(arr2[index].author.includes(obj1.author)){
        arr3.push(arr2[index]);
      }
    }
    return arr3;
  }else{
    return arr2;
  }
}

function filterByText(arr2, obj1){
  if(obj1.text !== undefined){
    let arr3=[];
    for (index = 0; index < arr2.length; ++index) {
      if(arr2[index].text.includes(obj1.text)){
        arr3.push(arr2[index]);
      }
    }
    
    return arr3; 
  }else{
    return arr2;
  }
}

function getMessages(begin = 0, count = 10, obj1 = {}){
  let arr1 = [];
  
  for (index = 0; index < messages.length; ++index) {
    arr1[index] = messages[index];
  }

  arr1 = filterByAuthor(arr1, obj1); 
  arr1 = filterByText(arr1, obj1);
  arr1 = filterByDate(arr1, obj1);
  
  arr1.sort((prev, next) => prev.createdAt - next.createdAt);

  for (index = 0; index < begin; ++index) {
      arr1.shift(messages[index]);
  }

  while( arr1.length > count){
    arr1.pop(arr1[arr1.length-1]);
  }
  return arr1;
}

console.log('Function getMessages');

let example1 = getMessages(2, 7);
console.log(example1);

let example2 = getMessages(0, 10, {author: 'Федор', text: 'дом',  dateTo: new Date('2017-04-07T14:23:00') } );
console.log(example2);

let example3 = getMessages(0, 7, {author: 'Иван', dateFrom: new Date('2010-04-07T14:23:00'), dateTo: new Date('2017-04-07T14:23:00')});
console.log(example3);

let example4 = getMessages(0, 7, {author: 'Петр', text:'дел', dateFrom: new Date('2010-04-07T14:23:00'), dateTo: new Date('2021-04-07T14:23:00')});
console.log(example4);

console.log(messages);


////////////

console.log('Function getMessage');

function getMessage(id) {
	
  let check = true;

	for (index = 0; index < messages.length; ++index) {
 		if(messages[index].id===id){
      check = false;
			return messages[index].text;
 		}
  }

  if(check === true)
    console.log('Данный id не найден.');
}

let example5 = getMessage('3');
console.log(example5);

let example6 = getMessage('89');
console.log(example6);

////////////////

console.log('Function validateMessage');

function validateMessage(msg){

	if(msg.id!== undefined && (typeof msg.id === typeof 'hi') && msg.text!== undefined && (typeof msg.text === typeof 'hi') && msg.createdAt!== undefined && (typeof msg.createdAt === typeof new Date()) && msg.author!== undefined && (typeof msg.author === typeof 'hi') && msg.isPersonal !== undefined && (typeof msg.isPersonal === typeof true)){
		return true;
	}else{
		return false;
	}
}

let example7 = validateMessage(messages[0]);
console.log(example7);

//Объект для проверки метода, в нем поле id неправильного типа
let obj2 = {
  id : true,
  text : 'Я изучаю JS',
  createdAt : new Date(),
  author: 'Насекайло Богдан',
  isPersonal: true
}

let example8 = validateMessage(obj2);
console.log(example8);

////////////////

console.log('Function addMessage');

let a = {
  id : '56',
  text : 'Я изучаю JS',
  createdAt : new Date(),
  author: 'Насекайло Богдан',
  isPersonal: true
}

// В данном объкте пропущено поле text
let b = {
  id : '56',
  createdAt : new Date(),
  author: 'Насекайло Богдан',
  isPersonal: true
}

function addMessage(msg){

    if(validateMessage(msg)){
      messages.push(msg);  
    	return true;
    }else{
    	return false;
    }
	
}

let example9 = addMessage(a);
console.log(example9);

let example10 = addMessage(b);
console.log(example10);

/////////////////

object1={
  text: null,
  isPersonal: null,
  to: null
}

console.log('Function editMessage');

function editMessage( id, msg = {}){
	for (index = 0; index < messages.length; ++index) {
    	if(messages[index].id===id){
    		if (validateMessage(messages[index])){
    			messages[index].text = msg.text;
    			return true;
    		}else{
    			return false;
    		} 			
   		}
    }

}

let edit = editMessage('1', { text: 'GoodBye'});
console.log(edit);
console.log(messages[0]);

//////////////////

console.log('Function removeMessage');

function removeMessage(id){
  let check1 = true;
  for (index = 0; index < messages.length; ++index) {
      if(messages[index].id===id){
        check1 = false;
        messages.splice(index, 1);
      }
  }
  if(check1 === true)
    console.log('Данный id не найден')
}

removeMessage('5');
removeMessage('8');
removeMessage('678');
console.log(messages);