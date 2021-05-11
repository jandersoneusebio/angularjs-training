angular.module("listaTelefonica").controller("listaTelefonicaCtrl", function($scope, contatosService, contatos){
    $scope.app = "Lista Telefônica";

    $scope.disable = true;

    $scope.pai = false;

    $scope.contatos = contatos.data;

    var init = function(){
        calcularImpostos($scope.contatos);
    }

    var calcularImpostos = function(contatos){
        contatos.forEach(function(contato){
            contato.operadora.preco = calcularImposto(contato.operadora.preco);
        });
    }

    
    var calcularImposto = function(preco){
        var imposto = 1.5;
        return preco * imposto;
    }

    $scope.ordenacao = 'nome';
    $scope.apagarContato = function(contatos){
        $scope.contatos = contatos.filter(function(contato){
            if(!contato.selecionado){
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

    var checkDisable = function(contatos){
        let selecionados = 0;
        contatos.filter(function(contato){
            if(contato.selecionado){
                selecionados++;
            }
        })
        if(selecionados > 0){
            $scope.disable = true;
        }else{
            $scope.disable = false;
        }
        console.log("selecionados: " + selecionados.length);
    }

    var c = 0;
    $scope.verificarSelecao = function(contatos){
        console.log(c++);
        $scope.hasContatoSelecionado = contatos.some(function(contato){
            checkDisable(contatos);
            return contato.selecionado;
        });
    }

    $scope.ordenarPor = function(ordem){
        $scope.ordenacao = ordem;
        $scope.direcao = !$scope.direcao;
    }

    $scope.reset = function(){
        $scope.contatos = angular.copy($scope.contatos);
    }

    init()
});