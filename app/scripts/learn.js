'use strict'

class User {
    constructor (name, age){
        this.name = name
        this.age = age
    }
    
    getYear () {
        return 2020 - this.age;
    }
}

const Vasya = new User ('Вася', 24);
const Andre = new User ('Андре', 34);



// user()

function Person(name) {
  this.name = name;
  this.greeting = function() {
    alert('Hi! I\'m ' + this.name + '.');
  };
}
