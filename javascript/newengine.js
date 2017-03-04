$(document).ready(function() { //funcion de jquery, cuando el documento este listo y completamente cargado...
	
	var player1 = new Player1; //nuevo objeto de la funcion player1, en javascript no existen las clases, o si, larga historia.
	var player2 = new Player2;
	var gameboard = new Board; 
	player1.ChangeOfTurn(true); //ejecuta la funcion ChangeOfTurn, del objeto player1, que en esta linea se inicializa como true para que el primer turno sea del jugador 1
	player2.ChangeOfTurn(false); //Al reves
	gameboard.createBoxes(); //Ejecuta la funcion del objeto gameboard, basicamente inicializa el tablero.
	
		
		$('button').click(function(){ //Cuando se le de clic a cualquier elemento "button"
	
		var idbutton = $(this).attr("id") //Recoge el id del boton al que se hizo clic
		var positions = //Arreglo con las posibles posiciones a las que se puede mover la dama en la que se hizo clic, ul = upperleft ur= upperright ll=lowerleft lr=lowerright, se saca por medio del idbutton, que esta marcado por "coordenadas" 
		{
			ul : idbutton - 11, ur : idbutton - 9, ll : parseInt(idbutton) + parseInt(9), lr : parseInt(idbutton) + parseInt(11)
		}
		
		if(gameboard.ReadUnitBoxValue(idbutton) === 0) //Ejecuta la funciona ReadUnit... a la cual hay que pasarle un parametro, que es el id, la funcion retorna el valor que tiene la celda, si es 0 significa que no hay ninguna pieza, este if esta por que antes tenia codigo dentro de el, lo borre... no me acuerdo por que.
		{
		}
		else if (gameboard.ReadUnitBoxValue(idbutton) === 1 && player1.ReturnTurn()) //Igual, pero si el valor de la celda es 1 quiere decir que se dio clic en una dama del jugador 1, se verifica que sea el turno del jugador 1 con player1.ReturnTurn()
		{
		//Si se cliqueo una dama del jugador 1 y es su turno, pinta de amarillo la celda cliqueada.
		$("#"+idbutton).css("background-color", "yellow");
		//Pinta las celdas con los posibles movimientos de rojo, por medio de la funcion GiveBox... del objeto gameboard.
		gameboard.GiveBoxColor(positions["ul"],positions["ur"]);
		//Mueve las piezas por medio de la funcion Move.
		gameboard.Move(positions["ul"],positions["ur"],idbutton)
		//Cambia los turnos, ya se hizo movimiento entonces pasa a ser el turno del jugador 2, este codigo por cuestion de diseño NO DEBERIA ESTAR AQUI. Esta aqui solo para probar.
		player1.ChangeOfTurn(false);
		player2.ChangeOfTurn(true);

		}
		else if(gameboard.ReadUnitBoxValue(idbutton) === 2 && player2.ReturnTurn()) //Exactamente lo mismo que arriba, pero si en lugar de ser cliqueada una dama del jugador 1, se cliquea una dama del jugador 2 entonces se verifica que sea su turno y se hace todo lo demas de la misma manera.
		{
		$("#"+idbutton).css("background-color", "yellow");
		gameboard.GiveBoxColor(positions["ll"],positions["lr"]);
		gameboard.Move(positions["ll"],positions["lr"],idbutton)
		player1.ChangeOfTurn(true);
		player2.ChangeOfTurn(false);

		}
		else
		{
			alert("Es turno del otro jugador.");
		}
	
	});
	
	
	
});


//Inicia declaracion del objeto Board

