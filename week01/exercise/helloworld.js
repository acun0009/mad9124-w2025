const students = require('./students.json');

//function that takes a message to log
function say(message) {
    console.log(message)
}

/* iterates over students array and logs their first and last name
with Array.forEach
*/
students.forEach(({ firstName, lastName }) => say(`Hello ${firstName} ${lastName}`));

// just to separate code
console.log("*************")

/* loops through students array with Array.reduce
if the last name starts with 'D', we add +1 to the
accumulator
*/
const count = students.reduce((accumulator, {lastName}) => {
    if(lastName.startsWith('D')) {
        accumulator += 1;
    }
    return accumulator;
}, 0)

console.log(`Count of last names starting with D is ${count}`)

// just to separate code
console.log("*************")

/* uses Array.map to loop through the students array
and returns the first name + email suffix
*/
const emails = students.map(({ firstName }) => {
    const emailSuffix = "@algonquincollege.com";
    return (firstName.toLowerCase() + emailSuffix);
});

console.log(emails);
