angular.module("listaTelefonica").controller("listaTelefonicaCtrl", function($scope, contatosService, contatos){
    $scope.app = "Lista Telefônica";

    $scope.contatos = contatos.data;

    $scope.ordenacao = 'nome';

    $scope.apagarContato = function(contatos){
        $scope.contatos = contatos.filter(function(contato){
            if(!contato.selecionado){
                console.log(contato.id)
                return contato;
            } else{
                contatosService.deleteContatos(contato).then(function(response){
                    console.log(contato.nome + " removido com sucesso");
                }).catch(function(response){
                    $messageError = "Não foi possível apagar o contato. Erro: " + response.status + " " + response.statusText
                });
            }
        })
    };

    $scope.isContatoSelecionado = function(contatos){
        return contatos.some(function(contato){
            return contato.selecionado;
        })
    }

    $scope.ordenarPor = function(ordem){
        $scope.ordenacao = ordem;
        $scope.direcao = !$scope.direcao;
    }
});