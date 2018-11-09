

const nums = [1, 3, 5, 6];

const doubleNums = nums.map(num => {
    console.log(num); 
    return num * 2
} ); 


const newNums = nums.map(multiByTwo);
const newNums2 = nums.map(num => multiByTwo(num));


const multiByTwo = num => {
    console.log(num);
    return num * 2
} 

function multiByTwoAlt(num) {
    console.log(num);
    return num * 2
} 

console.log('nums', doubleNums);