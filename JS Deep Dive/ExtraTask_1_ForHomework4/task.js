class Node{
  next = null;
  value = 0;
}

class List{
  root = null;
  length = 0;
  constructor( value ){
    let node = new Node;
    node.value = value;
    this.root = node;
  }

  addNode(value, i = -1){
    if(this.length < i)
      return false;
    let node = this.root;
    if(i === -1)
      i = this.length;
    let k = 0;
    while(k!==i){
      node = node.next;
      k++;
    }
    let endNode = new Node;
    if(node.next!==undefined)
      endNode.next = node.next;
    node.next = endNode;
    endNode.value = value;
    this.length++;
    return true;
  }

  removeNode( i ){
    if(this.length < i)
      return false;
    let node = this.root;
    let k = 0;
    if(this.length < i || i === -1)
      i = this.length;
    while(k !== i - 1){
      node = node.next;
      k++;
    }
    let node1 = node.next;
    node.next = node.next.next;
    delete node1.value;
    delete node1.next;
    return true;
  }
  print(){
    let node = this.root;
    console.log(node.value);
    while(node.next){
      node = node.next; 
      console.log(node.value); 
    }
  }
}

let list = new List(1);
list.addNode(2);
list.addNode(3);
list.addNode(4);
list.addNode(5);
list.addNode(6);
list.addNode(7);
list.addNode(8);
list.addNode(9);
list.addNode(10, 3);
list.addNode(11, 100);
list.addNode(12);

list.removeNode(2);
list.removeNode(7);
list.print();