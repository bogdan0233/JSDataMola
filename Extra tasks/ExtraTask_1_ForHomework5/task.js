let elem = document.querySelector('#elem');

function createCalendar(cal, year, month){
	let date = new Date(year, month, 1);
	let k = 0;
	let t = 0;
	let r = 1;
	while(date.getMonth() === month){
		date.setDate(date.getDate() + 1);
		k++;
	}
	let s = date.getDay() + 7;
	let table = document.createElement('table');
	while(t < k + date.getDay() + 7){
		let tr = document.createElement('tr');
		for( let i = 0; i < 7; i++){
			let td = document.createElement('td');
			td.style.border = '1px solid black';
			switch(t) {
			  case 0:  
			    td.innerHTML = "пн";
			    break;
			  case 1:  
			    td.innerHTML = "вт"
			    break;
			  case 2:  
			    td.innerHTML = "ср";
			    break;
			  case 3:  
			    td.innerHTML = "чт"
			    break;
			  case 4:  
			    td.innerHTML = "пт"
			    break;
			  case 5:  
			    td.innerHTML = "сб";
			    break;
			  case 6:  
			    td.innerHTML = "вс"
			    break;
			  default:
			    break;
			}
			if( t === s && r < k){
				td.innerHTML= r;
				r++;
				s++;
			}
			tr.appendChild(td);
			t++;
		}
		table.style.height = '10rem';
		table.style.width = '12rem';
		table.style.border = '1px solid black';
		table.appendChild(tr);
	}
	cal.appendChild(table);
}

createCalendar(elem, 2012, 6);