var Board = (function() {
	function Board() {}
	
	var boxes = []
	//Basicamente este es el tablero en un arreglo, por medio de coordenadas, 11, es columna 1, fila 1, etc. Si la posicion del arreglo es igual a 0 entonces es una celda vacia, si es igual a 2 es una dama del jugador 2 y si es un 1 es una dama del jugador 1.
	//Estos valores (11,12,13,14...) coinciden exactamente con el id de los botones, asi es como se relacionan, un boton con el id 11 se cargara con lo que el arreglo boxes tenga en la posicion 11
	Board.prototype.createBoxes = function() {
		boxes = {
		11 : 0, 12 : 2, 13 : 0, 14 : 2, 15 : 0, 16 : 2, 17 : 0, 18 : 2, 21 : 2, 22 : 0, 23 : 2, 24 : 0, 25 : 2, 26 : 0, 27 : 2, 28 : 0, 31 : 0, 32 : 2, 33 : 0, 34 : 2, 35 : 0, 36 : 2, 37 : 0, 38 : 2, 41 : 0, 42 : 0, 43 : 0, 44 : 0, 45 : 0, 46 : 0, 47 : 0, 48 : 0, 51 : 0, 52 : 0, 53 : 0, 54 : 0, 55 : 0, 56 : 0, 57 : 0, 58 : 0, 61 : 1, 62 : 0, 63 : 1, 64 : 0, 65 : 1, 66 : 0, 67 : 1, 68 : 0, 71 : 0, 72 : 1, 73 : 0, 74 : 1, 75 : 0, 76 : 1, 77 : 0, 78 : 1, 81 : 1, 82 : 0, 83 : 1, 84 : 0, 85 : 1, 86 : 0, 87 : 1, 88 : 0
		}
		Board.loadBoxesValues(); //Carga los valores en las celdas al codigo html, "dibuja" las damas y la posicion en la que deben estar.
	}
	

	Board.loadBoxesValues = function() {
	var zerovalues = []
	for (var values in boxes)
	{
                if(boxes[values] == 0)
                {
                    zerovalues[values] = boxes[values]
                    var mapclass = $("#"+values).attr("class");
                    if(mapclass == "white")
                    {
                        $("#"+values).css("background-color", "white");
                        $("#"+values).css("color", "white");
                        }
                    else if(mapclass == "black")
                    {
                        $("#"+values).css("background-color", "black");
                        $("#"+values).css("color", "black");
                        }
                    
                    }
		else if (boxes[values] == 2)
		{               
			$("#"+values).css("color", "red");
			$("#"+values).html("0")
		}
                else if (boxes[values] == 1) 
		{               
			$("#"+values).css("color", "green");
			$("#"+values).html("0");
		}
	}
	}
	
	Board.prototype.ReadUnitBoxValue = function(key) {
		return boxes[key];
	}
	//pm1 = posible movimiento 1, pm2 = posible movimiento 2, id = id del boton en el que actualmente esta la dama.
	Board.prototype.Move = function(pm1,pm2,id) {
		
	$("#"+pm1).click(function(){
                boxes[id] = 0;
                boxes[pm1] = 1;
                Board.loadBoxesValues();
				return true;
                });
				
	$("#"+pm2).click(function(){
				boxes[id] = 0;
                boxes[pm2] = 1;
                Board.loadBoxesValues();
				return true;
	});
	
	}
	
	Board.prototype.GiveBoxColor = function(pm1,pm2) {
			$("#"+pm1).css("background-color", "red");
			$("#"+pm1).css("color", "red");
			$("#"+pm2).css("background-color", "red");
			$("#"+pm2).css("color", "red");
	}
	
	return Board;
	
})();

//Inicia declaracion del objeto Player1

var Player1 = (function() {
	function Player1() {}
	
	var points = 16;
	var turn;
	//Resta puntos cuando se come una dama del jugador 1, esta funcion aun no se usa.
	Player1.prototype.OnePointLess = function() {
		points = points - 1;
	}
	
	Player1.prototype.ChangeOfTurn = function(t) {
		turn = t;
	}
	
	Player1.prototype.ReturnTurn = function() {
		return turn;
	}
	
	return Player1;
})();

//Inicia declaracion del Objeto Player2

var Player2 = (function() {
	function Player2() {}
	//Puntos del jugador, es igual al numero de damas al iniciar.
	var points = 16;
	var turn;
	
	Player2.prototype.OnePointLess = function() {
		points = points - 1;
	}
	
	Player2.prototype.ChangeOfTurn = function(t) {
		turn = t;
	}
	
	Player2.prototype.ReturnTurn = function() {
		return turn;
	}
	
	return Player2;
})();