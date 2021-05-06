angular.module("listaTelefonica").controller("listaTelefonicaCtrl", function($scope, $http){
    $scope.app = "Lista Telefônica";
    $scope.contatos = [];

    $scope.adicionarContato = function(contato){
        contato.data = new Date();
        $http.post("http://localhost:3001/contatos", contato).then(function(response){
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
                $http.delete("http://localhost:3001/contatos/" + contato.id).then(function(response){
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

    $scope.operadoras = [];
    $scope.ordenacao = 'nome';

    $scope.ordenarPor = function(ordem){
        $scope.ordenacao = ordem;
        $scope.direcao = !$scope.direcao;
    }

    var carregarContatos = function(){
        $http.get("http://localhost:3001/contatos").then(function(response, status){
            $scope.contatos = response.data;
        }).catch(function(response, status){
            $scope.errorMessage = "Não foi possível carregar os contatos. Erro: " + response.status + " " + response.statusText;
        });
    }

    var carregarOperadoras = function(){
        $http.get("http://localhost:3001/operadoras").then(function(response, status){
            $scope.operadoras = response.data;
        }).catch(function(response, status){
            $scope.errorMessage = "Não foi possível carregar as operadoras. Erro: " + response.status + " " + response.statusText;
        });
    }
    carregarContatos();
    carregarOperadoras();
});