angular.module("listaTelefonica").controller("detalhesContatoCtrl", function($scope, $routeParams, detalhes){
    
    $scope.contato = detalhes.data;
    console.log($routeParams.id)

});