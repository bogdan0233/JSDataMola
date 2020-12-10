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

let top1 = 10;
let user;
let array;

class ChatApiService{
  constructor(url){
    this.url = url;
  }

  token;
  user;

  getMessages(skip = 0, top = 10) {

    let array; 

    this.token = JSON.parse(localStorage.getItem('token'));
   
    if(this.token !== null)
      this.token = this.token.token;
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${this.token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${this.url}/messages?skip=${skip}&top=${top}`, requestOptions)
      .then(response => response.text())
      .then(result => {
       result = JSON.parse(result);
       const model = new Model(result);
       const view = new MessagesView('chat-box-1');
       for(let i = 0; i < model.arrOfMessages.length; i++){
         model.arrOfMessages[i].createdAt = new Date(model.arrOfMessages[i].createdAt);
       }
       localStorage.setItem('array', JSON.stringify(model.arrOfMessages));
       array = model.arrOfMessages;
       console.log(model.arrOfMessages);
       view.display(model.arrOfMessages);
      })
      .catch(error => {
        console.log('error', error);
        errorWindow();
      });
      
  }


  login(name, pass) {
    console.log(name);
    console.log(pass);
    var formdata = new FormData();
    formdata.append("name", name);
    formdata.append("pass", pass);

    var requestOptions = {
      method: 'POST',
      body:formdata,
      redirect: 'follow'
    };

    fetch(`${this.url}/auth/login`, requestOptions)
      .then(response => response.json())
      .then(result => {
        localStorage.setItem('token', JSON.stringify(result));
        if(result.error !== undefined){
          this.user = undefined;
          localStorage.removeItem('user');
        }else{
          this.user = formdata.get('name');
          localStorage.setItem('user', this.user);
        }
       
      })
      .catch(error => console.log('error', error));

  }

  register(name, pass) {
    var formdata = new FormData();
    formdata.append("name", name);
    formdata.append("pass", pass);

    var requestOptions = {
      method: 'POST',
      body:formdata,
      redirect: 'follow'
    };

    fetch(`${this.url}/auth/register`, requestOptions)
    setTimeout( () =>{
      fetch(`${this.url}/auth/login`, requestOptions)
      .then(response => response.json())
      .then(result => {
        localStorage.setItem('token', JSON.stringify(result));
        if(result.error !== undefined){
          this.user = undefined;
          localStorage.removeItem('user');
        }else{
          this.user = formdata.get('name');
          localStorage.setItem('user', this.user);
          console.log(this.user);
        }
       
        console.log(result);
      })
      .catch(error => console.log('error', error));

    }, 1000);

  }

  logout(){
    this.token = JSON.parse(localStorage.getItem('token'));
   
    if(this.token !== null){
      this.token = this.token.token;
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${this.token}`);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow'
    };

    console.log(this.user);
    console.log(this.token);


