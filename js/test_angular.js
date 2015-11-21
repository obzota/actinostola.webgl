var explorer = angular.module('explorer', []);

explorer.controller('show', ['$scope', function($scope){
	$scope.show = true;
	$scope.scene = Scene;
	$scope.toggle = function () {
		$scope.show = $scope.show === false ? true: false;
	};
}]);

explorer.controller('scene', ['$scope', function($scope){
	$scope.scene = Scene;
	$scope.tree = TreeManager;
}]);