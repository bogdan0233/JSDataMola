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

class Model{
	constructor(arrOfMessages){
    this.arrOfMessages = arrOfMessages;
  	}

  	user;

  	validate(msg){
    if(msg.id !== undefined && (typeof msg.id === 'string') && msg.text!== undefined  && (typeof msg.text === 'string') && msg.text.length < 200 && msg.createdAt!== undefined && (typeof msg.createdAt === 'object') && msg.author!== undefined && (typeof msg.author === 'string') && msg.isPersonal !== undefined && (typeof msg.isPersonal === 'boolean')){
      return true;
    }
    return false;
    }

	getPage(begin = 0, count = 10, obj1 = {}){
    let arr1 = [...this.arrOfMessages];

    if(obj1.author !== undefined)
      arr1 = arr1.filter((item) => item.author.toLowerCase().includes(obj1.author.toLowerCase()));
   
    if(obj1.text !== undefined)
      arr1 = arr1.filter((item) => item.text.toLowerCase().includes(obj1.text.toLowerCase()));
      
    if(obj1.dateTo !== undefined)
      arr1 = arr1.filter((item) => item.createdAt < obj1.dateTo);

    if(obj1.dateFrom !== undefined)
      arr1 = arr1.filter((item) => item.createdAt > obj1.dateFrom); 

    arr1 = arr1.filter((item) => (item.author === this.user || item.to === this.user || item.isPersonal === false));
    console.log(arr1);
    return arr1.sort((prev, next) => next.createdAt - prev.createdAt).slice(begin, begin + count);
   }

   add(messObj){
    let max = Number(this.arrOfMessages[0].id);
    this.arrOfMessages.forEach(function(item){
      if(max < Number(item.id))
        max = Number(item.id);
    });
    let id = String(+max + 1);
    let createdAt = new Date();
    let author = this.user;
    let text = messObj.text;
    let isPersonal = messObj.isPersonal;

    messObj = new Message(id, text, author, createdAt, isPersonal);

    if(this.validate(messObj)){
      this.arrOfMessages.push(messObj);  
      return true;
    }

    return false;
  }

   remove(id){
   	let index = this.arrOfMessages.findIndex((item, index) => item.id === id);
    if(index !== -1){
      if( this.arrOfMessages[index].author !== this.user){
        console.log("Вы не автор данного сообщения");
        return false;
      }
      this.arrOfMessages.splice(this.arrOfMessages.findIndex((item, index) => item.id === id), 1);
      return true;  
    }
    else 
      console.log('Данный id не найден');
    return false;
   }

    edit( id, msg = {}){

	    let index = this.arrOfMessages.findIndex((item, index) => item.id === id);
	      
	    if( this.arrOfMessages[index].author !== this.user){
	      console.log("Вы не автор данного сообщения");
	      return false;
	    }
	    let mess =  this.arrOfMessages.find(item => item.id === id);

	    let secondMess = {};
	    for(let key in mess)
	      secondMess[key]=mess[key];

	    if(msg.text !== undefined)
	      secondMess.text = msg.text;

	    if(msg.isPersonal !== undefined)
	      secondMess.isPersonal = msg.isPersonal;

	    if(msg.to !== undefined)
	      secondMess.to = msg.to;

	    if(this.validate(secondMess)){
	      for( let key in secondMess)
	        mess[key]=secondMess[key];
	      return true;
	    }
	   
	    return false;

    }
}

class UserList{
	constructor(users, activeUsers){
		this.users = users;
		this.activeUsers = activeUsers;
	}
}

class HeaderView{
	constructor( containerId ){
		this.containerId = document.getElementById(containerId);
	}

	display(user){
	    this.containerId.style.cssText = `color: #324CA8; font-size: 24px; margin-top: 0.7rem;`;
	    this.containerId.textContent = 'Name account: ' + user;
	}
}

class MessagesView{
	constructor( containerId ){
		this.list = document.getElementById(containerId);
	}

	user;
    
