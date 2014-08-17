/*
  Greetings, algorithmics!  Today, your task is to practice functional programming with some basic exercises.
*/


/* --------------------- */
/* BASIC BUILDING BLOCKS */
/* --------------------- */

var map = function(input, iterator) {
	var result = [];
	for (var i =0;i<input.length;i++) {
		result.push(iterator(input[i],i));
	}
	return result;
};

var filter = function(input, iterator) {
	var result = [];
	for (var i =0;i<input.length;i++) {
		if (iterator(input[i],i)){
			result.push(input[i]);
		}
	}
	return result;
};

var reduce = function(input, iterator, initialValue) {
	for (var i=0;i<input.length;i++) {
		initialValue = iterator(initialValue,input[i]);
	}
	return initialValue;
};

var indexInput = ["you", "are", "me"]

/* ---------------- */
/* APPLIED PROBLEMS */
/* ---------------- */

// Find the sum of the numbers in the input. 
var sumOfArray = function(input) {
	return reduce(input,function(a,b){return a+b;}, 0);
};

// Return only the numbers that are the same as their position in the input.
// That is, [0, 2, 1, 3] returns [0, 3]
var positionMatch = function(input) {
	return filter(input, function(val, i){
		return (val === i);
	})
};

// Given a list of names, find the number of unique first names in the list.
// (hint: string.split(" ") will turn the string into an array.  the first element is the first name.)
var uniqueFirstNames = function(input) {
	return unique(map(input, function(val, i){
		return val.split(" ")[0]
	})).length;

};

// Return only the numbers in the input that are palindromes (i.e. 4884 or 1234321)
var palindromeNumbers = function(input) {
	return filter(input, function(val, i){
		return (String(val) === String(val).split("").reverse().join(""));
	})
};

// Given a list of strings, return an array that indexes the list by length.
// That is, indexByLength(["you", "are", "me"])

var indexByLength = function(input) {

	var temp = new Array((reduce(input, function(partial, next){
		return Math.max(partial,next.length);
	}, 0))+1);

	return map(temp, function(mapVal, mapInd){
		return filter(input, function(filtVal, filtInd){
			return filtVal.length === mapInd;
		});
	});
}
		

// given a list of objects with properties `name` (a string), `age` (a number),
// and `children` (an array), return the names of everyone who is over 65 
// or has at least two children.

var olderOrWithChildren = function(input) {
	return map(filter(input, function(val, i){
		return (val.age > 65 || val.children.length > 1);
	}) , function(val, i){
		return val.name;
	})
};




/* -------------------------- */
/* MORE SPECIALIZED FUNCTIONS */
/* -------------------------- */

// Given an iterator that returns true or false, return true
// if every input element passes the test and false if at least one fails.
var every = function(input, iterator) {
	return reduce(input, function(partial, next){
		return (partial && next);
	}, true)
};

// Given an iterator that returns true or false, return true
// if at least one input element passes the test and false if all of them fail.
var some = function(input, iterator) {
	return reduce(input, function(partial, next){
		return (partial || next);
	})
};

// Returns an array with duplicate elements in the input removed.
function unique(input) {
	return filter(input, function(val, i){
		return (i === input.indexOf(val));
	})
}

// un-nests an array.  that is, flatten([[1, 2], [3], [[4]]])
// becomes [1, 2, 3, [4]] ---- 

var flatten = function(input) {
	return reduce(input, function(a,b){
		if (b instanceof Array){
			return a.concat(flatten(b));
		}
		else return a.concat(b);
	},[]);
};

// returns true if the input contains the target, and false if not.
var contains = function(input, target) {
	return reduce(input, function(partial, next){
		return (partial || next === target);
	}, false)
};






