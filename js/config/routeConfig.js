angular.module("listaTelefonica").config(function($routeProvider, $locationProvider){
    $locationProvider.hashPrefix('');
    $routeProvider.when("/contatos",{
        templateUrl: "views/contatos.html",
        controller: "listaTelefonicaCtrl",
        resolve: {
            contatos: function(contatosService){
                return contatosService.getContatos();
            }
        }
    });

    $routeProvider.when("/addContato",{
        templateUrl: "views/addContato.html",
        controller: "addContatoCtrl",
        resolve: {
            operadoras: function(operadorasService){
                return operadorasService.getOperadoras();
            }
        }
    });

    $routeProvider.when("/error", {
        templateUrl: "views/error.html"
    })

    $routeProvider.when("/errorBd", {
        templateUrl: "views/errorBd.html"
    })

    $routeProvider.when("/detalhesContato/:id",{
        templateUrl: "views/detalhesContato.html",
        controller: "detalhesContatoCtrl",
        resolve: {
            detalhes: function(contatosService, $route){
                return contatosService.getContato($route.current.params.id);
            }
        }
    })

    $routeProvider.otherwise("/contatos")
});