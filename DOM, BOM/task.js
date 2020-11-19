class Model{
	constructor(arrOfMessages){
    this.arrOfMessages = arrOfMessages;
  	}

  	user= 'Bogdan';

  	validate(msg){
    if(msg.id!== undefined && (typeof msg.id === 'string') && msg.text!== undefined  && (typeof msg.text === 'string') && msg.text.length < 200 && msg.createdAt!== undefined && (typeof msg.createdAt === 'object') && msg.author!== undefined && (typeof msg.author === 'string') && msg.isPersonal !== undefined && (typeof msg.isPersonal === 'boolean')){
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

    arr1 = arr1.filter((item) => (item.author === this._user || item.to === this.user || item.isPersonal === false));

    return arr1.sort((prev, next) => prev.createdAt - next.createdAt).slice(begin, begin + count);
   }

   add(msg){
   	let max = Number(this.arrOfMessages[0].id);
    this.arrOfMessages.forEach(function(item){
      if(max < Number(item.id))
        max = Number(item.id);
    });
    msg.id = String(+max + 1);
    msg.createdAt = new Date();
    msg.author = this.user;

    if(this.validate(msg)){
    	this.arrOfMessages.push(msg);
    	return true;
    }
    else return false;
    
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

	user = 'Bogdan';
    
	display(msgs, user = null){
		let obj = document.getElementsByClassName('mes');
		let arr = [...obj];
		for(let i = 0; i < arr.length; i++)
			this.list.removeChild(arr[i]);//чистим наше окно с сообщениями, чтобы заполнить его новыми
		for(let i = 0; i < msgs.length; i++){
			let div = document.createElement('div');
			div.className='mes';
			if(msgs[i].author === this.user)
				div.style.backgroundColor = '#DAFFBC';
			else
				div.style.backgroundColor = '#F7FFE5';
			div.style.marginLeft = '0.5rem';
			div.style.marginTop = '0.8rem';
			div.style.padding = '0.3rem';
			div.style.marginRight = '25rem';
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
		this.containerId.style.overflow = 'hidden';
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
  {
     id: '1',
     text: 'Привет!',
     createdAt: new Date('2020-10-04T23:34:00'),
     author: 'Иванов Иван',
     isPersonal: false
  },
  {
     id: '2',
     text: 'Как дела?',
     createdAt: new Date('2020-11-22T12:46:00'),
     author: 'Pavel',
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
     createdAt: new Date('2015-06-14T14:12:00'),
     author: 'Bogdan',
     isPersonal: false
  },
  {
     id: '5',
     text: 'Ничего особоенного',
     createdAt: new Date('2004-12-19T14:46:00'),
     author: 'Федор Вереницкий',
     isPersonal: true,
     to: 'Петров Петр'
  },
  {
     id: '6',
     text: 'А я дома убираюсь',
     createdAt: new Date('2000-03-01T13:51:00'),
     author: 'Петров Петр',
     isPersonal: false
  },
  {
     id: '7',
     text: 'Какие планы на завтра?',
     createdAt: new Date('2014-10-12T11:12:00'),
     author: 'Иванов Иван',
     isPersonal: true,
     to: 'Bogdan'

  },
  {
     id: '8',
     text: 'Йоу',
     createdAt: new Date('2018-10-12T11:56:00'),
     author: 'Bogdan',
     isPersonal: false     
  }
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
    model.user = user;
    header.display(user); 
}

function showMessages(begin = 0, count = 10, obj = {}){
	view.display(model.getPage(begin, count, obj));
}


function addMessage(msg = {}){
    if(model.add(msg))
   	    view.display(model.getPage());
}

function removeMessage(id){
    if(model.remove(id))
  	   view.display(model.getPage());
}

function editMessage(id, obj = {}){
	if(model.edit(id, obj))
		view.display(model.getPage());
}

obj = {
	text: 'Пока',
	isPersonal: false     
}

showMessages(0, 10);
showActiveUsers();
addMessage(obj);
removeMessage('4');
editMessage('8', { text:'Kek'});
setCurrentUser('Yana');

