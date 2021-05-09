angular.module("listaTelefonica").directive("uiAlert", function(){
    return {
        templateUrl: "views/alert.html",
        restrict: "AE",
        scope: {
            title: "@"
           // content: "="
        },
        transclude: true
    }
});