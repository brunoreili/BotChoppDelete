var app = angular.module("botapp",['ngRoute']);

//Módulo de Rotas
    app.config(function($routeProvider){
        $routeProvider
            .when('/cadastro', {
                templateUrl: 'cadastro.html',
                controller: 'botctrl'
            })
            .when('/listar', {
                templateUrl: 'listar.html', 
            })
            .otherwise({
                templateUrl: 'home.html'
            });
    });

app.controller("botctrl", function($scope, $http){
    
    //TESTE   
    $scope.enviar = function(texto){
        $scope.enviando=true;
              
        var update = {};
        update.message = {};
        update.message.from = {};
        update.message.from.id = 1;
        update.message.text = texto;
        
        
        $http.post("https://projeto-lab-chopp.herokuapp.com/update", update)
            .then(function(result){
                console.log('result');
                console.log(result);
                $scope.enviando=false;
                $scope.mensagem="Enviado!";
                $scope.resposta = result;
                console.log(result);
            },function(erro){
                console.log('erroo');
                console.log(erro);
                $scope.enviando=false;
                $scope.mensagem="Erro no Envio!";
                console.log(erro);
            });
        console.log("foi!");
    }
     
    //CRUD ITENS
    $scope.itens = [];
    $scope.categorias = [
        {nome: "Espetinho", tipo: "Alimentos"},
        {nome: "Porção", tipo: "Alimentos"},
        {nome: "Cerveja", tipo: "Bebidas"},
        {nome: "Drink", tipo: "Bebidas"},
        {nome: "Não Alcoólico", tipo: "Bebidas"}
    ];
    
    $scope.adcionarItem = function (item) {
        delete $scope.item;
        $scope.enviando=true;
        console.log("savandoooo");
        console.log(item);                    
        
        if(item.categoria.nome === "Espetinho"){
            console.log("Agora foi no espetinho né?");
            $http.post("http://localhost:8080/salvaEspetinho", item)
            .then(function(){
                console.log("foieee");
                $scope.enviando=false;
                $scope.mensagem="Espetinho cadastrado com sucesso!";
            }, function(){
                console.log("erro");
                $scope.enviando=false;
                $scope.mensagem="Erro no cadastro!";
            });
        }
        if(item.categoria.nome === "Porção"){
            console.log("Porção agora?");
            $http.post("http://localhost:8080/salvaPorcao", item)
            .then(function(){
                console.log("foieee");
                $scope.enviando=false;
                $scope.mensagem="Porção cadastrada com sucesso!";
            }, function(){
                console.log("erro");
                $scope.enviando=false;
                $scope.mensagem="Erro no cadastro!";
            });
        }
        if(item.categoria.nome === "Cerveja"){
            console.log("Escolheu a cerveja, miseráve!");
            $http.post("https://projeto-lab-chopp.herokuapp.com/salvaCerveja", item)
            .then(function(){
                console.log("foieee");
                $scope.enviando=false;
                $scope.mensagem="Cerveja cadastrada com sucesso!";
            }, function(){
                console.log("erro");
                $scope.enviando=false;
                $scope.mensagem="Erro no cadastro!";
            });
        }
        if(item.categoria.nome === "Drink"){
            console.log("Escolheu drink, miseráve!");
            $http.post("https://projeto-lab-chopp.herokuapp.com/salvaDrink", item)
            .then(function(){
                console.log("foieee");
                $scope.enviando=false;
                $scope.mensagem="Drink cadastrada com sucesso!";
            }, function(){
                console.log("erro");
                $scope.enviando=false;
                $scope.mensagem="Erro no cadastro!";
            });
        }
        if(item.categoria.nome === "Não Alcoólico"){
            console.log("Escolheu Não Alcoolico é, arregou?");
            $http.post("https://projeto-lab-chopp.herokuapp.com/salvaNaoAlcool", item)
            .then(function(){
                console.log("foieee");
                $scope.enviando=false;
                $scope.mensagem="Bebida não alcoólica cadastrada com sucesso!";
            }, function(){
                console.log("erro");
                $scope.enviando=false;
                $scope.mensagem="Erro no cadastro!";
            });
        }  
    
    }    
    $scope.listarItem = function(item){
        $scope.buscando = true;
        console.log("buscandooOOOoo");        
        if(item.categoria.nome === "Espetinho"){
            $http.get("https://projeto-lab-chopp.herokuapp.com/listaEspetinhos")
                .then(function(item){
                    $scope.buscando=false;
                    console.log(item);
                    $scope.itens = item.data;
                },function(erro){
                    $scope.buscando=false;
                    console.log(erro);
                });
        }
        if(item.categoria.nome === "Porção"){
            $http.get("https://projeto-lab-chopp.herokuapp.com/listaPorcao")
                .then(function(item){
                    $scope.buscando=false;
                    console.log(item);
                    $scope.itens = item.data;
                },function(erro){
                    $scope.buscando=false;
                    console.log(erro);
                });
        }
        if(item.categoria.nome === "Cerveja"){
            $http.get("https://projeto-lab-chopp.herokuapp.com/listaCervejas")
                .then(function(item){
                    $scope.buscando=false;
                    console.log(item);
                    $scope.itens = item.data;
                },function(erro){
                    $scope.buscando=false;
                    console.log(erro);
                });
        }
        if(item.categoria.nome === "Drink"){
            $http.get("https://projeto-lab-chopp.herokuapp.com/listaDrinks")
                .then(function(item){
                    $scope.buscando=false;
                    console.log(item);
                    $scope.itens = item.data;
                },function(erro){
                    $scope.buscando=false;
                    console.log(erro);
                });
        }
        if(item.categoria.nome === "Não Alcoólico"){
            $http.get("https://projeto-lab-chopp.herokuapp.com/listaNaoAlcools")
                .then(function(item){
                    $scope.buscando=false;
                    console.log(item);
                    $scope.itens = item.data;
                },function(erro){
                    $scope.buscando=false;
                    console.log(erro);
                },function(erro){
                    $scope.buscando=false;
                    console.log(erro);
                });
        }

    }
    $scope.deletarItem = function(i, item){
        $scope.enviando = true;
        console.log("Deletandoooo");
        console.log(i);
               
        if(item.categoria.nome === "Espetinho"){       
            $http.delete("https://projeto-lab-chopp.herokuapp.com/deletarEspetinho/" + i.id )
                .then(function(){
                    console.log("Deletou");
                    $scope.enviando=false;
                    $scope.mensagem="Deletou!";
                },function(){
                    console.log("Erro");
                    $scope.enviando=false;
                    $scope.mensagem="Não deletou!";
                });
        }
        if(item.categoria.nome === "Porção"){
            $http.delete("https://projeto-lab-chopp.herokuapp.com/deletarPorcao/" + i.id )
                .then(function(){
                    console.log("Deletou");
                    $scope.enviando=false;
                    $scope.mensagem="Deletou!";
                },function(){
                    console.log("Erro");
                    $scope.enviando=false;
                    $scope.mensagem="Não deletou!";
                });
        }
        if(item.categoria.nome === "Cerveja"){       
            $http.delete("https://projeto-lab-chopp.herokuapp.com/deletaCerveja/" + i.id )
                .then(function(){
                    console.log("Deletou");
                    $scope.enviando=false;
                    $scope.mensagem="Deletou!";
                },function(){
                    console.log("Erro");
                    $scope.enviando=false;
                    $scope.mensagem="Não deletou!";
                });
        }
        if(item.categoria.nome === "Drink"){       
            $http.delete("https://projeto-lab-chopp.herokuapp.com/eletaDrink/" + i.id )
                .then(function(){
                    console.log("Deletou");
                    $scope.enviando=false;
                    $scope.mensagem="Deletou!";
                },function(){
                    console.log("Erro");
                    $scope.enviando=false;
                    $scope.mensagem="Não deletou!";
                });
        }
        if(item.categoria.nome === "Não Alcoólico"){       
            $http.delete("https://projeto-lab-chopp.herokuapp.com/deletaNaoAlcool/" + i.id )
                .then(function(){
                    console.log("Deletou");
                    $scope.enviando=false;
                    $scope.mensagem="Deletou!";
                },function(){
                    console.log("Erro");
                    $scope.enviando=false;
                    $scope.mensagem="Não deletou!";
                });
        }
        
    }
    
        
    $scope.alterarItem = function (item, id) {
    $scope.enviando=true;
    console.log("savandoooo");
    console.log("O QUE TEM?")
    console.log(item)
    console.log(id); 
    console.log("TEVE ID?")
        
        $http.put("https://projeto-lab-chopp.herokuapp.com/salvaEspetinho/" + item.id, item)
            console.log("novoItem")
            console.log(item)
            console.log(id)
            console.log("ID????")
            .then(function(){
            console.log("foieee");
            $scope.enviando=false;
            $scope.mensagem="Espetinho alterado!";
        }, function(){
            console.log("erro");
            $scope.enviando=false;
            $scope.mensagem="Erro no cadastro!";
        });
    }
    
    
    
    //RELATÓRIOS
    $scope.clientes = [];    
    $scope.relatorios = [
        {modelo: "Consumo Médio de Clientes"},
        {modelo: "Avaliação dos Clientes"},
        {modelo: "Itens pedidos"}
    ];
      
    $scope.gerarRelatorios = function(cliente){
        $scope.buscando = true;
        console.log("latório");
        $scope.tabelas1 = [];
        $scope.tabelas2 = [];
        
        if(cliente.relatorio.modelo === "Consumo Médio de Clientes"){
            console.log("FOI!!!, CONSUMO MÉDIO");
            $scope.nome = "Nome";
            $scope.propriedade = "Consumo Médio R$";
            
            $http.get("https://projeto-lab-chopp.herokuapp.com/clientes")
                .then(function(cliente){
                    console.log('Vaaaai!');
                    $scope.buscando=false;
                    $scope.clientes = cliente.data;  
                    console.log(cliente);
                    
                    for(i = 0; i < cliente.data.length; i++){
                       $scope.tabelas1.push(cliente.data[i].first_name);
                       $scope.tabelas2.push(cliente.data[i].consumoMedio);
                    }
                    console.log(cliente.data);
                    console.log($scope.tabelas1);
                    console.log($scope.tabelas2);                                   
                
                },function(erro){
                    $scope.buscando=false;
                    console.log(erro);
                });
        }
        if(cliente.relatorio.modelo === "Avaliação dos Clientes"){
            console.log("FOI!!!, AVALIAÇÃO")
            $scope.nome = "Nome";
            $scope.propriedade = "Nota da Avaliação";

            $http.get("https://projeto-lab-chopp.herokuapp.com/clientes")
                .then(function(cliente){
                    console.log('Vaaaai!');
                    $scope.buscando=false;
                    $scope.clientes = cliente.data;  
                    console.log(cliente);

                    for(i = 0; i < cliente.data.length; i++){
                       $scope.tabelas1.push(cliente.data[i].first_name);
                       $scope.tabelas2.push(cliente.data[i].avaliacao);
                    }
                    console.log(cliente.data);
                    console.log($scope.tabelas1);
                    console.log($scope.tabelas2);                  
                    
                },function(erro){
                    $scope.buscando=false;
                    console.log(erro);
                });
        }
        if(cliente.relatorio.modelo === "Itens pedidos"){
            console.log("FOI!!!, MAIS PEDIDOS")
            $scope.nome = "Item";
            $scope.propriedade = "Quantidade";
            
            $http.get("https://projeto-lab-chopp.herokuapp.com/pedidos")
                .then(function(item){
                    console.log('Vaaaai!');
                    $scope.buscando=false;
                    $scope.clientes = item.data;  
                    console.log(item);
                    
                    for(i = 0; i < item.data.length; i++){
                       $scope.tabelas1.push(item.data[i].nome);
                       $scope.tabelas2.push(item.data[i].quantidade);
                    }
                    console.log(item.data);
                    console.log($scope.tabelas1);
                    console.log($scope.tabelas2);
                    
                },function(erro){
                    $scope.buscando=false;
                    console.log(erro);
                });
        }
    }
    
});