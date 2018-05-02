(function() {

"use strict";

angular
	.module("ngClassifieds")
	.controller("classifiedsCtrl", function($scope, $http, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog){
		
		$scope.name = {
			first : "Rakshan",
			last : "Suresh"	
		};

		$scope.message="Hello World...";

		classifiedsFactory.getClassifieds().then(function(classifieds){
			
			//console.log(classifieds.data)
			$scope.classifieds = classifieds.data;
			$scope.categories = getCategories($scope.classifieds);				
		});

		$scope.openSideBar=function() {
			$mdSidenav('left').open();
		}

		$scope.closeSideBar =function(){
			$mdSidenav('left').close();
		}

		var contact = 	{
      						"name":"John Doe",
      						"phone":"(555) 555-5555",
      						"email":"johndoe@gmail.com"
    					};	

    	

		$scope.saveClassified=function(classified){
			console.log('calling save');
			$scope.classified.contact = contact;
			$scope.classifieds.push(classified);
			$scope.classified = {};	
			$scope.closeSideBar();
			showToast("Classified saved!");
		}

		$scope.editClassified=function(classified){
			$scope.editing = true;
			$scope.openSideBar();
			$scope.classified = classified;

		}

		$scope.saveEdit=function(){
			$scope.editing = false;
			$scope.classified = {};	
			$scope.closeSideBar();
			showToast("Edit saved!");
			
		}

		$scope.deleteClassified=function(event, classified){
			var confirm = $mdDialog.confirm()
						.title('Are you sure you want to delete ' + classified.title +' ?')
						.ok('Yes')
						.cancel('No')
						.targetEvent(event);
						
			$mdDialog.show(confirm).then(function(){
				var index = $scope.classifieds.indexOf(classified);
				$scope.classifieds.splice(index, 1);
				showToast("Classified Deleted!");	
			}, function(){

			});			
						
			
			
		}

		function showToast(message){
			console.log('calling the toast with message : '+message);
			$mdToast.show(
				 $mdToast.simple()
				 .content(message)
				 .position('top, right')
				 .hideDelay(2000)
			 	);
		}

		function getCategories(classifieds){
			var categories=[];
			
			angular.forEach(classifieds, function(item){
				angular.forEach(item.categories, function (category){
					categories.push(category);
				});
			});
			return _.uniq(categories);

		}
		
	});

})();