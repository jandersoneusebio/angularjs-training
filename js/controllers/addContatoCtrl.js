angular.module("listaTelefonica").controller("addContatoCtrl", function($scope, contatosService, operadoras, serialGenerator, $location){
    $scope.app = "Lista Telefônica";

    $scope.operadoras = operadoras.data

    $scope.adicionarContato = function(contato){

        contato.serial = serialGenerator.generate();

        contatosService.addContato(contato).then(function(){
            console.log(contato.nome + " adicionado com sucesso");
        }).catch(function(response){
            $messageError = "Não foi possível adicionar o contato. Erro: " + response.status + " " + response.statusText
        });
        delete $scope.contato;
        $scope.contatoForm.$setPristine();
        $location.path("/contatos");
    };
});