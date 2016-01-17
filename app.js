var app = angular.module('homepage', []);

var dragData = {
	type: '',
	name: '',
	index: null
};

var dragoverUSet = function(ev){
	if(dragData.type === 'set') {
		ev.preventDefault();
	}
};

var dragSet = function(ev) {
	dragData.type = 'set';
	dragData.index = ev.target.getAttribute('index');
	dragData.name = '';
	console.log("dragSet: " + dragData.index);
};

var dragUnion = function(ev) {
	console.log("dragUnion");
	dragData.type = 'operator';
	dragData.name = 'union';
	dragData.index = null;
	console.log(dragData);
};

 
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

	////////////////////
	//Toolbox Methods //
	////////////////////


	//Fires when a draggable element is dropped into #left
	//If dropping a set, remove it from the list of sets,
	//  and display it in #left
	this.unionDrop1 = function (ev) {
		var index = dragData.index;
		var set = $scope.lvl1.sets.splice(index, 1)[0];
		//Return the old Set 1, if there is one
		if ($scope.lvl1.union1) {
			if ($scope.lvl1.union1.isSet) {
		  		$scope.lvl1.sets.push($scope.lvl1.union1);
		  		$scope.lvl1.sets.sort(sortGroup);
			}
		}
		$scope.lvl1.union1 = set;
		$scope.$apply();
		console.log("Union Set 1: ");
		console.log($scope.lvl1.union1.equivalents[0]);
	};	

	//Fires when a draggable element is dropped into #right
	//If dropping a set, remove it from the list of sets,
	//  and display it in #right 
	this.unionDrop2 = function (ev) {
		var index = dragData.index;
		var set = $scope.lvl1.sets.splice(index, 1)[0];
		//Return the old Set 2, if there is one
		if ($scope.lvl1.union2) {
			if ($scope.lvl1.union2.isSet) {
		  		$scope.lvl1.sets.push($scope.lvl1.union2);
		  		$scope.lvl1.sets.sort(sortGroup);			
			}
		}
		$scope.lvl1.union2 = set;
		$scope.$apply();
		console.log("Union Set 2:");
		console.log($scope.lvl1.union2.equivalents[0]);
	};



});