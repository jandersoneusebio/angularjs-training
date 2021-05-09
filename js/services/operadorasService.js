angular.module("listaTelefonica").service("operadorasService", function($http, config){
    this.getOperadoras = function(){
        return $http.get(config.baseUrl + "operadoras");
    }
});