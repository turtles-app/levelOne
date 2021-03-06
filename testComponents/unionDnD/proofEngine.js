//Function that verifies if an element is in a given atmoic set (A set represented by its own name, not the result of an operation of other sets), 
//based on an array of facts,each of which is a 3 element array like ['x', 'isAnElementOf', 'A']
//Returns true if element is verifiably in the set, and false otherwise
var inAtomic = function(eName, setName, facts) {
	var res = false;
	facts.forEach(function(fact, index, list) {
		if (fact[0] === eName && fact[1] === 'isAnElementOf' && fact[2] === setName) {
			res = true; //Only return true if one of the facts is that element is a member of set
		}
	});
	return res;
};




//Function that verifies if an element is in any set based on
//an array of facts. Element obj's are defined above, and facts are explained in the above comment.

//The Syntax argument is a 3-element array, where the first and third elements are syntactic representations
//of sets; either a string (set's name), or another syntax array. The second element is a string representing the operation.
//Syntax arrays represent the set that results from an operation sets. A U (B n C) = ['A', 'U', ['B', 'n', C]]
var contains = function(eName, syntax, facts) {
	var inFirst  = false;
	var inSecond = false;

	//Is element in the first set?
	switch (typeof(syntax[0])) {
		case 'string':
			inFirst = inAtomic(eName, syntax[0], facts);
			break;
		case 'object':
			inFirst = contains(eName, syntax[0], facts);
			break;
	}

	//Is element in the second set?
	switch (typeof(syntax[2])) {
		case 'string':
			inSecond = inAtomic(eName, syntax[2], facts);
			break;
		case 'object':
			inSecond = contains(eName, syntax[2], facts);
			break;
	}

	//Return true or false, based on inFirst, inSecond, and the set operator (syntax[1])
	switch (syntax[1]) {
		case 'U': //Definition of Union operator
			return inFirst || inSecond;
			break;
		case 'n': //Definition of Intersect operator
			return inFirst && inSecond;
			break;
		case '/': //Definition of Set Difference operator
			return inFirst && (!inSecond);
	}

};



// module.exports =  {
// 	inAtomic: inAtomic,
// 	contains: contains
// }