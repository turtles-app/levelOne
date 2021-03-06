var app = angular.module('homepage', []);
var dragData = {
	type: '',
	name: '',
	index: null
};

var intersectionMode = function(){
	document.getElementById("intersectionPocket").style.visibility = "visible";
	document.getElementById("setPocket").style.visibility = "hidden";
	document.getElementById("factPocket").style.visibility = "hidden";

}

var setMode = function(){
	document.getElementById("setPocket").style.visibility = "visible"
	document.getElementById("factPocket").style.visibility = "hidden";
	document.getElementById("intersectionPocket").style.visibility = "hidden"
}

var factMode = function(){
	document.getElementById("setPocket").style.visibility = "hidden"
	document.getElementById("intersectionPocket").style.visibility = "hidden"
	document.getElementById("factPocket").style.visibility = "visible";
}
var dragoverTable = function(ev){
	if(dragData.type === 'operator' || dragData.name === 'setForm') {
		ev.preventDefault();
	}

};



var dragoverUSet = function(ev){
	console.log("dragging over something");
	if(dragData.type === 'set') {
		ev.preventDefault();
	}
};

var dragoverISet = function(ev){
	if(dragData.type ==='set') {
		ev.preventDefault();
	}
};

var dragoverSetForm = function(ev) {
	if(dragData.type === 'element') {
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
};

var dragSetForm = function(ev) {
	console.log("dragSetForm");
	dragData.type = 'form';
	dragData.name = 'setForm';
	dragData.index = null;
	console.log(dragData);
};

var dragElement = function(ev){

	var index = ev.target.getAttribute('index');
	console.log("DdragElement: " + index);
	dragData.type = 'element';
	dragData.name = null;
	dragData.index = index;
	console.log(dragData);
};

//Comparison function used to sort a group of sets/elements
var sortGroup = function (a, b) {
	return a.groupIndex - b.groupIndex;
};
 
app.controller('lvl1Controller', function($scope){


	this.sets=[]
	this.elements=[];
	this.operations=[];
	this.table=[];
	this.facts=[];
	this.tree=[];
	this.setName='';
	this.elementsGoingIn = [];
	this.selectedSet;


	A= new Set('set','A');
	B= new Set('set', 'B');
	C= new Set('set', 'C');
	x = new Element('x', A);
	y = new Element('y', B);
	z = new Element('z', C);
	p = new Element('p', C);
	q = new Element('q', B);
	
	A.groupIndex = 0;
	B.groupIndex = 1;
	C.groupIndex = 2;
	x.groupIndex = 0;
	y.groupIndex = 1;
	z.groupIndex = 2;

	this.sets.push(A, B, C);
	this.elements.push(x, y, z, p, q);

	this.selectedSet = A;

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
		if(dragData.name === 'intersection'){
			console.log("intersection");

			//Perform the operation iff both set slots are filled
			if (!($scope.lvl1.intersection1.groupName === "intersectionGap" || $scope.lvl1.intersection2.groupName === "intersectionGap")){
				var intersectionRes = intersection($scope.lvl1.intersection1.equivalents[0]+"n"+$scope.lvl1.intersection2.equivalents[0],$scope.lvl1.intersection1, $scope.lvl1.intersection2);

				console.log("IntRes: ");
				console.log(intersectionRes);

				$scope.lvl1.sets.push($scope.lvl1.intersection1);
				$scope.lvl1.sets.push($scope.lvl1.intersection2);
				intersectionRes.groupIndex = $scope.lvl1.sets.length;
				$scope.lvl1.sets.push(intersectionRes);
				$scope.lvl1.intersection1 = $scope.lvl1.intersectionL;
				$scope.lvl1.intersection2 = $scope.lvl1.intersectionR;
			//If one or more slots were empty, reset contents of sets and slots
			} else {
				if ($scope.lvl1.intersection1.groupName != "intersectionGap") {
					$scope.lvl1.sets.push($scope.lvl1.intersection1);
					$scope.lvl1.intersection1 = $scope.lvl1.intersectionL;

				}
				if ($scope.lvl1.intersection2.groupName != "intersectionGap") {
					$scope.lvl1.sets.push($scope.lvl1.intersection2);
					$scope.lvl1.intersection2 = $scope.lvl1.intersectionR;
				}
			}
		}

		else if(dragData.name === 'union'){
			console.log("union");
			//Perform the operation iff both set slots are filled
			if (!($scope.lvl1.union1.groupName === "unionGap" || $scope.lvl1.union2.groupName === "unionGap")) {
				console.log("full slots");
				var unionRes = union($scope.lvl1.union1.equivalents[0]+"U"+$scope.lvl1.union2.equivalents[0], $scope.lvl1.union1, $scope.lvl1.union2);
				console.log("unionRes: " );
				console.log(unionRes);
				$scope.lvl1.sets.push($scope.lvl1.union1);
				$scope.lvl1.sets.push($scope.lvl1.union2);
				unionRes.groupIndex = $scope.lvl1.sets.length;
				$scope.lvl1.sets.push(unionRes);
				$scope.lvl1.union1 = $scope.lvl1.unionL;
				$scope.lvl1.union2 = $scope.lvl1.unionR;

			//If one or more slots were empty, reset contents of sets and slots
			} else {
				if ($scope.lvl1.union1.groupName != "unionGap") {
					$scope.lvl1.sets.push($scope.lvl1.union1);
					$scope.lvl1.union1 = $scope.lvl1.unionL
				}
				if ($scope.lvl1.union2.groupName != "unionGap") {
					$scope.lvl1.sets.push($scope.lvl1.union2);
					$scope.lvl1.union2 = $scope.lvl1.unionR;
				}
			}

		} else if (dragData.name === 'setForm') {
			console.log('setForm');
			var newSet = new Set("set", $scope.lvl1.setName);
			newSet.groupIndex = $scope.lvl1.sets.length;
			newSet.elements = newSet.elements.concat($scope.lvl1.elementsGoingIn);
			$scope.lvl1.elements = $scope.lvl1.elements.concat($scope.lvl1.elementsGoingIn.splice(0, $scope.lvl1.elementsGoingIn.length));
			$scope.lvl1.sets.push(newSet);
			console.log(newSet);
		}		
			$scope.lvl1.sets.sort(sortGroup);	
			$scope.lvl1.setName = '';
			$scope.lvl1.elements.sort(sortGroup);
			$scope.$apply();


			
	};

	this.elementDrop = function(ev) {
		var index = dragData.index;
		console.log("Dropping element: " + index);
		$scope.lvl1.elementsGoingIn.push($scope.lvl1.elements.splice(index, 1)[0]);
		$scope.$apply();
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

	console.log("element.classList: " + element.classList);
	
	// console.log("inside clickedClass");
	// console.log(element.class);
};