    fetch(`${this.url}/auth/logout`, requestOptions)
      .then(response => {
        console.log(response);
      })
      .catch(error => console.log('error', error));
    } 
    
  }

  getUsers(){
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer some.token");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${this.url}/users`, requestOptions)
      .then(response => response.text())
      .then(result => {
        result = JSON.parse(result);
        const userList = new UserList([], []);
        const active = new ActiveUsersView('checkmark1');
        const persUsView = new PersonalUsersView('users');
        
        for(let i = 0; i < result.length; i++){
          if(result[i].isActive === true){
            userList.activeUsers.push(result[i].name);
          }else{
            userList.users.push(result[i].name);
          }
        }
        active.display(userList.activeUsers);
        persUsView.display(userList.users);
        console.log(userList);
        })
        .catch(error => {
        console.log('error', error);
        errorWindow();
      });
  }

  postMessage( mess ){

    this.token = localStorage.getItem('token');
    this.token = JSON.parse(this.token);
    this.token = this.token.token;
    console.log(`Bearer ${this.token}`);

    this.user = localStorage.getItem('author');

    let postMessageHeaders = new Headers();
    postMessageHeaders.append('Authorization', `Bearer ${this.token}`);
    postMessageHeaders.append('Content-Type', 'application/json');
    console.log(mess);
    let raw;
    if( mess.to === undefined){
      raw = `{\n    \"text\": \"${mess.text}\",\n    \"isPersonal\": false}`;
    }
    else{
      raw = `{\n    \"text\": \"${mess.text}\",\n    \"isPersonal\": true,\n    \"to\": \"${mess.to}\"}`;
    }

    var requestOptions = {
      method: 'POST',
      headers: postMessageHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(`${this.url}/messages`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  editMessage(id){
    this.token = localStorage.getItem('token');
    this.token = JSON.parse(this.token);
    this.token = this.token.token;
    console.log(`Bearer ${this.token}`);


    let editMessageHeaders = new Headers();
    editMessageHeaders.append('Authorization', `Bearer ${this.token}`);
    editMessageHeaders.append('Content-Type', 'application/json');

    var raw1 = {
      text: "his",
      isPersonal: false,
    }

    let array = localStorage.getItem('array');
    array = JSON.parse(array);
    let obj = array.find((item) => item.id === id);
    console.log(obj);

    let mess = document.getElementById('input').value;
    let raw;
    if( obj.to === undefined){
      raw = `{\n    \"text\": \"${mess}\",\n    \"isPersonal\": false}`;
    }
    else{
      raw = `{\n    \"text\": \"${mess}\",\n    \"isPersonal\": true,\n    \"to\": \"${obj.to}\"}`;
    }

    var requestOptions = {
      method: 'PUT',
      headers: editMessageHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(`${this.url}/messages/${id}`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  deleteMessage(id){
    this.token = localStorage.getItem('token');
    this.token = JSON.parse(this.token);
    this.token = this.token.token;
    console.log(`Bearer ${this.token}`);


    let editMessageHeaders = new Headers();
    editMessageHeaders.append('Authorization', `Bearer ${this.token}`);
    editMessageHeaders.append('Content-Type', 'application/json');

    var requestOptions = {
      method: 'DELETE',
      headers: editMessageHeaders,
      redirect: 'follow',
    };

    fetch(`${this.url}/messages/${id}`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }
}

class ChatController{
  constructor(){
    this.model = new Model([]);
    this.view = new MessagesView('chat-box-1');
    this.userList = new UserList(['Dima', 'Zhenya Zh.', 'Zhenya H.', 'Sasha', 'Pasha', 'Masha', 'Kasha'], ['Dima', 'Zhenya', 'Vlad', 'Nastya', 'Kolya']);
    this.active = new ActiveUsersView('checkmark1');
    this.persUsView = new PersonalUsersView('users');
    this.header = new HeaderView('user-name');
  }

  addMessage(obj = {}, cAS, view){
    cAS.user = localStorage.getItem('author');
    for(let i = 0; i < 1; i++){
      console.log(cAS.user);
      if(cAS.user === undefined){
        break;
      }
      let text = document.getElementById('input').value;
      if(text !== ""){
        
        obj.text = text;
        if(obj.isPersonal === undefined){
          obj.isPersonal = false;
        }
        console.log(obj);
        document.getElementById('input').value = "";
        cAS.postMessage(obj);
        cAS.getMessages();
          return true;
        }
    }   
  }  

  addPrivateMessage(cAS, view){
    let cont = document.getElementById('checkmark1');
    let obj = {};
    cont.addEventListener('click', ({ target: t }) => {
    if (t.className === 'onl-users' || t.className === 'onl-users-1') {
      obj.isPersonal = true;
      obj.to = t.textContent;
      this.addMessage(obj, cAS, view);
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
    var myHeaders = new Headers();

    myHeaders.append("Authorization", "Bearer some.token");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`https://jslabdb.datamola.com/messages?skip=0&top=10000`, requestOptions)
      .then(response => response.text())
      .then(result => {
       result = JSON.parse(result);
       const model = new Model(result);
       const view = new MessagesView('chat-box-1');
       for(let i = 0; i < model.arrOfMessages.length; i++){
         model.arrOfMessages[i].createdAt = new Date(model.arrOfMessages[i].createdAt);
       }
       view.display(model.getPage(0, 1000, obj));        
      })
  }

  
  downloadMoreMessages(view, model){
      view.display(model.getPage(0, this.k + 10, {})); 
      this.k+=10;
      console.log(this.k);
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
    console.log(auth);
    if(auth !== 0 && auth !== null){
      setCurrentUser(auth);
    }
    
  }

  edit(cAS){
    let cont = document.getElementById('chat-box-1');
    let arr;
    cont.addEventListener('click', ({ target: t }) => {
      console.log()
      if (t.tagName === 'BUTTON' && t.textContent ==='Edit') {
        res.getMessages(0, 1000);
        setTimeout(() => {
          let mess = t.parentNode.parentNode;
          //let toAuth = t.parentNode;
          //console.log(toAuth.previousSibling);
          let id = mess.id;
          arr = localStorage.getItem('array');
          arr = JSON.parse(arr);
          let user = arr.find(item => item.id === id);
          document.getElementById('input').value = user.text;
          let div1 = document.getElementById("send");
          div1.style.display = 'none';
          let userInd = arr.findIndex(item => item.id === id);
          let butt = document.createElement("button");
          butt.style.border = '0';
          butt.style.outline = '0';
          butt.style.fontSize = '17px';
          butt.style.background = 'linear-gradient(0deg, #F7FFC3, #A0FFB0)';
          butt.textContent = 'Ok';
          butt.style.width = '16%';
          document.getElementById("send-box").appendChild(butt);
          butt.addEventListener('click', () => {
            cAS.editMessage(id);
            butt.style.display = 'none';
            div1.style.display = 'block';
            document.getElementById('input').value = "";      
        });
      }, 300);

      setTimeout( () => res.getMessages(0, top1) , 500);
      }
    });
  }

  removeMessage( res ){
    let cont = document.getElementById('chat-box-1');
    let arr;
    cont.addEventListener('click', ({ target: t }) => {
      console.log()
      if (t.tagName === 'BUTTON' && t.textContent ==='Delete') {
        res.getMessages(0, 1000);
        setTimeout(() => {
          let mess = t.parentNode.parentNode;
          let id = mess.id;
          arr = localStorage.getItem('array');
          arr = JSON.parse(arr);
          let user = arr.find(item => item.id === id);
          let userInd = arr.findIndex(item => item.id === id);
          console.log(id);
          res.deleteMessage(id);
        }, 300);
      }
      setTimeout( () => res.getMessages(0, top1) , 700);
      
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
    return arr1.sort((prev, next) => next._createdAt - prev._createdAt).slice(begin, begin + count);
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
      console.log(user);
        this.containerId.style.cssText = `color: #324CA8; font-size: 24px; margin-top: 0.7rem;`;
        if(user !== '0' && user !== 0 && user !== 'null' && user !== null){
        this.containerId.textContent = 'Name account: ' + user;
      }else{
        this.containerId.textContent = 'You are a guest';
        document.querySelector('#exit-1>p>a').textContent = 'Log in';
      }    
        
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
    console.log(msgs);
    this.user = localStorage.getItem('author');

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
     
      if(msgs[i].isPersonal === false){
        div4.textContent = 'to all';
      }
      else if(msgs[i].isPersonal === true && msgs[i].to !== undefined){
        div4.textContent = 'to ' + msgs[i].to; 
      }

      let date1 = msgs[i].createdAt;
      div1.innerHTML = msgs[i].text;
      div1.className = 'text';
      div5.style.opacity = '0.7';
      div2.innerHTML = msgs[i].author + ' '+ date1.getHours() + ':' + date1.getMinutes()+' '+ date1.getDate()+'.'+ (date1.getMonth()+1) + '.' + date1.getFullYear() ;
      div2.style.cssText = `font-size: 12px`;
      div4.style.cssText = `font-size: 12px`;
      div4.style.marginLeft = 'auto';
      div5.appendChild(div2);
      div5.appendChild(div4);
      div5.style.display = 'flex';
      div.appendChild(div1);
      div.appendChild(div5);
      
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
    this.containerId.style.overflowY = 'scroll';
    for(let i = 0; i < arr.length; i++){
      let div = document.createElement('div');
      let div1 = document.createElement('div');
      div1.style.width = '100%';
      div1.style.height = '1.5rem';
      div1.style.overflow = 'hidden';
      div1.innerHTML = arr[i];
      div.id = arr[i];
      div1.id = arr[i]+'1';
      div1.className = 'onl-users-1';
      div.className = 'onl-users';
      div.style.display = 'flex';
      div.style.cssText = `color: #1345C5;`;
      div.style.height = '2rem';
      div.style.paddingLeft = '0.5rem';
      div.appendChild(div1);
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
      if(arr[i].length > 18){
        div.innerHTML = arr[i].slice(0, 18);
      }else{
        div.innerHTML = arr[i];
      }
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
      div.style.overflow = 'hidden';
      div.appendChild(pic);
      this.containerId.appendChild(div);
    }
  }
}

const model = new Model([]);
const view = new MessagesView('chat-box-1');
const active = new ActiveUsersView('checkmark1');
const persUsView = new PersonalUsersView('users');
const header = new HeaderView('user-name');
const cotroller = new ChatController();
let res = new ChatApiService('https://jslabdb.datamola.com');

function toLogIn1(){
  console.log(res.token);
  res.logout();
  localStorage.clear();
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
  setCurrentUser(0);
  let input2 = document.getElementById('in-1');
  let input3 = document.getElementById('in-2');
  input2.value = '';
  input3.value = '';
  document.getElementById('form-of-error').style.display = 'none';
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
      var formdata = new FormData();
      formdata.append("name", input2.value);
      formdata.append("pass", input3.value);

      var requestOptions = {
        method: 'POST',
        body:formdata,
        redirect: 'follow'
      };

      fetch(`https://jslabdb.datamola.com/auth/login`, requestOptions)
        .then(response => response.json())
        .then(result => {
          localStorage.setItem('token', JSON.stringify(result));
          if(result.error !== undefined){
            input3.style.background = '#FFDFDF';
            input3.value = '';
            input3.placeholder = 'Неверный пароль';
          }else{
            localStorage.setItem('author', input2.value);
            console.log(input2.value);
            //setCurrentUser(input2.value);
            res.user = input2.value;
            input3.style.background = 'white';
            input3.placeholder = '';
            document.getElementById('message-box').style.display = 'flex';
            let login = document.getElementById('login');
            login.style.display = 'none';
            setCurrentUser(input2.value);
            document.getElementById('exit-1').style.display = 'block';
            let hr1 = document.getElementById('mp-1');
            hr1.style.display = 'none';
            let hr2 = document.getElementById('mp-2');
            hr2.style.display = 'none';
           
            document.querySelector('#exit-1>p>a').textContent = 'Exit';

            res.getMessages(0, 10);
          }
         
          console.log(result);
        })
        .catch(error => {
          console.log('error', error);

      });
    
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
    res.getMessages(0, 10);   
    localStorage.setItem('author', 0);
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

      if(input3.value.length < 6){
        input3.style.background = '#FFDFDF';
        input3.value = '';
        input3.placeholder = "Не менее 6 символов";
        input10.style.background = '#FFDFDF';
        return;
      }

      if(input10.value === ''){
        input10.style.background = '#FFDFDF';
        return;
      }

      if( input3.value !== input10.value){
         input3.style.background = '#FFDFDF';
         input10.style.background = '#FFDFDF';
         input10.value = '';
         input10.placeholder = "Пароли не совпадают";
         return;
      }
  
  res.register(input2.value, input3.value); 

  console.log(res.token);
  setTimeout(() =>{
  if(res.user !== undefined){   
    setCurrentUser(input2.value);
    localStorage.setItem('author', input2.value);
    let sign = document.getElementById('sign-up');
    sign.style.display = 'none';
    document.getElementById('message-box').style.display = 'flex';
    document.getElementById('mp-1').style.display = 'none';
    document.getElementById('exit-1').style.display = 'block';
    document.querySelector('#exit-1>p>a').textContent = 'Exit';
    input3.value = '';
    input2.value = '';
    input10.value = '';
    input10.style.background = 'white';
    input3.style.background = 'white';
    input2.style.background = 'white';
    res.getMessages(0, 10);
  }else{
      input3.style.background = '#FFDFDF';
      input3.value = '';
    }
 }, 2400);
}

function setCurrentUser(user){
    localStorage.setItem('author', user)
    view.user = user;
    model.user = user;
    header.display(user);
    view.display(model.getPage()); 
}

function errorWindow(){
  document.getElementById('form-of-error').style.display = 'block';
  document.getElementById('message-box').style.display = 'none';
  document.getElementById('exit-1').style.display = 'block';
  document.getElementById('mp-1').style.display = 'none';
  document.getElementById('mp-2').style.display = 'none';
}

function showMessages(begin = 0, count = 10, obj = {}){
  cotroller.filter(begin, count, obj);
}


function addMessage(msg = {}){
  cotroller.addMessage(msg, res, view);
  res.getMessages();
}

function removeMessage(){
  cotroller.removeMessage(res);
  res.getMessages();
}

function editMessage(){
  cotroller.edit(res);
  res.getMessages(0, 10);
}


function downloadMoreMessages(){
  top1 += 10;
  res.getMessages(0, top1);
}

document.getElementById('login').style.display = 'none';
document.getElementById('mp-1').style.display = 'none';
document.getElementById('mp-2').style.display = 'none';
document.getElementById('sign-up').style.display = 'none';

cotroller.addPrivateMessage(res, view);
cotroller.save(model, view);
document.getElementById('form-of-error').style.display = 'none';
setInterval(() => {
 
  res.getMessages(0, top1);
  console.log(top1);
}, 40000);

res.getUsers();

editMessage();
removeMessage();