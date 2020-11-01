let arr2= [-2,1,-3,4,-1,2,1,-5,4];
let arr3 = [-4, -7, -8, -10, -1];
let arr4 = [-7, 8, 9, -1, 2, -5];

function task(arr){
  let arr1=[];
  let max_sum = arr[0];
  let sum = 0;
  let check = true;

  for (let i = 0; i < arr.length; i++) {
    if(arr[i] > 0)
      check = false;
  }

  if(check === false){
    for (let i = 0; i < arr.length; i++) {
      for(let j = 1; j < arr.length; j++){
        sum = 0;
        if(i < j){
          arr1 = arr.slice(i, j);
          for(let k = 0; k < arr1.length; k++){
            sum= sum + arr1[k];
          }
          if(sum > max_sum)
            max_sum = sum;
        }
      }
    }
  }else{
    max_sum = 0;
  }
  return max_sum;
}


console.log(task(arr2));
console.log(task(arr3));
console.log(task(arr4));
