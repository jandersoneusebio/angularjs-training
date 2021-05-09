angular.module("listaTelefonica").filter("nameLimit", function(){
    return function(nome, limite){
        if(nome.length >= limite){
            return nome.substring(0,limite) + "...";
        } else{
            return nome;
        }
    }
});