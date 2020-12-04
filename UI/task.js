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

class ChatController{
  constructor(){
    this.model = new Model(messages);
    this.view = new MessagesView('chat-box-1');
    this.userList = new UserList(['Dima', 'Zhenya Zh.', 'Zhenya H.', 'Sasha', 'Pasha', 'Masha', 'Kasha'], ['Dima', 'Zhenya', 'Vlad', 'Nastya', 'Kolya']);
    this.active = new ActiveUsersView('checkmark1');
    this.persUsView = new PersonalUsersView('users');
    this.header = new HeaderView('user-name');
  }

  k = 10;

  addMessage(obj = {}, model, view){
    let text = document.getElementById('input').value;
    if(text !== ""){
      
      obj.text = text;
      if(obj.isPersonal === undefined){
        obj.isPersonal = false;
      }
      console.log(obj);
      document.getElementById('input').value = "";
      if(model.add(obj)){
        view.display(model.getPage());
        return true;
      }
    }
    
  }

  addPrivateMessage(model, view){
    let cont = document.getElementById('checkmark1');
    let obj = {};
    cont.addEventListener('click', ({ target: t }) => {
    if (t.className === 'onl-users') {
      console.log(t.textContent);
      obj.isPersonal = true;
      obj.to = t.textContent;
      this.addMessage(obj, model, view);
    }
    });
  }

  filter(begin = 0, count = 10, model, view, obj = {}){
    console.log(document.getElementById('inp-2'));
    if(document.getElementById('inp-2') !== null){
      obj.dateTo = document.getElementById('inp-2').valueAsNumber;
    }
    if(document.getElementById('inp-1') !== null){
      obj.dateFrom = document.getElementById('inp-1').valueAsNumber;
    }
    obj.author = document.getElementById('inp-4').value;
    obj.text = document.getElementById('inp-3').value;
    console.log(obj);
    view.display(model.getPage(begin, count, obj));

  }

  downloadMoreMessages(view, model){
      view.display(model.getPage(0, this.k + 10, {})); 
      this.k+=10;
  }

  save(model1, view){ 
    for(let i = 0; i < 1; i++){
      let messages = localStorage.getItem('messages');
      messages = JSON.parse(messages);
      if(messages === null){
        view.display(model1.getPage());
        break;
      }
      for(let i = 0; i < messages.length; i++){
        messages[i]._createdAt = new Date(messages[i]._createdAt);
      }
      

      for(let i = 0; i < messages.length; i++){
        model1.arrOfMessages[i] = new Message(messages[i]._id, messages[i]._text, messages[i]._author, messages[i]._createdAt, messages[i]._isPersonal, messages[i]._to);
      }
    }


    let auth = localStorage.getItem('author');
    setCurrentUser(auth);
  }

