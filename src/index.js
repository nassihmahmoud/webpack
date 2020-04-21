// import * as All from './module';
// import Person from './classes';

// let p = new Person();

// // p.setNames = 'rayan nassih';
//  console.log(p.language);


// function sum(x,y,z) {
//     return x+y+z;
// }
// let tab = [1,2,3];
// console.log(sum(...tab));

// console.log(Math.max(...[3,5,6,0,8,19]));

// let tab1 = [1,2,3];
// let tab2 = [...tab1];
// tab2.unshift(0);
// console.log(tab1,tab2);

// let tab1 = ['rayan','jad','elyes'];
// let tab2 = ['fati','mahmoud', ...tab1];
// console.log(tab2);

function argumentsDefault(type , base, ...args) {
    for(let arg of args){
       console.log(arg);
    }
}

argumentsDefault('rayan','jad','elyes',1,2,3);



