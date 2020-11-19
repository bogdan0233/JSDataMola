let k = 0;
let firstArgument = 0;
function add(a, b = undefined){
  if(b === undefined){
    if(k % 2 === 0){
      firstArgument = a;
      k++;
      return add;
    }
    if(k % 2===1){
      k = 0;
      let argForSum = firstArgument;
      firstArgument = 0;
      return add(argForSum, a);
    }
    k++;
  }
  return a+b;
}

function sub(a, b = undefined){
  if(b === undefined){
    if(k % 2 === 0){
      firstArgument = a;
      k++;
      return sub;
    }
    if(k % 2===1){
      k = 0;
      let argForSub = firstArgument;
      firstArgument = 0;
      return sub( a, argForSub);
    }
    k++;
  }
  return a-b;
}

function mul(a, b = undefined){
  if(b === undefined){
    if(k % 2 === 0){
      firstArgument = a;
      k++;
      return mul;
    }
    if(k % 2===1){
      k = 0;
      let argForMul = firstArgument;
      firstArgument = 0;
      return mul( a, argForMul);
    }
    k++;
  }
  return a*b;
}

function div(a, b = undefined){
  if(b === undefined){
    if(k % 2 === 0){
      firstArgument = a;
      k++;
      return div;
    }
    if(k % 2===1){
      k = 0;
      let argForDiv = firstArgument;
      firstArgument = 0;
      return div( a, argForDiv);
    }
    k++;
  return a/b;
}
}

//console.log(add(3, 7));

let a = add(1, 2);

let b = mul(a, 10);

let sub1 = sub(1);
let c = sub1(b);
console.log(c);

let d = mul(sub(a,1))(c);

console.log(d);

/*function pipe(...arguments){
  let t;
  let k = 0;
    for(let i = 0; i < args.length; i++){
    if(args[i].callee === add)
      console.log('add');
    if(args[i].name === 'sub')
      console.log('sub');
    if(args[i].name === 'mul')
      console.log('mul');
    if(args[i].name === 'div')
      console.log('div');
    //console.log(args);
  }
  for(let i = 0; i < arguments.length; i++)
    arguments[i];
}

let doSmth = pipe(add(d), sub(c), mul(b), div(a));

console.log(doSmth);*/




