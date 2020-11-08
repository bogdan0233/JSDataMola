let arr2= [-2,1,-3,4,-1,2,1,-5,4];
let arr3 = [-4, -7, -8, -10, -1];
let arr4 = [-7, 8, 9, -1, 2];

function task(arr){
  let max_sum = arr[0];

  if(arr.findIndex((item) => item > 0) === -1)
    return 0;

  for (let i = 0; i < arr.length; i++) {
      for(let j = 0; j < arr.length; j++){
        if(i <= j){
          if(arr.slice(i, j+1).reduce((prev, current) => prev + current, 0) > max_sum)
            max_sum = arr.slice(i, j+1).reduce((prev, current) => prev + current, 0);
        }
      }
    }
  
  return max_sum;
}

console.log(task(arr2));
console.log(task(arr3));
console.log(task(arr4));
