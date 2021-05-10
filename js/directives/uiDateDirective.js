angular.module("listaTelefonica").directive("uiDate", function($filter){
    return {
        require: "ngModel",
        link: function(scope, element, attr, ctrl){
            /*
            /**
             * Por algum motivo desconhecido essa função não identifica o replace (?????),
             * lançando uma exception e quebrando o código
             * For some reason this function doesn't identify the replace method, 
             * throwning an exception and breaking the code.
             
            var _formatDate = function(data){
                var cleanDate = data.replace(/[^0-9]+/g, "");
                if(cleanDate.length > 2){
                    cleanDate = cleanDate.substring(0,2) + "/" + cleanDate.substring(2);
                }
                if(cleanDate.length > 5){
                    cleanDate = cleanDate.substring(0,5) + "/" + cleanDate.substring(5);
                }
                if(cleanDate.length > 10){
                    cleanDate = cleanDate.substring(0,10);
                }
                console.log(cleanDate)
            };
            */

            element.bind("keyup", function(){
                if(ctrl.$viewValue.length == 2){
                    ctrl.$setViewValue(ctrl.$viewValue.substring(0,2) + "/" + ctrl.$viewValue.substring(2));
                }
                if(ctrl.$viewValue.length == 5){
                    ctrl.$setViewValue(ctrl.$viewValue.substring(0,5) + "/" + ctrl.$viewValue.substring(5));
                }
                if(ctrl.$viewValue.length > 10){
                    ctrl.$setViewValue(ctrl.$viewValue.substring(0,10));
                }

                // if(ctrl.$viewValue.length == 3 || ctrl.$viewValue.length == 7){
                //     ctrl.$setViewValue(ctrl.$viewValue + ".");
                //     ctrl.$render();
                // } else if(ctrl.$viewValue.length == 11){
                //     ctrl.$setViewValue(ctrl.$viewValue + "-");
                //     ctrl.$render();
                // }
                // ctrl.$setViewValue(ctrl.$viewValue + "!");
                ctrl.$render();
            });

            ctrl.$parsers.push(function(value){
                if(value.length === 10){
                    var dateArray = value.split("/");
                    return new Date(dateArray[2], dateArray[1]-1, dateArray[0]);
                }
            });

            ctrl.$formatters.push(function(value){
                return $filter("date")(value, "dd/MM/yyyy");
            })
        }
    }
})