	display(msgs, user = null){
		let obj = document.getElementsByClassName('mes');
		let arr = [...obj];
		for(let i = 0; i < arr.length; i++)
			this.list.removeChild(arr[i]);//чистим наше окно с сообщениями, чтобы заполнить его новыми
		for(let i = msgs.length - 1; i >= 0; i--){
			let div = document.createElement('div');
			div.className='mes';
			if(msgs[i].author === this.user)
				div.style.backgroundColor = '#DAFFBC';
			else
				div.style.backgroundColor = '#F7FFE5';
			div.style.marginLeft = '0.5rem';
			div.style.marginTop = '0.8rem';
			div.style.padding = '0.3rem';
			div.style.width = '30rem';
			let div1 = document.createElement('div');
			let div2 = document.createElement('div');
			let date1 = msgs[i].createdAt;
			div1.innerHTML = msgs[i].text;
			div2.innerHTML = msgs[i].author + ' '+ date1.getHours() + ':' + date1.getMinutes()+' '+ date1.getDate()+'.'+ (date1.getMonth()+1) + '.' + date1.getFullYear() ;
			div2.style.cssText = `font-size: 12px`;
			div.appendChild(div1);
			div.appendChild(div2);
			this.list.appendChild(div);
		}
	}
}

class ActiveUsersView{
	constructor( containerId ){
		this.containerId = document.getElementById( containerId );
	}

	display(arr){
		this.containerId.style.overflow = 'hidden';
		this.containerId.style.overflowY = 'scroll';
		for(let i = 0; i < arr.length; i++){
			let div = document.createElement('div');
			div.innerHTML = arr[i];
			div.style.cssText = `color: #1345C5;`;
			div.style.height = '2rem';
			div.style.paddingLeft = '0.5rem';
			let pic = document.createElement("IMG");
			pic.src = "write-message.jpg";
			pic.style.height = '1rem';
			pic.style.float = 'right';
			pic.style.marginTop = '0.2rem';
			pic.style.marginRight = '0.7rem';
			div.appendChild(pic);
			this.containerId.appendChild(div);
		}
		
	}
}

class PersonalUsersView{
	constructor( containerId ){
		this.containerId = document.getElementById( containerId );
	}

	display(arr){
		this.containerId.style.overflow = 'auto';
		for(let i = 0; i < arr.length; i++){
			let div = document.createElement('div');
			div.innerHTML = arr[i];
			div.style.cssText = `color: white; font-size: 20px; `;
			let pic = document.createElement("IMG");
			pic.src = "user4.jpg";
			div.style.height = '2.5rem';
			div.style.paddingLeft = '0.5rem';
			pic.style.height = '2rem';
			pic.style.marginTop = '0.1rem';
			pic.style.marginLeft = '0.7rem';
			pic.style.marginRight = '0.7rem';
			pic.style.float = 'left';
			div.style.paddingTop = '0.3rem';
			div.style.borderBottom = '2px solid rgb(255, 254, 229, 0.5)';
			div.appendChild(pic);
			this.containerId.appendChild(div);
		}
	}
}

const messages = [
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
] 

const model = new Model(messages);
const view = new MessagesView('chat-box-1');
const userList = new UserList(['Dima', 'Zhenya Zh.', 'Zhenya H.', 'Sasha', 'Pasha', 'Masha', 'Kasha'], ['Dima', 'Zhenya', 'Vlad', 'Nastya', 'Kolya']);
const active = new ActiveUsersView('checkmark1');
const persUsView = new PersonalUsersView('users');
const header = new HeaderView('user-name');

function showActiveUsers(){
	active.display(userList.activeUsers);
	persUsView.display(userList.users);
}

function setCurrentUser(user){
    view.user = user;
    model.user = user;
    header.display(user);
    view.display(model.getPage()); 
}

function showMessages(begin = 0, count = 10, obj = {}){
	view.display(model.getPage(begin, count, obj));
}


function addMessage(msg = {}){
    if(model.add(msg)){
    	console.log("2");
   	    view.display(model.getPage());
    }
}

function removeMessage(id){
    if(model.remove(id))
  	   view.display(model.getPage());
}

function editMessage(id, obj = {}){
	if(model.edit(id, obj))
		view.display(model.getPage());
}



setCurrentUser('Tom');
//showMessages(0, 10);
showActiveUsers();
addMessage({text: 'Пока', isPersonal: false});
//removeMessage('4');
//editMessage('8', { text:'Kek'});


