angular.module("listaTelefonica").factory("contatosService", function($http, config){
    
    var _getContatos = function(){
        return $http.get(config.baseUrl + "contatos");
    }

    var _getContato = function(id){
        return $http.get(config.baseUrl + "contatos/" + id);
    }

    var _addContato = function(contato){
        return $http.post(config.baseUrl + "contatos", contato);
    }

    var _deleteContatos = function(contato){
        return $http.delete(config.baseUrl + "contatos/" + contato.id);
    }
    
    return {
        getContatos: _getContatos,
        getContato: _getContato,
        addContato: _addContato,
        deleteContatos: _deleteContatos
    }
});