angular.module("listaTelefonica").filter("name", function(){
    return function(input){
        var nome = input.split(" ");
        var nomeFormatado = nome.map(function(nome){
            if(/^(da|de|das|dos)$/.test(nome)){
                return nome;
            } else{
                return nome.charAt(0).toUpperCase() + nome.substring(1).toLowerCase();
            }
        });
        return nomeFormatado.join(" ");
    }
})