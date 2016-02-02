var app = angular.module('homepage', []);
var dragData = {
	type: '',
	name: '',
	index: null
};

var dragoverTable = function(ev){

	if(dragData.type === 'operator') {
		ev.preventDefault();
	}
};


var dragoverUSet = function(ev){
	if(dragData.type === 'set') {
		ev.preventDefault();
	}
};

var dragoverISet = function(ev){
	if(dragData.type ==='set') {
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

var dragIntersection = function(ev) {
	console.log("dragIntersection");
	dragData.type = 'operator';
	dragData.name = 'intersection';
	dragData.index= null;
	console.log(dragData);
}

 
app.controller('lvl1Controller', function($scope){


	this.sets=[]
	this.elements=[];
	this.operations=[];
	this.table=[];
	this.facts=[];
	this.tree=[];


	A= new Set('set','A');
	B= new Set('set', 'B');
	C= new Set('set', 'C');
	x = new Element('x', A);
	console.log("test: " + A.equivalents[0]);

	this.sets.push(A);
	this.sets.push(B);
	this.sets.push(C);
	this.elements.push(x);

    ////////////////////     //Toolbox Methods //     ////////////////////    
this.unionL = new Set('unionGap','Slot_1');     
this.unionR = new Set('unionGap', 'Slot_2');
this.intersectionL = new Set('intersectionGap', 'Slot_A');
this.intersectionR = new Set('intersectionGap', 'Slot_B');

		this.union1 = this.unionL;
		this.union2 = this.unionR;
		this.intersection1 = this.intersectionL;
		this.intersection2 = this.intersectionR;
	//Fires when a draggable element is dropped into #left
	//If dropping a set, remove it from the list of sets,
	//  and display it in #left
	this.unionDrop1 = function (ev) {
		var index = dragData.index;
		console.log("index: " + index);
		var set = $scope.lvl1.sets.splice(index, 1)[0];

		union1 = null;
		union1 = set;
		console.log("union1: "+ union1.equivalents[0]);
		//Return the old Set 1, if there is one
		if ($scope.lvl1.union1.isSet) {
			if ($scope.lvl1.union1.equivalents[0] === "Slot_1") {
					console.log("not replacing text");
					 }
				else {
					console.log("replacing set");
			  		$scope.lvl1.sets.push($scope.lvl1.union1);
				}
			}
		$scope.lvl1.union1 = set;
		$scope.$apply();
		// console.log("Union Set 1: ");
		console.log($scope.lvl1.union1.equivalents[0]);
	};	

	this.intersectionDrop1 = function(ev){
		var index = dragData.index;
		console.log("index: " + index);
		var set = $scope.lvl1.sets.splice(index, 1)[0];
		intersection1 = null;
		intersection1 = set;
		console.log("intersection1: "+ intersection1.equivalents[0]);
		//Return the old Set 1, if there is one
		if ($scope.lvl1.intersection1.isSet) {
			if ($scope.lvl1.intersection1.equivalents[0] === "Slot_A") {
					console.log("not replacing text");
					 }
				else {
					console.log("replacing set");
			  		$scope.lvl1.sets.push($scope.lvl1.intersection1);
				}
			}
		$scope.lvl1.intersection1 = set;
		$scope.$apply();
		// console.log("Union Set 1: ");
		console.log($scope.lvl1.intersection1.equivalents[0]);	
	};

	//Fires when a draggable element is dropped into #right
	//If dropping a set, remove it from the list of sets,
	//  and display it in #right 
	this.unionDrop2 = function (ev) {
		var index = dragData.index;
		var set = $scope.lvl1.sets.splice(index, 1)[0];
		
		union2 = null;
		union2 = set;
		console.log("union2: ");
		console.log(union2);
		//Return the old Set 2, if there is one
		if ($scope.lvl1.union2.equivalents[0] === "Slot_2") {
			console.log("not replacing text");
		}
		else {
		  		$scope.lvl1.sets.push($scope.lvl1.union2);
			}
		
		$scope.lvl1.union2 = set;
		$scope.$apply();
		// console.log("Union Set 2:");
		console.log($scope.lvl1.union2.equivalents[0]);
	};

	this.intersectionDrop2 = function(ev){
		var index = dragData.index;
		console.log("index: " + index);
		var set = $scope.lvl1.sets.splice(index, 1)[0];
		intersection2 = null;
		intersection2 = set;
		console.log("intersection2: "+ intersection2.equivalents[0]);
		//Return the old Set 1, if there is one
		if ($scope.lvl1.intersection2.isSet) {
			if ($scope.lvl1.intersection2.equivalents[0] === "Slot_B") {
					console.log("not replacing text");
					 }
				else {
					console.log("replacing set");
			  		$scope.lvl1.sets.push($scope.lvl1.intersection2);
				}
			}
		$scope.lvl1.intersection2 = set;
		$scope.$apply();
		// console.log("Union Set 1: ");
		console.log($scope.lvl1.intersection2.equivalents[0]);	
	};
	
	this.drop = function(ev){
		var index = dragData.index;
		console.log(dragData);
		
		if(dragData.name === 'intersection'){
			console.log("intersection");
			var intersectionRes = intersection($scope.lvl1.intersection1.equivalents[0]+"n"+$scope.lvl1.intersection2.equivalents[0],$scope.lvl1.intersection1, $scope.lvl1.union2);
			console.log("IntRes: ");
			console.log(intersectionRes);
			$scope.lvl1.sets.push($scope.lvl1.intersection1);
			$scope.lvl1.sets.push($scope.lvl1.intersection2);
			$scope.lvl1.sets.push(intersectionRes);
			$scope.lvl1.intersection1 = $scope.lvl1.intersectionL;
			$scope.lvl1.intersection2 = $scope.lvl1.intersectionR;
			$scope.$apply();
		}

		else if(dragData.name === 'union'){
			console.log("union");
			var unionRes = union($scope.lvl1.union1.equivalents[0]+"U"+$scope.lvl1.union2.equivalents[0], $scope.lvl1.union1, $scope.lvl1.union2);
			console.log("unionRes: " );
			console.log(unionRes);
			$scope.lvl1.sets.push($scope.lvl1.union1);
			$scope.lvl1.sets.push($scope.lvl1.union2);
			$scope.lvl1.sets.push(unionRes);
			$scope.lvl1.union1 = $scope.lvl1.unionL;
			$scope.lvl1.union2 = $scope.lvl1.unionR;
			$scope.$apply();
		}		

		// console.log(unionRes);

			
		};
	




});
///////////////
//CSS METHODS//
///////////////

var clickedClass = function(element,clr){
	// console.log(clr);
	var name = element.id;
	// console.log("name: "+ name);
	var clickedClassName = name + "Clicked";
	var unclickedClassName = name + "UnClicked"
	// console.log( "clickedClassName: " + clickedClassName + "\nunclickedClassName: " + unclickedClassName );
	// console.log(element.classList.contains(unclickedClassName) + "      :::: that was the test");
	if(element.classList.contains(clickedClassName) ){
		if(name==="operations"){

		}
		else{

		// console.log("if");
	// console.log("Element ID: " + element.id + "\nElement class: " +element.classList);
		element.classList.add(unclickedClassName);
		element.classList.remove(clickedClassName);
		}
	}
	else{	
		// console.log("else");
		element.classList.add(clickedClassName);
		element.classList.remove(unclickedClassName);
	}

	console.log("element.classList: " +element.classList);
	
	// console.log("inside clickedClass");
	// console.log(element.class);
};