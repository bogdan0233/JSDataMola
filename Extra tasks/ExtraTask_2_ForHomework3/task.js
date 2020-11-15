let arr2 = [ 7, 1, 5, 3, 6, 4];
let arr3 = [ 7, 6, 4, 3, 1];
let arr4 = [ 6, 1, 3, 2, 4, 7];
let arr5 = [ 1, 2, 3, 4, 5];
 
function task(arr){
  let benefit = 0;
  let arr1 = [];
  let tr = false;

  for( let index = 0; index < arr.length; index++)
    arr1[index] = [];

  for(let index = 1; index < arr.length; index++){
    if(arr[index] < arr[index - 1])
      tr = true;
  }

  if(!tr)
    return arr[arr.length - 1] - arr[0];
  
  for(let i = 0; i < arr.length; i++){
    for(let j = 0; j < arr.length - i; j++)
      arr1[i][j] = arr[i+j] - arr[j];
  }

  let max = 0;

  for(let i = 0; i < arr.length; i++){
    max = 0;
    for(let j = 0; j < arr.length - i; j++){
      if(arr1[i][j] > 0)
        max+=arr1[i][j];
    }
    if( benefit < max ) 
      benefit = max; 
  } 
  

  return benefit;
}


console.log(task(arr2));
console.log(task(arr3));
console.log(task(arr4));
console.log(task(arr5));