  edit(model){
    let cont = document.getElementById('chat-box-1');
    cont.addEventListener('click', ({ target: t }) => {
    if (t.tagName === 'BUTTON' && t.textContent ==='Edit') {
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
    let cont = document.getElementById('chat-box-1');
    cont.addEventListener('click', ({ target: t }) => {
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

    if(obj1.author !== "" && obj1.author !== undefined){
      arr1 = arr1.filter((item) => item.author.toLowerCase().includes(obj1.author.toLowerCase()));
    }
   
    if(obj1.text !== "" && obj1.text !== undefined){
      arr1 = arr1.filter((item) => item.text.toLowerCase().includes(obj1.text.toLowerCase()));
    }

    if(obj1.dateTo > 0){
      arr1 = arr1.filter((item) => item.createdAt.getTime() < obj1.dateTo);
      console.log(obj1.dateTo);
    }

    if(obj1.dateFrom > 0){
      arr1 = arr1.filter((item) => item.createdAt.getTime() > obj1.dateFrom); 
    }

    arr1 = arr1.filter((item) => (item.author === this.user || item.to === this.user || item._isPersonal === false));

    console.log('arr1');
    console.log(arr1);
    return arr1.sort((prev, next) => next.createdAt - prev.createdAt).slice(begin, begin + count);
   }

    add(messObj){

      let max = Number(this.arrOfMessages[0].id);
      this.arrOfMessages.forEach(function(item){
        if(max < Number(item.id)){
          max = Number(item.id);
        }
      });
      let id = String(+max + 1);
      let createdAt;
      if(messObj.createdAt !== undefined){
        createdAt = messObj.createdAt;
        console.log('grtg');
      }
      else
        createdAt = new Date();
      let author;
      if(messObj.author !== undefined){
        author = messObj.author;
      }else{
        author = this.user;
      }
      let text = messObj.text;
      let isPersonal;
      if(messObj.isPersonal !== undefined){
        isPersonal = messObj.isPersonal;
      }else{
        isPersonal = false;
      }

      let to;

      if(messObj.to !== undefined){
        to = messObj.to;
      }
      
      messObj = new Message(id, text, author, createdAt, isPersonal, to);

      if(this.validate(messObj)){
        this.arrOfMessages.push(messObj); 
        localStorage.setItem('messages', JSON.stringify(this.arrOfMessages)); 
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
      localStorage.removeItem(id);
      this.arrOfMessages.splice(this.arrOfMessages.findIndex((item, index) => item.id === id), 1);
      localStorage.setItem('messages', JSON.stringify(this.arrOfMessages)); 
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

      if(msg.text !== undefined){
        secondMess._text = msg.text;
      }

      if(msg.isPersonal !== undefined){
        secondMess._isPersonal = msg.isPersonal;
      }

      if(msg.to !== undefined){
        secondMess._to = msg.to;
      }

      for( let key in secondMess){
        mess[key]=secondMess[key];
      }

      localStorage.setItem('messages', JSON.stringify(this.arrOfMessages)); 

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
      let div = document.createElement('form');
      div.className='mes';
      div.style.marginLeft = '0.5rem';
      div.style.marginTop = '0.8rem';
      div.style.padding = '0.3rem';
      div.style.width = '21rem';
      let div1 = document.createElement('div');
      let div2 = document.createElement('div');
      let div4 = document.createElement('div');
      let div5 = document.createElement('div');
     
      if(msgs[i]._isPersonal === false){
        div4.textContent = 'to all';
      }
      else if(msgs[i]._isPersonal === true && msgs[i]._to !== undefined){
        div4.textContent = 'to ' + msgs[i].to; 
      }

      let date1 = msgs[i]._createdAt;
      div1.innerHTML = msgs[i]._text;
      div1.className = 'text';
      div5.style.opacity = '0.7';
      div2.innerHTML = msgs[i]._author + ' '+ date1.getHours() + ':' + date1.getMinutes()+' '+ date1.getDate()+'.'+ (date1.getMonth()+1) + '.' + date1.getFullYear() ;
      div2.style.cssText = `font-size: 12px`;
      div4.style.cssText = `font-size: 12px`;
      div4.style.marginLeft = 'auto';
      div5.appendChild(div2);
      div5.appendChild(div4);
      div5.style.display = 'flex';
      div.appendChild(div1);
      div.appendChild(div5);
      
      div.id = msgs[i]._id;
      if(msgs[i]._author === this.user){
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
      else{
        div.style.backgroundColor = '#F7FFE5';
      }
  
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
      div.className = 'onl-users';
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
const cotroller = new ChatController();


function toLogIn1(){
  document.getElementById('message-box').style.display = 'none';
  let login = document.getElementById('login');
  login.style.display = 'block';
  login.style.margin = '0 auto';
  document.getElementById('exit-1').style.display = 'none';
  let hr1 = document.getElementById('mp-1');
  hr1.style.display = 'block';
  hr1.style.width = '10%';
  let hr2 = document.getElementById('mp-2');
  hr2.style.display = 'block';
  hr2.style.width = '10%';
  let butt4 = document.getElementById('butt4');
  butt4.style.background = 'linear-gradient(0deg, #21922D, #F5F191)';
  document.getElementById('in-1').title = 'Enter your name';
  document.getElementById('in-2').title = 'Enter a password';
  setCurrentUser(null);
}

function toMainPage(){
  let input2 = document.getElementById('in-1');
  let input3 = document.getElementById('in-2');
  if(input2.value === ''){
      input2.style.background = '#FFDFDF';
      return;
    }
    if(input3.value === ''){
      input3.style.background = '#FFDFDF';
      return;
    }
    setCurrentUser(input2.value);
    localStorage.setItem('author', input2.value);

    document.getElementById('message-box').style.display = 'flex';
    let login = document.getElementById('login');
    login.style.display = 'none';
    document.getElementById('exit-1').style.display = 'block';
    let hr1 = document.getElementById('mp-1');
    hr1.style.display = 'none';
    let hr2 = document.getElementById('mp-2');
    hr2.style.display = 'none';
    input2.value = '';
    input3.value = '';
    
}

function toMainPage1(){
    document.getElementById('message-box').style.display = 'flex';
    let login = document.getElementById('login');
    login.style.display = 'none';
    let sign = document.getElementById('sign-up');
    sign.style.display = 'none';
    document.getElementById('exit-1').style.display = 'block';
    let hr1 = document.getElementById('mp-1');
    hr1.style.display = 'none';
    let hr2 = document.getElementById('mp-2');
    hr2.style.display = 'none';    
}

function toSignUp(){
  let sign = document.getElementById('sign-up');
  document.getElementById('login').style.display = 'none';
  sign.style.display = 'block';
  sign.style.margin = '0 auto';
  document.getElementById('in-10').title = 'Enter your name';
  document.getElementById('in-11').title = 'Enter a password';
  document.getElementById('in-21').title = 'Repeat your a password';
  let hr1 = document.getElementById('mp-1');
  hr1.style.width = '20%';
  let hr2 = document.getElementById('mp-2');
  hr2.style.display = 'none';
  let butt4 = document.getElementById('butt5');
  butt4.style.background = 'linear-gradient(0deg, #21922D, #F5F191)';
}

function goToChat(){
  let input2 = document.getElementById('in-10');
  let input3 = document.getElementById('in-11');
  let input10 = document.getElementById('in-21');
  if(input2.value === ''){
        input2.style.background = '#FFDFDF';
        return;
      }
      if(input3.value === ''){
        input3.style.background = '#FFDFDF';
        return;
      }
      if(input10.value === ''){
        input10.style.background = '#FFDFDF';
        return;
      }

      if( input3.value !== input10.value){
         input3.style.background = '#FFDFDF';
         input10.style.background = '#FFDFDF';
         return;
      }
  setCurrentUser(input2.value);
  localStorage.setItem('author', input2.value);
  let sign = document.getElementById('sign-up');
  sign.style.display = 'none';
  document.getElementById('message-box').style.display = 'flex';
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
  cotroller.addMessage(msg, model, view);
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


showActiveUsers();
removeMessage();
editMessage();

document.getElementById('login').style.display = 'none';
document.getElementById('mp-1').style.display = 'none';
document.getElementById('mp-2').style.display = 'none';
document.getElementById('sign-up').style.display = 'none';

cotroller.addPrivateMessage(model, view);
cotroller.save(model, view);

//localStorage.clear();