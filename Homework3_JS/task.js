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

  if(obj1.dateTo !== undefined)
    arr1 = arr1.filter((item) => item.createdAt < obj1.dateTo);
  if(obj1.dateFrom !== undefined)
    arr1 = arr1.filter((item) => item.createdAt > obj1.dateFrom); 

  return arr1.sort((prev, next) => next.createdAt - prev.createdAt).slice(begin, begin+count);;
}

//////////////////////

function getMessage(id) {
  let mess = messages.find(item => item.id === id);
  if(mess !== undefined)
    return mess;
  else
    console.log('Данный id не обнаружен.');
}

////////////////

function validateMessage(msg){

	if(msg.id!== undefined && (typeof msg.id === 'string') && msg.text!== undefined  && (typeof msg.text === typeof 'string') && msg.text.length < 200 && msg.createdAt!== undefined && (typeof msg.createdAt === 'object') && msg.author!== undefined && (typeof msg.author === 'string') && msg.isPersonal !== undefined && (typeof msg.isPersonal === 'boolean')){
    return true;
	}
  return false;
}



////////////////

const nameOfUser = 'Насекайло Богдан';

function addMessage(messObj){
    let max = Number(messages[0].id);
    messages.forEach(function(item){
      if(max < Number(item.id))
        max = Number(item.id);
    });
    messObj.id = String(+max + 1);
    messObj.createdAt = new Date();
    messObj.author = nameOfUser;

    if(validateMessage(messObj)){
      messages.push(messObj);  
    	return true;
    }

  	return false;
}

/////////////////


function editMessage(id , msg = {}){

  let mess = messages.find(item => item.id === id);

  let secondMess = {};
  for(let key in mess)
    secondMess[key]=mess[key];

  if(msg.text !== undefined)
    secondMess.text = msg.text;

  if(msg.isPersonal !== undefined)
    secondMess.isPersonal = msg.isPersonal;

  if(msg.to !== undefined)
    secondMess.to = msg.to;

  if(validateMessage(secondMess)){
    for( let key in secondMess)
    mess[key]=secondMess[key];
    return true;
  }

  return false;

}

//////////////////

function removeMessage(id){
  let mess = messages.findIndex((item, index) => item.id === id);
  if(mess !== -1)
    messages.splice(mess, 1);
  else 
    console.log('Данный id не найден');
}

return{
  getMessages,
  getMessage,
  addMessage,
  editMessage,
  removeMessage,
  validateMessage, 
  messages
};
})();

console.log('Function getMessages');

let example1 = myModule.getMessages(2, 7);
console.log(example1);

let example2 = myModule.getMessages(0, 10, {author: 'Федор', text: 'дом',  dateTo: new Date('2017-04-07T14:23:00') } );
console.log(example2);

let example3 = myModule.getMessages(0, 7, {author: 'Иван', dateFrom: new Date('2009-04-07T14:23:00'), dateTo: new Date('2018-04-07T14:23:00')});
console.log(example3);

let example4 = myModule.getMessages(0, 7, {author: 'Петр', text:'дел', dateFrom: new Date('2010-04-07T14:23:00'), dateTo: new Date('2021-04-07T14:23:00') } );
console.log(example4);

console.log(myModule.messages);


console.log('Function getMessage');

let example5 = myModule.getMessage('3');
console.log(example5);

let example6 = myModule.getMessage('89');
console.log(example6);


console.log('Function validateMessage');

let example7 = myModule.validateMessage(myModule.messages[0]);
console.log(example7);

//Объект для проверки метода, в нем поле id неправильного типа
let obj2 = {
  id : true,
  text : 'Я изучаю JS',
  createdAt : new Date(),
  author: 'Насекайло Богдан',
  isPersonal: true
}

let example8 = myModule.validateMessage(obj2);
console.log(example8);


console.log('Function addMessage');

let a = {
  text: 'Давай встретимся',
  isPersonal: false,
}

let b = {
  text: 'Всем добрый вечер!',
  isPersonal: 0
}

let example9 = myModule.addMessage(a);
console.log(example9);

let example10 = myModule.addMessage(b);
console.log(example10);


let object1={
  text: null,
  isPersonal: null,
  to: null
}

console.log('Function editMessage');

let edit = myModule.editMessage('1', { text: 'GoodBye'});
console.log(edit);

let edit1 = myModule.editMessage('17', { isPersonal: true, to: 'Леха Леухин'});
console.log(edit1);

//поле text с некорректным значением
let edit2 = myModule.editMessage('4', {text: 3});
console.log(edit2);

console.log(myModule.messages);


console.log('Function removeMessage');

myModule.removeMessage('5');
myModule.removeMessage('10');
myModule.removeMessage('678');
console.log(myModule.messages);

