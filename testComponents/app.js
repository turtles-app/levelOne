var app 		= angular.module('homepage', []);

///////////////////
// Drag and Drop //
///////////////////
var dragover = function(ev){
	ev.preventDefault();
};

var drag = function(ev){
	ev.dataTransfer.clearData()
	ev.dataTransfer.setData('text', ev.target.id);
	ev.dataTransfer.setData('set', ev.target.classList[0]);
	ev.dataTransfer.setData('index', ev.target.classList[2]);
};

//Comparison function used to sort a group of sets/elements
var sortGroup = function (a, b) {
	return a.groupIndex - b.groupIndex;
};

app.controller("proofController", function($scope){
	this.oldSets	 = [];
	this.elements	 = [];
	this.newSets	 = [];
	this.selectedSets = [];
	this.groupname = 'group';


	var A = new Set(this.groupname, 'A');
	var B = new Set(this.groupname, 'B');
	var C = new Set(this.groupname, 'C');
	var x = new Element('x', A);
	var y = new Element('y', B);
	var z = new Element('z', C);
	
	A.groupIndex = 0;
	B.groupIndex = 1;
	C.groupIndex = 2;
	x.groupIndex = 0;
	y.groupIndex = 1;
	z.groupIndex = 2;

	this.oldSets.push(A);
	this.oldSets.push(B);
	this.oldSets.push(C);

	this.elements.push(x);
	this.elements.push(y);
	this.elements.push(z);
	
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


}); //End of controller

