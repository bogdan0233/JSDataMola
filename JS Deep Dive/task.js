class Message{
  constructor(id, text, author, createdAt, isPersonal, to = undefined){
    this._id = id;
    this._text = text;
    this._author = author;
    this._createdAt = createdAt;
    this._isPersonal = isPersonal;
    if(this._isPersonal === true)
      this._to = to;
    else 
      this._to = undefined;
  }

  get id(){
    return this._id;
  }

  get createdAt(){
    return this._createdAt;
  }

  get to(){
    return this._to;
  }

  get author(){
    return this._author;
  }

  get isPersonal(){
    return this._isPersonal;
  }

  get text(){
    return this._text;
  }

  set text(text){
    this._text = text;
  }
  
  set isPersonal(isPersonal){
    this._isPersonal = isPersonal;
  }

  set to(to){
    return this._to = to;;
  }

}


class MessageList{
  constructor(arrOfMessages){
    this._arrOfMessages = arrOfMessages;
  }

  _user = 'Bogdan';

  get user(){
    return this._user;
  }

  set user(user){
    this._user = user;
  }

  getPage(begin = 0, count = 10, obj1 = {}){
    let arr1 = [...this._arrOfMessages];

    if(obj1.author !== undefined)
      arr1 = arr1.filter((item) => item.author.toLowerCase().includes(obj1.author.toLowerCase()));
   
    if(obj1.text !== undefined)
      arr1 = arr1.filter((item) => item.text.toLowerCase().includes(obj1.text.toLowerCase()));
      
    if(obj1.dateTo !== undefined)
      arr1 = arr1.filter((item) => item.createdAt < obj1.dateTo);

    if(obj1.dateFrom !== undefined)
      arr1 = arr1.filter((item) => item.createdAt > obj1.dateFrom); 

    arr1 = arr1.filter((item) => (item.author === this._user || item.to === this.user || item.isPersonal === false));

    return arr1.sort((prev, next) => next.createdAt - prev.createdAt).slice(begin, begin + count);
  }

  validate(msg){
    if(msg._id!== undefined && (typeof msg._id === 'string') && msg._text!== undefined  && (typeof msg._text === 'string') && msg._text.length < 200 && msg._createdAt!== undefined && (typeof msg._createdAt === 'object') && msg._author!== undefined && (typeof msg._author === 'string') && msg._isPersonal !== undefined && (typeof msg._isPersonal === 'boolean')){
      return true;
    }
    return false;
  }

  get(id){
    let mess = this._arrOfMessages.find(item => item.id === id);
    if(mess !== undefined)
      return mess;
    else
      console.log('Данный id не обнаружен.');
  }

  add(messObj){
    let max = Number(this._arrOfMessages[0]._id);
    this._arrOfMessages.forEach(function(item){
      if(max < Number(item.id))
        max = Number(item.id);
    });
    let id = String(+max + 1);
    let createdAt = new Date();
    let author = this._user;
    let text = messObj.text;
    let isPersonal = messObj.isPersonal;

    messObj = new Message(id, text, author, createdAt, isPersonal);

    if(this.validate(messObj)){
      this._arrOfMessages.push(messObj);  
      return true;
    }

    return false;
  }

  edit( id, msg = {}){

    let index = this._arrOfMessages.findIndex((item, index) => item.id === id);
      
    if( this._arrOfMessages[index]._author !== this._user){
      console.log("Вы не автор данного сообщения");
      return false;
    }
    let mess =  this._arrOfMessages.find(item => item.id === id);

    let secondMess = {};
    for(let key in mess)
      secondMess[key]=mess[key];

    if(msg.text !== undefined)
      secondMess.text = msg.text;

    if(msg.isPersonal !== undefined)
      secondMess.isPersonal = msg.isPersonal;

    if(msg.to !== undefined)
      secondMess.to = msg.to;

    console.log(secondMess);

    if(this.validate(secondMess)){
      for( let key in secondMess)
        mess[key]=secondMess[key];
       console.log(this._arrOfMessages);
      return true;
    }
   
    return false;

  }

  remove(id){
    let index = this._arrOfMessages.findIndex((item, index) => item.id === id);
    if(index !== -1){
      if( this._arrOfMessages[index].author !== this._user){
        console.log("Вы не автор данного сообщения");
        return false;
      }
      this._arrOfMessages.splice(this._arrOfMessages.findIndex((item, index) => item.id === id), 1);
      return true;  
    }
    else 
      console.log('Данный id не найден');
    return false;
  }

