var app=angular.module('app-module',[]);
app.controller('CtrlIndicadores', function($scope, $http, $timeout){
	$scope.data = {};
	$scope.searching = false;
	$scope.selected = 0;
	$scope.getData = function(){
		$scope.searching = true;

		$http.get('http://mindicador.cl/api')
		.success(function(response){
			filters = ['uf','dolar','euro', 'utm'];
			aData=[];
			$scope.searching = false;
			for (var key in response) {
			    if(typeof response[key] =='object' &&  filters.indexOf(response[key].codigo) > -1){
			    	aData.push(response[key]);
			    }
			}
			$scope.data = aData;
			$scope.msgError = '';
			$scope.msgSuccess = 'Carga OK';
			$timeout(function(){
				$scope.msgSuccess = '';

			}, 2000)

		})
		.error(function(error){
			$scope.searching = false;
			$scope.data = {};
			$scope.msgError = error.message;
			$scope.msgSuccess = '';

		});
	}
	$scope.isLoaded = true;
	$scope.showGrid = false;
	$scope.getData();

	$scope.showDetail = function(indicador, index){
		$http.get('http://mindicador.cl/api/' + indicador.codigo)
		.success(function(response){
			$scope.showGrid = true;
			$scope.selected = index;
			$scope.dataGrid = response.serie;
			$scope.title = response.nombre;

		})
		.error(function(error){
			$scope.showGrid = false;
			$scope.msgError = error.message;
			$scope.dataGrid = '';

		});
	};

});