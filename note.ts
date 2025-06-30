const queue = "RegExr12";
const regex = /^\w{5}\D*\d{2}$/;

const result = queue.match(regex);
console.log(result);