  addAll(arr){
    let arr1 = [];
    let arr2 = [...arr];

    for( let i = 0; i < arr2.length; i++){
      if(this.add(arr2[i]) === false)
        arr1.push(arr2[i]);
    }

    console.log(this._arrOfMessages);
    return arr1;
  }

  clear(){
    this._arrOfMessages = this._arrOfMessages.slice(0, 0);
    console.log(this._arrOfMessages);
  }
}

let listOfMessages = [
new Message('1', 'Всем привет!', 'Mark', new Date('2015-06-12T14:12:00'), false),
new Message('2', 'Здарова', 'Bogdan', new Date('2015-06-12T14:12:00'), false),
new Message('3', 'как дела?', 'Tom', new Date('2019-11-12T13:18:00'), true, 'Bogdan'),
new Message('4', 'Отлично! Сам как?', 'Mark', new Date('2015-06-12T14:12:00'), true),
new Message('5', 'Нормально', 'Mark', new Date('2015-06-12T14:12:00'), true),
new Message('6', 'Тоже неплохо', 'Bogdan', new Date('2018-06-12T14:12:00'), true),
new Message('7', 'Ничем особенным', 'Bogdan', new Date('2015-06-12T14:12:00'), false),
new Message('8', 'Понятненько', 'Bogdan', new Date('2018-10-12T11:00:00'), false),
new Message('9', 'Бывает','Tom', new Date('2001-10-12T11:00:00'), true),
new Message('10', 'Не хочешь сегодня встретиться?', 'Mark', new Date('2015-06-12T14:12:00'), false),
new Message('11', 'И погулять)', 'Bogdan', new Date('2015-06-12T14:12:00'), false),
new Message('12', 'В 2?', 'Tom', new Date('2015-06-12T14:12:00'), true),
new Message('13', 'Давай', 'Mark', new Date('2015-06-12T14:12:00'), true, 'Bogdan'),
new Message('14', 'Хорошо', 'Mark', new Date('2010-10-12T11:00:00'), false),
new Message('15', 'Только погулять недолго получится', 'Bogdan', new Date('2014-10-12T11:00:00'), true),
new Message('16', 'Мне еще надо с Колей встретиться', 'Tom', new Date('2006-10-12T11:00:00'), false),
new Message('17', 'До скольки?', 'Tom', new Date('2017-10-12T11:00:00'), false),
new Message('18', 'До пяти', 'Bogdan', new Date('2008-10-12T11:00:00'), true),
new Message('19', 'А, ну так отлично', 'Mark', new Date('2015-10-12T11:00:00'), false),
new Message('20', 'До встречи тогда', 'Tom', new Date('2005-10-12T11:00:00'), true)
];

console.log(listOfMessages);

let messages1 = new MessageList(listOfMessages);

console.log('Function get');

let example10 = messages1.get('2');
console.log(example10);

console.log('Function add');

let mess4 = { text: 'bbbbbbb', isPersonal: true};
let example20 = messages1.add(mess4);
console.log(example20);

console.log('Function remove');

let example30 = messages1.remove('2');
console.log(example30);

let example31 = messages1.remove('20');
console.log(example31);

console.log('Function getPage');

let example1 = messages1.getPage(2, 7);
console.log(example1);

let example2 = messages1.getPage(0, 10, {text: 'до', dateTo: new Date('2017-04-07T14:23:00') } );
console.log(example2);

let example3 = messages1.getPage(0, 7, {author: 'Bogdan', text: 'погу', dateFrom: new Date('2009-04-07T14:23:00'), dateTo: new Date('2018-04-07T14:23:00')});
console.log(example3);

let example4 = messages1.getPage(0, 7, {author: 'Tom', dateFrom: new Date('2010-04-07T14:23:00'), dateTo: new Date('2021-04-07T14:23:00')});
console.log(example4);

console.log('Function edit');

let example5 = messages1.edit('6', { text: 'vhvhjv' });
console.log(example5);

let example50 = messages1.edit('10', { text: 'goodbye' });
console.log(example50);

console.log('Function addAll');

let arr2 = [
  new Message( null, 'Hinjhk', null, null, false),
  new Message( null, 'Hello nj', null, false),//отсутствует одно поле
  new Message( null, 'Hivhg', null, null, true)
]

let example6 = messages1.addAll(arr2);
console.log(example6);

console.log('Function clear');
messages1.clear();


