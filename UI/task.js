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
    return this._to = to;
  }

}

class chatController{
  constructor(model, user, messages, active, personal, header1){
    this.model = model;
    this.userList = user;
    this.messagesView = messages;
    this.activeUsersView = active; 
    this.personalUsersView = personal;
    this.header = header1; 
  }

  addMessage(obj = {}, model, view){
    let text = document.getElementById('input').value;
    if(text !== ""){
      console.log(text);
      obj.text = text;
      obj.isPersonal = false;
      document.getElementById('input').value = "";
      if(model.add(obj)){
        view.display(model.getPage());
        return true;
      }
    }
    
  }

  filter(begin = 0, count = 10, model, view, obj = {}){
    console.log(document.getElementById('inp-2'));
    if(document.getElementById('inp-2') !== null)
      obj.dateTo = document.getElementById('inp-2').valueAsNumber;
    if(document.getElementById('inp-1') !== null)
      obj.dateFrom = document.getElementById('inp-1').valueAsNumber;
    obj.author = document.getElementById('inp-4').value;
    obj.text = document.getElementById('inp-3').value;
    console.log(obj);
    view.display(model.getPage(begin, count, obj));

  }

  
  k = 10;
  downloadMoreMessages(view, model){
      view.display(model.getPage(0, this.k + 10, {})); 
      this.k+=10;
  }

  save(model, view){
       for(let uk = 0; uk < localStorage.length; uk++){
         let key = localStorage.key(uk);
         let mess = localStorage.getItem(key);
         let a = JSON.parse(mess);
         let mess1 = new Message(a.id, a.text, a.author, a.createdAt, a.isPersonal);
         model.add(mess1, model, view);
         view.display(model.getPage());
       }
  }

  edit(model){
    document.addEventListener('click', ({ target: t }) => {
    if (t.tagName === 'BUTTON' && t.textContent ==='Edit') {
    //cotroller.editMessage( t.parentElement.parentElement, view, model);
      let div = t.parentElement.parentElement;
      document.getElementById('input').value = div.childNodes[0].textContent;
      let div1 = document.getElementById("send");
      div1.style.display = 'none';
      let div2 = document.getElementById("send-box");
      let butt = document.createElement("button");
      butt.style.border = '0';
      butt.style.outline = '0';
      butt.style.fontSize = '17px';
      butt.style.background = 'linear-gradient(0deg, #F7FFC3, #A0FFB0)';
      butt.textContent = 'Ok';
      butt.style.width = '16%';
      div2.appendChild(butt);
      butt.addEventListener('click', () => {
        div.childNodes[0].textContent = document.getElementById('input').value;
        butt.style.display = 'none';
        div1.style.display = 'block';
        document.getElementById('input').value = "";
        let t = model.edit(div.id, {text: div.childNodes[0].textContent, isPersonal: false});
        console.log(model.arrOfMessages);
        console.log(t);
        console.log(div.childNodes[0].textContent);
      });
    }
    });
  }

