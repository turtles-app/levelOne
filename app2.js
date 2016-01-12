var app 	= angular.module('homepage', []);

var dragData = {
	type: '',
	name: '',
	index: null
};

///////////////////
// Drag and Drop //
///////////////////
var dragoverMap = function(ev){
	if(dragData.type === 'operator') {
		ev.preventDefault();
	}
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

var drag = function(ev){
	ev.dataTransfer.clearData()
	ev.dataTransfer.setData('text', ev.target.id);
	ev.dataTransfer.setData('set', ev.target.classList[0]);
	ev.dataTransfer.setData('index', ev.target.classList[2]);
};

var assert = function(){
	document.getElementById("playgroundWrapper").className = "playgroundWrapperOutOfFocus";
	// document.getElementById("toolBoxWrapper").className = "toolBoxWrapperLarge";
	document.getElementById("miniMap").className = "miniMapLarge";
	// document.getElementById("character").className = "hidden";
};

var navigate = function(){
	document.getElementById("playgroundWrapper").className = "playgroundWrapperInFocus";
	document.getElementById("toolBoxWrapper").className = "toolBoxWrapperSmall";
	document.getElementById("miniMap").className = "miniMapSmall";
	document.getElementById("character").className = "";
};

//Comparison function used to sort a group of sets/elements
var sortGroup = function (a, b) {
	return a.groupIndex - b.groupIndex;
};

//outline for dynamic map generation - using HTML table elements - the bane of my vanilla existance
/*
if the groupName of the set is 'union' then 
	1) make the <td> containing the element rowspan='2'
	2) add another <td> element with the first part of the union
	3) add another <tr> <td> </td> </tr> under the existing row, containing the second part of the union

if the groupName of the set is 'set' then
	1) make the colspan='n' of the <td> element where n is the number of minimap colums before a union function is called on the
*/


app.controller("proofController", function($scope){
	this.oldSets	 = [];
	this.elements	 = [];
	this.newSets	 = [];
	this.selectedSets = [];
	this.groupname = 'set';
  	this.union1 = null; //first set in union operator
  	this.union2 = null; //second set in union operator	

	var A = new Set(this.groupname, 'A');
	var B = new Set(this.groupname, 'B');
	var C = new Set(this.groupname, 'C');
	var x = new Element('x', A);
	var BUC = union('BUC', B, C);
	var A_BUC = union('AU(BUC)', A, BUC);
	
	A_BUC.groupIndex = 0;
	A.groupIndex = 1;
	BUC.groupIndex = 2;
	B.groupIndex = 3;
	C.groupIndex = 4;
	x.groupIndex = 0;

	this.oldSets.push(A_BUC);
	this.oldSets.push(A);
	this.oldSets.push(BUC);
	this.oldSets.push(B);
	this.oldSets.push(C);
	this.elements.push(x);

	console.log($scope.pC.oldSets[0]);

	console.log($scope.pC.oldSets[1]);

	
	//Returns a set to its group (from arr)
	this.toGroup = function(arr, index) {
		//If returning a set, put it in its group, then sort
		if (arr[index].isSet) {
			switch (arr[index].groupName) {
				case 'group':
					//Move the set from arr to oldSets
					$scope.pC.oldSets.push(arr.splice(index, 1)[0]);
					$scope.pC.oldSets.sort(sortGroup);
					break;
				default:			
					//move the set from arr to newSets
					$scope.pC.newSets.push(arr.splice(index, 1)[0]);
					$scope.pC.newSets.sort(sortGroup);
					break;
			}
		//If returning an element, put it in elements, then sort
		} else {
			$scope.pC.elements.push(arr.splice(index, 1)[0]);
			$scope.pC.elements.sort(sortGroup);
		}
	};

	this.drop = function(ev){
		data.num++;
		console.log(num);
		if ($scope.pC.selectedSets.length < 2) {		
			ev.preventDefault();
			var data = ev.dataTransfer.getData('text');
			var set = ev.dataTransfer.getData('set');
			var index = ev.dataTransfer.getData('index');

			if(set=="oldSets"){
				$scope.pC.selectedSets.push($scope.pC.oldSets.splice(index, 1)[0]);
				$scope.$apply();
			}
			else if (set=="elements"){
				$scope.pC.selectedSets.push($scope.pC.elements.splice(index, 1)[0]);
				$scope.$apply();
			}
			else {
				$scope.pC.selectedSets.push($scope.pC.newSets.splice(index, 1)[0]);
				$scope.$apply();
			}
		} else { //If selectedSets is full
			alert("You can only operate on two sets at a time!");
		}
		
	};

	//Create new set with union operator
	//and place it in newSets
	this.unioncall = function(){
		var unionset = union($scope.pC.selectedSets[0].equivalents[0]+'U'+$scope.pC.selectedSets[1].equivalents[0],$scope.pC.selectedSets[0],$scope.pC.selectedSets[1]);
		$scope.pC.toGroup($scope.pC.selectedSets, 0);
		$scope.pC.toGroup($scope.pC.selectedSets, 0);			
		unionset.groupIndex = $scope.pC.newSets.length;
		$scope.pC.newSets.push(unionset);
		$scope.$apply();
		console.log("new set:");
		console.log($scope.pC.newSets[$scope.pC.newSets.length - 1]);
	};

	this.putIncall = function(){
		//Set is the first selected object
		if($scope.pC.selectedSets[0].isSet){
			$scope.pC.selectedSets[0].putIn($scope.pC.selectedSets[1]);
			if($scope.pC.selectedSets[0].groupName === 'group') {
				console.log("changed set:" +$scope.pC.selectedSets[0].equivalents[0]);
				console.log($scope.pC.selectedSets[0]);
				$scope.pC.toGroup($scope.pC.selectedSets, 0);
			} else {
				console.log("changed set:");
				console.log($scope.pC.selectedSets[0]);
				$scope.pC.toGroup($scope.pC.selectedSets, 0);
			}
				$scope.pC.toGroup($scope.pC.selectedSets, 0);
		}

		//Set is the second selected object
		else{
			$scope.pC.selectedSets[1].putIn($scope.pC.selectedSets[0]);
			console.log("changed set:");
			console.log($scope.pC.selectedSets[1]);
			$scope.pC.toGroup($scope.pC.selectedSets, 1);
			$scope.pC.toGroup($scope.pC.selectedSets, 0);
		}
		$scope.$apply();
	};


	var miniMapAdd = function(){
		console.log("we are in the function");
		var set = oldSets[2].equivalents[0];
		console.log(set);
		// if(set.groupName == 'union'){
		// 	document.getElementById(set.equivalents[0]).colspan = 2;
		// 	document.getElementById(set.equivalents[0]).innerHTML += "<td>"+set.equivalents[1][0]+"</td>";
		// 	document.getElementById(set.equivalents[0]).innerHTML += "<tr><td>"+set.equivalents[1][2]+"</td></tr>"
		// }

	}

	////////////////////
	//Toolbox Methods //
	////////////////////


	//Fires when a draggable element is dropped into #left
	//If dropping a set, remove it from the list of sets,
	//  and display it in #left
	this.unionDrop1 = function (ev) {
		var index = dragData.index;
		var set = $scope.pC.oldSets.splice(index, 1)[0];
		//Return the old Set 1, if there is one
		if ($scope.pC.union1) {
			if ($scope.pC.union1.isSet) {
		  		$scope.pC.oldSets.push($scope.pC.union1);
		  		$scope.pC.oldSets.sort(sortGroup);
			}
		}
		$scope.pC.union1 = set;
		$scope.$apply();
		console.log("Union Set 1: ");
		console.log($scope.pC.union1.equivalents[0]);
	};	

	//Fires when a draggable element is dropped into #right
	//If dropping a set, remove it from the list of sets,
	//  and display it in #right 
	this.unionDrop2 = function (ev) {
		var index = dragData.index;
		var set = $scope.pC.oldSets.splice(index, 1)[0];
		//Return the old Set 2, if there is one
		if ($scope.pC.union2) {
			if ($scope.pC.union2.isSet) {
		  		$scope.pC.oldSets.push($scope.pC.union2);
		  		$scope.pC.oldSets.sort(sortGroup);			
			}
		}
		$scope.pC.union2 = set;
		$scope.$apply();
		console.log("Union Set 2:");
		console.log($scope.pC.union2.equivalents[0]);
	};

	//Fires when union operator is dropped into #active
	//If operator is full, sends alert, and returns sets to their
	//  place in the list  
	this.activeDrop = function (ev) {
		console.log("activeDrop with following dragData");
		console.log(dragData);
	  	var dropType = dragData.type;
	    if ($scope.pC.union1 && $scope.pC.union2) {
	      	ev.preventDefault();
	    	var str = $scope.pC.union1.equivalents[0]+ "U" + $scope.pC.union2.equivalents[0];
	    	console.log(str);
	        var res = union(str, $scope.pC.union1, $scope.pC.union2);
	        $scope.pC.oldSets.push(res);
	        $scope.pC.oldSets.push($scope.pC.union1, $scope.pC.union2);
	        $scope.pC.oldSets.sort(sortGroup);
	        $scope.pC.union1 = null;
	        $scope.pC.union2 = null;
	        $scope.$apply();
	    }
	      
	  };  	
}); //End of controller

