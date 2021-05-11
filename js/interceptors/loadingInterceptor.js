angular.module("listaTelefonica").factory("loadingInterceptor", function($q, $rootScope, $timeout){
    return {
        request: function(config){
            $rootScope.loading = true;
            return config;
        },
        requestError: function(rejection){
            $rootScope.loading = false;
            return $q.reject(rejection);
        },
        response: function(response){
            /**
             * Added a timeout to show how loading would work on """production"""
             * You can remove $timeout dependency and function if you need without problem,
             * just remember to leave $rootScope (line 18) in the code;
             */
            $timeout(function(){
                $rootScope.loading = false;
            }, 1000)
            return response;
        },
        responseError: function(rejection){
            $rootScope.loading = false;
            return $q.reject(rejection);
        }
    }
})