(function() {

"use strict";

angular
	.module("ngClassifieds")
	.controller("classifiedsCtrl", function($scope, $http, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog){
		var vm = this;

		
		vm.categories;
		vm.classifieds;
		vm.classified;
		vm.closeSideBar = closeSideBar;
		vm.deleteClassified = deleteClassified;
		vm.editClassified = editClassified;
		vm.editing;

		vm.openSideBar = openSideBar;
		vm.saveClassified = saveClassified;
		vm.saveClassified = saveClassified;


		vm.name = {
			first : "Rakshan",
			last : "Suresh"	
		};

		vm.message="Hello World...";

		classifiedsFactory.getClassifieds().then(function(classifieds){
			
			//console.log(classifieds.data)
			vm.classifieds = classifieds.data;
			vm.categories = getCategories(vm.classifieds);				
		});

		function openSideBar() {
			$mdSidenav('left').open();
		}

		function closeSideBar(){
			$mdSidenav('left').close();
		}

		var contact = 	{
      						"name":"John Doe",
      						"phone":"(555) 555-5555",
      						"email":"johndoe@gmail.com"
    					};	

    	

		function saveClassified(classified){
			vm.classified.contact = contact;
			vm.classifieds.push(classified);
			vm.classified = {};	
			vm.closeSideBar();
			showToast("Classified saved!")
		}

		function editClassified(classified){
			vm.editing = true;
			vm.openSideBar();
			vm.classified = classified;

		}

		function saveEdit(){
			vm.editing = false;
			vm.classified = {};	
			vm.closeSideBar();
			showToast("Edit saved!")
			
		}

		function deleteClassified(event, classified){
			var confirm = $mdDialog.confirm()
						.title('Are you sure ?' + classified.title )
						.ok('Yes')
						.cancel('No')
						.targetEvent(event);
						
			$mdDialog.show(confirm).then(function(){
				var index = vm.classifieds.indexOf(classified);
				vm.classifieds.splice(index, 1);
			}, function(){

			});			
						

			
		}

		function showToast(message){
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