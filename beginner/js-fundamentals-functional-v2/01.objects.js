// ES6 Destructuring

// array destructuring // const
var [first, second] = [true, false];
console.log(first, second);
// => true false


// object destructuring
var {first, second} = {first: 0, second: 1};
console.log(first, second);
// => 0 1


// omit certain values
var [a, , b] = [1, 2, 3];
console.log(a, b);
// => 1 3


// combine with spread/rest operator (accumulates the rest of the values)
var [a, ...b] = [1, 2, 3];
console.log(a, b);
// => 1 [ 2, 3 ]


// swap variables easily without temp
var a = 1, b= 2;
[b, a] = [a, b];
console.log(a, b);
// => 2 1


// advance deep arrays
var [a, [b, [c, d]]] = [1, [2, [[[3, 4], 5], 6]]];
console.log('a: ', a, ' b: ', b, ' c: ', c, ' d: ', d);
// => a:  1  b:  2  c:  [ [ 3, 4 ], 5 ]  d:  6


// === Objects
var {user: x} = {user: 5};
console.log(x);
// => 5


// fail-save
var {user: x} = {user2: 5};
console.log(x);
// => undefined


// more values
var {prop: x, prop2: y} = {prop: 5, prop2: 10};
console.log(x, y);
// => 5 10


// short-hand syntax
var {prop, prop2} = {prop: 5, prop2: 10};
console.log(prop, prop2);
// => 5 10


// Opps: this doesn't work:
// var a, b;
// {a, b} = {a: 1, b: 2};


// But this does work
var a, b;
({a, b} = {a: 1, b: 2});
console.log(a, b);
// => 1 2


// combine objects and arrays
var {prop: x, prop2: [, y]} = {prop: 5, prop2: [10, 100]};
console.log(x, y);
// => 5 100


// === Nested object destructuring
// deep objects
var { 
    prop: x,
    prop2: {
        prop2: {
            nested: [ , , b]
        }
    }
} = { prop: "Hello", prop2: { prop2: { nested: ["a", "b", "c"]}}} ;
console.log(x, b);
// => Hello c


// all well and good, can we do more? Yes!
// using as method parameters
var foo = function({prop: x}) {
    console.log(x);
}

foo({invalid: 1});
foo({prop: 1});
// => undefined
// => 1


// === nested advanced examples

// can also use with the advanced example
var foo = function({
    prop: x,
    prop2: {
        prop2: {
            nested: b
        }
    }
}) {
    console.log(x, ...b);
};
foo({prop: "Hello", prop2: { prop2: { nested: ["a", "b", "c"]}}});
// => Hello a b c


// == In combination with other ES2015 features.
// Computed property names // use const
let name = 'filedName';
let computedObject = { [name]: name }; 
let { [name]: nameValue} = computedObject;
console.log(nameValue);
// => fieldName


// === Rest and defaults
var ajax = function ( { url = "localhost", port: p = 80}, ...data) {
    console.log("Url: ", url, " Port: ", p, " Rest: ", data);
};

ajax({ url: "someHost" }, "additional", "data", "hello");
// => Url: someHost Port: 80 Rest: ['additional', 'data', 'hello'];

ajax( { }, "additional", "data", "hello");
// => Url: localhost Port: 80 Rest: ['additional', 'data', 'hello'];

ajax({});
// => Url: localhost Port: 80 Rest: []

// doesn't work due to trying to destructure undefined
// ajax();

// to fix this we need to have default value for parameter in function
// note: see the `= {}` at the end, saying default empty object
var ajax = ( { url = "localhost", port: p = 80} = {}) => {
    console.log("Url: ", url, " Port: ", p);
};

// now this works
ajax();
// => Url: localhost Port: 80

ajax({ });
// => Url: localhost Port: 80

ajax({ port: 8080 });
// => Url: localhost Port: 8080

ajax({ url: "someHost", port: 8080 });
// => Url: someHost Port: 8080


// === similar to _.pluck
var users = [
    { user: "Name1" },
    { user: "Name2" },
    { user: "Name2" },
    { user: "Name3" },
];
var names = users.map( ({ user }) => user);
console.log(names);
// => ['Name1, 'Name2', 'Name2', 'Name3']


// === usage in for..of loops
var users = [
    { user: "Name1" },
    { user: "Name2", age: 2},
    { user: "Name2" },
    { user: "Name3", age: 4 },
];

for (let { user, age = "DEFAULT AGE"} of users) {
    console.log(user, age);
}
// => Name1 DEFAULT AGE
// => Name2 2
// => Name2 DEFAULT AGE
// => Name3 4