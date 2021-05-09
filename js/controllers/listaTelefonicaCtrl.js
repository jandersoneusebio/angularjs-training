angular.module("listaTelefonica").controller("listaTelefonicaCtrl", function($scope, contatosService, operadorasService, serialGenerator){
    $scope.app = "Lista Telefônica";

    $scope.operadoras = [];
    $scope.contatos = [];

    $scope.ordenacao = 'nome';

    // Contatos Functions
    $scope.adicionarContato = function(contato){

        contato.serial = serialGenerator.generate();

        contato.data = new Date();
        contatosService.addContato(contato).then(function(){
            console.log(contato.nome + " adicionado com sucesso");
        }).catch(function(response){
            $messageError = "Não foi possível adicionar o contato. Erro: " + response.status + " " + response.statusText
        });
        delete $scope.contato;
        $scope.contatoForm.$setPristine();
    };

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

    var carregarContatos = function(){
        contatosService.getContatos().then(function(response){
            $scope.contatos = response.data;
        }).catch(function(response){
            $scope.errorMessage = "Não foi possível carregar os contatos. Erro: " + response.status + " " + response.statusText;
        });
    }

    var carregarOperadoras = function(){
        operadorasService.getOperadoras().then(function(response){
            $scope.operadoras = response.data;
        }).catch(function(response){
            $scope.errorMessage = "Não foi possível carregar as operadoras. Erro: " + response.status + " " + response.statusText;
        });
    }

    $scope.ordenarPor = function(ordem){
        $scope.ordenacao = ordem;
        $scope.direcao = !$scope.direcao;
    }
    carregarContatos();
    carregarOperadoras();
});