  removeMessage( model, view ){
    document.addEventListener('click', ({ target: t }) => {
    if (t.tagName === 'BUTTON' && t.textContent ==='Delete') {
        let div = t.parentElement.parentElement;
        model.remove(div.id);
        div.remove();
        view.display(model.getPage()); 
      }
      }); 
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

    if(obj1.author !== "" && obj1.author !== undefined)
      arr1 = arr1.filter((item) => item.author.toLowerCase().includes(obj1.author.toLowerCase()));
   
    if(obj1.text !== "" && obj1.text !== undefined)
      arr1 = arr1.filter((item) => item.text.toLowerCase().includes(obj1.text.toLowerCase()));
    console.log(arr1);

    if(obj1.dateTo > 0){
      arr1 = arr1.filter((item) => item.createdAt.getTime() < obj1.dateTo);
      console.log(obj1.dateTo);
    }
    console.log(arr1);

    if(obj1.dateFrom > 0){
      console.log('2');
      arr1 = arr1.filter((item) => item.createdAt.getTime() > obj1.dateFrom); 
    }
    console.log(arr1);
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
      localStorage.setItem(messObj.id, JSON.stringify(messObj));
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
      console.log(mess);
	    let secondMess = {};
	    for(let key in mess)
	      secondMess[key]=mess[key];

	    if(msg.text !== undefined)
	      secondMess._text = msg.text;

	    if(msg.isPersonal !== undefined)
	      secondMess._isPersonal = msg.isPersonal;

	    if(msg.to !== undefined)
	      secondMess._to = msg.to;

      console.log(secondMess);

	
	    for( let key in secondMess)
	      mess[key]=secondMess[key];
	     return true;
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
			div.style.marginLeft = '0.5rem';
			div.style.marginTop = '0.8rem';
			div.style.padding = '0.3rem';
			div.style.width = '21rem';
			let div1 = document.createElement('div');
			let div2 = document.createElement('div');
			let date1 = msgs[i].createdAt;
			div1.innerHTML = msgs[i].text;
      div1.className = 'text';
			div2.innerHTML = msgs[i].author + ' '+ date1.getHours() + ':' + date1.getMinutes()+' '+ date1.getDate()+'.'+ (date1.getMonth()+1) + '.' + date1.getFullYear() ;
			div2.style.cssText = `font-size: 12px`;
      div.appendChild(div1);
      div.appendChild(div2);
      div.id = msgs[i].id;
      if(msgs[i].author === this.user){
        div.style.backgroundColor = '#DAFFBC';
        let div3 = document.createElement('div');
        let buttEdit = document.createElement('button');
        buttEdit.innerHTML = 'Edit';
        buttEdit.style.marginTop = '0.6rem';
        buttEdit.style.border = '0';
        buttEdit.style.backgroundColor = '#A4E5AB';
        buttEdit.style.borderRight = '1px solid #21922D';
        buttEdit.style.borderRadius= '0%';
        buttEdit.style.outline = '0';
        buttEdit.classList.add('edit-butt');
        let deleteEdit = document.createElement('button');
        deleteEdit.innerHTML = 'Delete';
        deleteEdit.style.backgroundColor = '#A4E5AB';
        deleteEdit.style.marginTop = '0.6rem';
        deleteEdit.style.border = '0';
        deleteEdit.style.outline = '0';
        deleteEdit.classList.add('delete-butt');
        div3.appendChild(buttEdit);
        div3.appendChild(deleteEdit);
        div.appendChild(div3);
      }
      else
        div.style.backgroundColor = '#F7FFE5';
			console.log(div);

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
const cotroller = new chatController(model, userList, view, active, persUsView, header);


function toLogIn(){
  let chat = document.getElementById("message-box");
  chat.style.display = 'none';
  let div = document.createElement('div');
  let parent = document.getElementById('main');
  div.style.margin ='0 auto';
  div.id = 'login'; 
  div.style.width = '18rem';
  div.style.height = '16rem';
  div.style.backgroundColor= 'rgb(221, 243, 255, 0.6)';
  div.id = 'main-page';
  let div1 = document.createElement('div');
  let div2 = document.createElement('div');
  let input2 = document.createElement('input');
  div2.innerHTML = 'Login';
  input2.style.marginLeft = '0.3rem';
  input2.style.outline = 'none';
  input2.title = "Enter a login";
  div2.style.paddingLeft = '3rem';
  div2.appendChild(input2);
  div.appendChild(div2);
  let div3 = document.createElement('div');
  let input3 = document.createElement('input');
  div3.innerHTML = 'Password';          
  div3.style.paddingLeft = '1.58rem';
  input3.type = "password";
  input3.title = "Enter a password";
  input3.style.marginLeft = '0.3rem';
  input3.style.outline = 'none';
  div3.appendChild(input3);
  div3.style.marginTop = '2rem';
  let div4 = document.createElement('div');
  let butt4 = document.createElement('button');
  div4.appendChild(butt4);
  div4.style.textAlign = 'center';
  div4.style.marginTop = '2rem';
  butt4.textContent = 'Enter';
  div4.style.height = '2rem';
  butt4.style.height = '100%';
  butt4.style.width = '6rem';
  butt4.style.border = '0';

  butt4.style.outline = '0';
  butt4.style.fontSize = '17px';
  butt4.style.background = 'linear-gradient(0deg, #F7FFC3, #A0FFB0)';
  div1.style.width = '100%';
  div1.style.height = '3rem';
  div1.textContent = 'Log in to your account';
  div1.style.textAlign = 'center';
  div1.style.paddingTop = '2.5rem';
  div1.style.fontSize = '24px';
  div1.style.fontFamily = 'Arial';
  div.appendChild(div1);
  div.appendChild(div2);
  div.appendChild(div3);
  div.appendChild(div4);
  console.log(parent);
  parent.appendChild(div);
  let div5 = document.createElement('div');
  div5.id = 'sign-up';
  let header = document.getElementById('header');
  let href = document.createElement('a');
  let div6 = document.getElementsByClassName('exit');
  div6[0].style.width = '10%';
  href.style.fontFamily = 'Arial';
  div5.style.paddingTop = '0.7rem';
  div5.style.textAlign = 'center';
  div5.style.fontSize = '24px';
  href.href = '#';
  href.id = 'href-1';
  href.textContent = 'Sign up';
  div5.appendChild(href);
  div5.style.width = '10%';
  div5.style.height = '100%';
  header.appendChild(div5);
  let a = document.querySelector('.exit > p > a');
  a.textContent = 'Main page';
  butt4.addEventListener('click', () => {
    butt4.style.background = 'linear-gradient(0deg, #21922D, #F5F191)';
    div.style.display = 'none';
    let chat = document.getElementById("message-box");
    chat.style.display = 'flex';
  });  
  a.addEventListener('click', () => {
    if(a.textContent === 'Main page'){
      let main = document.getElementById('main-page');
      main.remove();
      let main1 = document.getElementById('main-page');
      main1.style.display = 'none';
      div5.remove();
      let main2 = document.getElementById('sign-up');
      main2.remove();
      let chat = document.getElementById("message-box");
      chat.style.display = 'flex';
      a.textContent = 'Exit';
      let main3 = document.getElementById('main-page-1');
      main3.remove();
      let main4 = document.getElementById('main-page-1');
      main4.remove();
      //console.log(a);
      let main5 = document.getElementById('main-page-1');
      main5.style.display = 'none';
  }else toLogIn();
});
  href.addEventListener('click', toSignUp);
}

function toSignUp(){
    let chat = document.getElementById("main-page");
    chat.style.display = 'none';
    let div = document.createElement('div');
    let parent = document.getElementById('main');
    div.style.margin ='0 auto';
    div.id = 'sign-up-1'; 
    div.style.width = '22rem';
    div.style.height = '18rem';
    div.style.backgroundColor= 'rgb(221, 243, 255, 0.6)';
    div.id = 'main-page-1';
    let div1 = document.createElement('div');
    let div2 = document.createElement('div');
    let input2 = document.createElement('input');
    div2.innerHTML = 'Login';
    let div10 = document.createElement('div');
    div10.style.paddingLeft = '1.8rem'; 
    let input10 = document.createElement('input');
    input10.style.marginLeft = '0.3rem';
    input10.title = "Repeat your password";
    div10.style.marginTop = '1.5rem';
    div10.innerHTML = 'Repeat a password';
    div10.appendChild(input10);
    input2.style.marginLeft = '0.3rem';
    input2.style.outline = 'none';
    input2.title = "Enter a login";
    div2.style.paddingLeft = '7rem';
    div2.appendChild(input2);
    div.appendChild(div2);
    let div3 = document.createElement('div');
    let input3 = document.createElement('input');
    div3.innerHTML = 'Password';          
    div3.style.paddingLeft = '5.5rem';
    input3.type = "password";
    input3.title = "Enter a password";
    input3.style.marginLeft = '0.3rem';
    input3.style.outline = 'none';
    div3.appendChild(input3);
    div3.style.marginTop = '1.5rem';
    let div4 = document.createElement('div');
    let butt4 = document.createElement('button');
    div4.appendChild(butt4);
    div4.style.textAlign = 'center';
    div4.style.marginTop = '2rem';
    butt4.textContent = 'Ok';
    div4.style.height = '2rem';
    butt4.style.height = '100%';
    butt4.style.width = '6rem';
    butt4.style.border = '0';

    butt4.style.outline = '0';
    butt4.style.fontSize = '17px';
    butt4.style.background = 'linear-gradient(0deg, #F7FFC3, #A0FFB0)';
    div1.style.width = '100%';
    div1.style.height = '3rem';
    div1.textContent = 'Sign up';
    div1.style.textAlign = 'center';
    div1.style.paddingTop = '2.5rem';
    div1.style.fontSize = '24px';
    div1.style.fontFamily = 'Arial';
    div.appendChild(div1);
    div.appendChild(div2);
    div.appendChild(div3);
    div.appendChild(div10);
    div.appendChild(div4);
    console.log(parent);
    parent.appendChild(div);
    let a = document.querySelector('.exit > p > a');
    
    document.getElementById('sign-up').remove();

}

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
	cotroller.filter(begin, count, model, view, obj);
}


function addMessage(msg = {}){
  if(cotroller.addMessage(msg, model, view));
    
    //console.log(model.arrOfMessages);
}

function removeMessage(){
  cotroller.removeMessage(model, view);
}

function editMessage(){
  cotroller.edit(model);
}

function downloadMoreMessages(){
  cotroller.downloadMoreMessages(view, model);
}


//localStorage.clear();
setCurrentUser('Tom');
//showMessages(0, 10);
showActiveUsers();
//addMessage({text: 'Пока', isPersonal: false});
removeMessage();
editMessage();
cotroller.save(model, view);
