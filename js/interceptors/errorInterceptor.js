angular.module("listaTelefonica").factory(("errorInterceptor"),function($q, $location){
    return {
        responseError: function(rejection){
            if(rejection.status == 404){
                $location.path("/error");
            }
            if(rejection.status == -1){
                $location.path("/errorBd")
            }   
            return $q.reject(rejection);
        }
    }
});