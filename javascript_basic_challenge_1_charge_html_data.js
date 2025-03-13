// Cargar data al HTML:
// El código que deseas agregar al textarea

/*
const shape = {
    out1() {
        return this.name;
    },
    out2() {
        return this.age;
    },
    name: 'Refactorii',
    age: 21,
};

// Llamadas a console.log
console.log(shape.out1()); // Debe imprimir 'Refactorii'
console.log(shape.out2()); // Debe imprimir 21
*/

/*const code = `
function greet(name) {
    console.log(\`Hello, \${name}!\`);
}

// Test cases:
greet('Alice'); // Debe imprimir "Hello, Alice!"
greet('Bob'); // Debe imprimir "Hello, Bob!"
`;*/

const calculator = {
    name: 'Basic Calculator',
    version: 1.0,

    add(a, b) {
        return a + b;
    },

    multiply(a, b) {
        return a * b;
    }
};

// Test cases:
console.log(calculator.add(2, 3)); // Debe imprimir 5
console.log(calculator.multiply(4, 5)); // Debe imprimir 20

document.getElementById('code-editor').value = code;
	
// titulo del challenge:
const title = `Exercise 1: Basic Syntax`;
document.getElementById('h5_title').innerText = title;
	
// Texto a agregar al p challenge
const paragraphText = `To refactor this code, you should modify the methods out1 and out2 to return the values of name and age, respectively. 
This will allow us to retrieve and use these values when calling the methods.`;
document.getElementById('challenge').innerText = paragraphText;
	
var modal_click_message = "To make the function correctly display 0,1,2 instead of 3,3,3, you can use let instead of var to declare the variable i...";

var error_message = `In JavaScript, objects can have methods that access the properties of the same object using the this keyword. However, 
	if the methods are not properly defined, they may not return any value or interact with the properties as intended.
        In the given example, shape is an object with properties name and age, and methods out1 and out2. Currently, these methods only access the 
	properties without returning any value, which makes them incomplete.
	To refactor this code, we should modify the methods out1 and out2 to return the values of name and age, respectively. This will allow us to 
        retrieve and use these values when calling the methods.`;       

var success_message = `🎉 Congratulations! You've successfully completed the challenge! Your determination and skill have paid off. 
        Keep up the great work and continue pushing your boundaries. Onward to new challenges! 🚀`
