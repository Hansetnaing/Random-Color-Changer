console.log('hi');

// rgb color 
// red green blue 
// highest value = 255 

// Random Number, max = 1 & min = 0 
// console.log(Math.random());

// let ranDom = Math.random();
// console.log(ranDom * 255); // 254
// console.log(Math.floor(ranDom * 255)); //254
// console.log(Math.floor(ranDom * 256)); //255

// For RGB Color 
let r = Math.floor(Math.random() * 256); //random value
    g = Math.floor(Math.random() * 256);
    b = Math.floor(Math.random() * 256);

    console.log(`rgb(${r}, ${g}, ${b})`);

// For Hex Color 
// Decimal ( Base 10 )
// Hexadecimal ( Base 16 ) 0-9 and A-F
                // A - 10, B - 11, C - 12, D - 13, E - 14, F - 15

                // highest rgb = 255 & hex = F 
                // #ffffff == #rrggbb

console.log(255 * 255 * 255); // 16581375
console.log((16581375).toString(16));

function hex(num){
    return "#" + num.toString(16).padStart(6,'0');
}

// console.log(255*255*255); 
// console.log(hex(16581375)); // fd02ff use 255

console.log(256*256*256);
console.log(hex(16777215)); // value = 16777216 and reduce 1 --- ffffff