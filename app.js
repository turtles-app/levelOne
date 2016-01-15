var app = angular.module('homepage', []);
 
app.controller('lvl1Controller', function($scope){
	this.sets=[]
	this.elements=[];
	this.operations=[];
	this.table=[];
	this.facts=[];
	this.tree=[];


	A= new Set('set','A');
	B= new Set('set', 'B');
	x = new Element('x', A);
	console.log("test: " + A.equivalents[0]);

	this.sets.push(A);
	this.sets.push(B);
	this.elements.push(x);


});