let arr2 = [ 7, 1, 5, 3, 6, 4];
let arr3 = [ 1, 2, 3 , 4, 5];
let arr4 = [ 7, 6, 4, 3, 1];
 
function task(arr){
  let benefit = 0;
  
  let tr = false;
  let tr1 = false;
  let t = 0;
  let s = 0;
  let arr1 = [];
  for( let index = 0; index < arr.length; index++)
    arr1[index] = [];

  for( let i = 0; i < arr.length - 1; i++){
      for( let j = i + 1; j < arr.length; j++)
        arr1[i][j] = arr[j] - arr[i];
  }
  let min;
  let max;
  while( (t < (arr.length - 1)) && (s < (arr.length - 1))){
    tr = tr1 = false;
    min = max = 0;
    for (let i = arr.length - 1; i >= t; i--) {
      for (let j = arr.length; j > i; j--) {
        if (arr1[i][j] > 0){
          max = arr1[i][j];
          tr = true;
        }
      }
    }

    if(tr === false)
      s = arr.length;

    for (let i = t; i < arr.length - 1; i++) {
        for (let j = i + 1; j < arr.length; j++) {
          if (arr1[i][j] >= max && arr1[i][j] >= 0){
            max = arr1[i][j];
            s = i + 1;
          }
        }
    } 


    for (let i = arr.length - 1; i >= t; i--) {
      for (let j = arr.length; j > i; j--) {
        if (arr1[i][j] < 0){
          min = arr1[i][j];
          tr1 = true;
        }
      }
    }

    if( tr1 === false)
      t = arr.length;
   
    for (let i = s; i < arr.length - 1; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        if(arr1[i][j] < 0 && min <= arr1[i][j]){
          min = arr1[i][j];
          t = i + 1;
        }
      }
    } 
   
    benefit = benefit + min + max;
    
    if(s >= arr.length - 1 || t >= arr.length - 1)
      benefit -= min;  
  }

return benefit;
}

console.log(task(arr2));
console.log(task(arr3));
console.log(task(arr4));

