angular
.module('ngClassifieds', ['ngMaterial', 'ui.router'])
.config(function($mdThemingProvider, $stateProvider ){

	$mdThemingProvider.theme('default')
	.primaryPalette('teal')
	.accentPalette('orange'); 

	$stateProvider
	.state('classifieds', {
		url:'/classifieds',
		templateUrl:'components/classifieds/classifieds.tpl.html',
		controller:'classifiedsCtrl as vm'
	})
	.state('stateone', {
		url:'/stateone',
		template: '<h1> State One </h>'
	})
	.state('statetwo', {
		url:'/statetwo',
		template: '<h1> State Two </h>'
	});

	})
	
.directive("helloWorld", function(){
	return{
		template: "<h1>{{ message }}</h1>"
	}

	

} );
