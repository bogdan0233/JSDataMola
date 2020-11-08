'use strict';
const myModule = (function(){

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


let obj={
  author: null,
  dateFrom: null,
  dateTo: null,
  text: null
}

function getMessages(begin = 0, count = 10, obj1 = {}){
  let arr1 = [...messages];

  if(obj1.author !== undefined)
     arr1 = arr1.filter((item) => item.author.toLowerCase().includes(obj1.author.toLowerCase()));

  if(obj1.text !== undefined)
    arr1 = arr1.filter((item) => item.text.toLowerCase().includes(obj1.text.toLowerCase()));

  if(obj1.dateTo === undefined)
    obj1.dateTo = new Date('2030-04-07T14:23:00');
  if(obj1.dateFrom === undefined)
    obj1.dateFrom = new Date('1981-04-07T14:23:00');
  arr1 = arr1.filter((item) => item.createdAt < obj1.dateTo && item.createdAt > obj1.dateFrom); 

  return arr1.sort((prev, next) => next.createdAt - prev.createdAt).slice(begin, begin+count);;
}

console.log('Function getMessages');

let example1 = getMessages(2, 7);
console.log(example1);

let example2 = getMessages(0, 10, {author: 'Федор', text: 'дом',  dateTo: new Date('2017-04-07T14:23:00') } );
console.log(example2);

let example3 = getMessages(0, 7, {author: 'Иван', dateFrom: new Date('2009-04-07T14:23:00'), dateTo: new Date('2018-04-07T14:23:00')});
console.log(example3);

let example4 = getMessages(0, 7, {author: 'Петр', text:'дел', dateFrom: new Date('2010-04-07T14:23:00'), dateTo: new Date('2021-04-07T14:23:00')});
console.log(example4);

console.log(messages);

//////////////////////

console.log('Function getMessage');

function getMessage(id) {
  if(messages.find(item => item.id === id) !== undefined)
    return messages.find(item => item.id === id).text;
  else
    console.log('Данный id не обнаружен.');
}

let example5 = getMessage('3');
console.log(example5);

let example6 = getMessage('89');
console.log(example6);

////////////////

console.log('Function validateMessage');

function validateMessage(msg){

	if(msg.id!== undefined && (typeof msg.id === typeof 'hi') && msg.text!== undefined && msg.text.length < 200 && (typeof msg.text === typeof 'hi') && msg.createdAt!== undefined && (typeof msg.createdAt === typeof new Date()) && msg.author!== undefined && (typeof msg.author === typeof 'hi') && msg.isPersonal !== undefined && (typeof msg.isPersonal === typeof true)){
		if((msg.isPersonal === true && (msg.to === undefined || (typeof msg.to !== typeof 'hi'))) || (msg.isPersonal === false && msg.to !== undefined))
      return false;
    return true;
	}
  return false;
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
  text: 'Давай встретимся',
  isPersonal: false,
}

// В данном объкте пропущено поле to
let b = {
  text: 'Всем добрый вечер!',
  isPersonal: true,
 
}

const nameOfUser = 'Насекайло Богдан';

function addMessage(messObj){
    messObj.id = String(+messages[messages.length-1].id + 1);
    messObj.createdAt = new Date();
    messObj.author = nameOfUser;

    if(validateMessage(messObj)){
      messages.push(messObj);  
    	return true;
    }

  	return false;
}

let example9 = addMessage(a);
console.log(example9);

let example10 = addMessage(b);
console.log(example10);

/////////////////

let object1={
  text: null,
  isPersonal: null,
  to: null
}

console.log('Function editMessage');

function editMessage(id , msg = {}){

  let mess = messages.find(item => item.id === id);

  if(msg.text !== undefined)
    mess.text = msg.text;

  if(msg.isPersonal !== undefined)
    mess.isPersonal = msg.isPersonal;

  if(msg.to !== undefined)
    mess.to = msg.to;

  if(validateMessage(mess))
    return true;

  return false;

}

let edit = editMessage('1', { text: 'GoodBye'});
console.log(edit);

let edit1 = editMessage('17', { isPersonal: true, to: 'Леха Леухин'});
console.log(edit1);

//Пропущено поле to  при isPersonal true
let edit2 = editMessage('4', { isPersonal: true});
console.log(edit2);

console.log(messages);

//////////////////

console.log('Function removeMessage');

function removeMessage(id){
  
  if(messages.findIndex((item, index) => item.id === id) !== -1)
    messages.splice(messages.findIndex((item, index) => item.id === id), 1);
  else 
    console.log('Данный id не найден');
}

removeMessage('5');
removeMessage('10');
removeMessage('678');
console.log(messages);

})();