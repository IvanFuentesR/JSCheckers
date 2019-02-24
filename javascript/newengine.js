$(document).ready(function() {

	var player1 = new Player1;
	var player2 = new Player2;
	var gameboard = new Board;
	var lastid = [];
	var idbutton;
	var ismoving = 0;
	var postoeatUR;
	var postoeatUL;
	var postoeatLR;
	var postoeatLL;
	player1.ChangeOfTurn(true);
	player2.ChangeOfTurn(false);
	gameboard.createBoxes();

		$('button').click(function() {
		lastid.push(idbutton);
		idbutton = $(this).attr("id");

		if(ismoving == 0) {


			if(gameboard.ReadUnitBoxValue(idbutton) === 0) {

				$(".msgconsole").append("Casilla vacia, continua moviendo.");

			}

			else if(gameboard.ReadUnitBoxValue(idbutton) === 1 && player1.ReturnTurn()) {

				$(".msgconsole").append("Casilla con dama, a mover!");
				$("#"+idbutton).css("background-color", "yellow");
				var ppositions = {
					ul : idbutton - 11, ur : idbutton - 9
				}
				$(".msgconsole").append(gameboard.ReadUnitBoxValue(ppositions["ul"]) + " " + gameboard.ReadUnitBoxValue(ppositions["ur"]))

				if(gameboard.ReadUnitBoxValue(ppositions["ul"]) == 0) {

					gameboard.GiveBoxColor(ppositions["ul"]);
					ismoving = 1;
				}


				if(gameboard.ReadUnitBoxValue(ppositions["ur"]) == 0) {
					gameboard.GiveBoxColor(ppositions["ur"]);
					ismoving = 1;
				}
				//Movimientos para comer
				if(gameboard.ReadUnitBoxValue(ppositions["ur"]) == 2) {
					$(".msgconsole").append("Dama enemiga en UR");
					posmvtoeat = ppositions["ur"] - 9;
					if(gameboard.ReadUnitBoxValue(posmvtoeat) == 0)
					{
						gameboard.GiveBoxColor(posmvtoeat);
						ismoving = 1;
					}
				}

				if(gameboard.ReadUnitBoxValue(ppositions["ul"]) == 2) {
					$(".msgconsole").append("Dama enemiga en UL");
					posmvtoeat = ppositions["ul"] - 11;
					if(gameboard.ReadUnitBoxValue(posmvtoeat) == 0)
					{
						gameboard.GiveBoxColor(posmvtoeat);
						ismoving = 1;
					}
				}



			}

			else if(gameboard.ReadUnitBoxValue(idbutton) === 2 && player2.ReturnTurn()) {
				$(".msgconsole").append("Casilla con dama, a mover!");
				$("#"+idbutton).css("background-color", "yellow");

				var ppositions = {
					ll : parseInt(idbutton) + parseInt(9), lr : parseInt(idbutton) + parseInt(11)
				}
				$(".msgconsole").append(gameboard.ReadUnitBoxValue(ppositions["ll"]) + " " + gameboard.ReadUnitBoxValue(ppositions["lr"]))
				if(gameboard.ReadUnitBoxValue(ppositions["ll"]) == 0) {

					gameboard.GiveBoxColor(ppositions["ll"]);
					ismoving = 1;
				}

				if(gameboard.ReadUnitBoxValue(ppositions["lr"]) == 0) {
					gameboard.GiveBoxColor(ppositions["lr"]);
					ismoving = 1;
				}
				//Movimientos para comer
				if(gameboard.ReadUnitBoxValue(ppositions["lr"]) == 1) {
					$(".msgconsole").append("Dama enemiga en LR");
					posmvtoeat = parseInt(ppositions["lr"]) + parseInt(11);
					if(gameboard.ReadUnitBoxValue(posmvtoeat) == 0)
					{
						gameboard.GiveBoxColor(posmvtoeat);
						ismoving = 1;
					}
				}

				if(gameboard.ReadUnitBoxValue(ppositions["ll"]) == 1) {
					$(".msgconsole").append("Dama enemiga en LL");
					posmvtoeat = parseInt(ppositions["ll"]) + parseInt(9);
					if(gameboard.ReadUnitBoxValue(posmvtoeat) == 0)
					{
						gameboard.GiveBoxColor(posmvtoeat);
						ismoving = 1;
					}
				}

				if( gameboard.ReadUnitBoxValue(ppositions["ll"]) != 0 && gameboard.ReadUnitBoxValue(ppositions["lr"]) != 0)
				{
					$(".msgconsole").append("No hay movimientos validos.");
				}



			}

		}

		else
		{
			$(".msgconsole").append("<p>A mover</p>");
			if(gameboard.ReadUnitBoxValue(idbutton) != 0)
			{
				$(".msgconsole").append("Cliqueaste una casilla con dama, no se puede realizar el movimiento.");
			}

			else {

				indexLID = lastid.length - 1
				$(".msgconsole").append(lastid[indexLID]);

				var positions = {
					ul : lastid[indexLID] - 11, ur : lastid[indexLID] - 9, ll : parseInt(lastid[indexLID]) + parseInt(9), lr : parseInt(lastid[indexLID]) + parseInt(11)
					}

					$(".msgconsole").append("Turno del jugador 1: " + player1.ReturnTurn());
					$(".msgconsole").append("Turno del jugador 2: " + player2.ReturnTurn());
					if(player1.ReturnTurn()) {

					if(gameboard.ReadUnitBoxValue(positions["ur"]) == 2) {
						$(".msgconsole").append("DAMA ENEMIGA EN UR!")
						$(".msgconsole").append(gameboard.ReadUnitBoxValue(positions["ur"] - 9))
						if(gameboard.ReadUnitBoxValue(positions["ur"] - 9) == 0) {
							$(".msgconsole").append("POSIBILIDAD DE COMER EN UR!")
							  postoeatUR = positions["ur"] - 9;
						}
					}

					if(gameboard.ReadUnitBoxValue(positions["ul"]) == 2) {
						$(".msgconsole").append("DAMA ENEMIGA EN UL!");
						$(".msgconsole").append(gameboard.ReadUnitBoxValue(positions["ul"] - 11))
						if(gameboard.ReadUnitBoxValue(positions["ul"] - 11) == 0)
						{
							$(".msgconsole").append("POSIBILIDAD DE COMER EN UL!")
							postoeatUL = positions["ul"] - 11;

						}
					}

					$(".msgconsole").append("Posicion para comer: " +   postoeatUR);
					$(".msgconsole").append("Posicion para comer: " + postoeatUL);

					$(".msgconsole").append("Turno correcto.");

					$(".msgconsole").append(idbutton + " " + positions["ul"] + " " + positions["ur"]);

					if(idbutton == positions["ul"]) {

					$(".msgconsole").append("Movimiento valido.");
					gameboard.Move(idbutton,lastid[indexLID],1)
					player1.ChangeOfTurn(false);
					player2.ChangeOfTurn(true);
					ismoving = 0;

					}

					else if(idbutton == positions["ur"]) {
						$(".msgconsole").append("Movimiento valido.");
						gameboard.Move(idbutton,lastid[indexLID],1)
						player1.ChangeOfTurn(false);
						player2.ChangeOfTurn(true);
						ismoving = 0;
					}

					else if(idbutton == postoeatUR) {
						$(".msgconsole").append("Movimiento para COMER!");
						gameboard.Eat(idbutton,lastid[indexLID],positions["ur"],1)
						player2.OnePointLess();
						player1.ChangeOfTurn(false);
						player2.ChangeOfTurn(true);
						ismoving = 0;
						if(player2.ReturnPoints() == 0)
						{
							alert("El jugador 1 ha ganado!");
						}
						$(".msgconsole").append(player2.ReturnPoints());

					}

					else if(idbutton == postoeatUL) {
						$(".msgconsole").append("Movimiento para COMER!");
						gameboard.Eat(idbutton,lastid[indexLID],positions["ul"],1)
						player2.OnePointLess();
						player1.ChangeOfTurn(false);
						player2.ChangeOfTurn(true);
						ismoving = 0;
						if(player2.ReturnPoints() == 0)
						{
							alert("El jugador 1 ha ganado!");
						}
						$(".msgconsole").append(player2.ReturnPoints());
					}



					else {
					$(".msgconsole").append("El movimiento no es valido.");
					gameboard.ReloadBoard();
					ismoving = 0;
					}
					$(".msgconsole").append("Turno del jugador uno al terminar el turno: " + player1.ReturnTurn());
					$(".msgconsole").append("Turno del jugador dos al terminar el turno: " + player2.ReturnTurn());
					}


					else if(player2.ReturnTurn()) {
						$(".msgconsole").append(gameboard.ReadUnitBoxValue(positions["lr"]));

						if(gameboard.ReadUnitBoxValue(positions["lr"]) == 1) {
						$(".msgconsole").append("DAMA ENEMIGA EN LR!")
						$(".msgconsole").append(gameboard.ReadUnitBoxValue(parseInt(positions["lr"]) + parseInt(11)))

						if(gameboard.ReadUnitBoxValue(parseInt(positions["lr"]) + parseInt(11)) == 0) {
							$(".msgconsole").append("POSIBILIDAD DE COMER EN LR!")
							  postoeatLR = parseInt(positions["lr"]) + parseInt(11);
						}
					}

					if(gameboard.ReadUnitBoxValue(positions["ll"]) == 1) {
						$(".msgconsole").append("DAMA ENEMIGA EN LL!");
						$(".msgconsole").append(gameboard.ReadUnitBoxValue(parseInt(positions["ll"]) + parseInt(9)))
						if(gameboard.ReadUnitBoxValue(parseInt(positions["ll"]) + parseInt(9)) == 0)
						{
							$(".msgconsole").append("POSIBILIDAD DE COMER EN LL!")
							postoeatLL = parseInt(positions["ll"]) + parseInt(9);

						}
					}

					$(".msgconsole").append("Posicion para comer: " + postoeatLR);
					$(".msgconsole").append("Posicion para comer: " + postoeatLL);

						$(".msgconsole").append("Turno correcto.");

					$(".msgconsole").append(idbutton + " " + positions["ll"] + " " + positions["lr"]);

					if(idbutton == positions["ll"]) {

					$(".msgconsole").append("Movimiento valido.");
					gameboard.Move(idbutton,lastid[indexLID],2)
					player1.ChangeOfTurn(true);
					player2.ChangeOfTurn(false);
					ismoving = 0;

					}

					else if(idbutton == positions["lr"])
					{
						$(".msgconsole").append("Movimiento valido.");
						gameboard.Move(idbutton,lastid[indexLID],2)
						player1.ChangeOfTurn(true);
						player2.ChangeOfTurn(false);
						ismoving = 0;
					}
					else if(idbutton == postoeatLR) {
						$(".msgconsole").append("Movimiento para COMER!");
						gameboard.Eat(idbutton,lastid[indexLID],positions["lr"],2)
						player1.OnePointLess();
						player1.ChangeOfTurn(true);
						player2.ChangeOfTurn(false);
						ismoving = 0;
						if(player1.ReturnPoints() == 0)
						{
							alert("El jugador 2 ha ganado!");
						}
						$(".msgconsole").append(player1.ReturnPoints());

					}

					else if(idbutton == postoeatLL) {
						$(".msgconsole").append("Movimiento para COMER!");
						gameboard.Eat(idbutton,lastid[indexLID],positions["ll"],2)
						player1.OnePointLess();
						player1.ChangeOfTurn(true);
						player2.ChangeOfTurn(false);
						ismoving = 0;
						if(player1.ReturnPoints() == 0)
						{
							alert("El jugador 2 ha ganado!");
						}
						$(".msgconsole").append(player1.ReturnPoints());
					}


					else {
					$(".msgconsole").append("El movimiento no es valido.");
					gameboard.ReloadBoard();
					ismoving = 0;
					}
					$(".msgconsole").append("Turno del jugador uno al terminar el turno: " + player1.ReturnTurn());
					$(".msgconsole").append("Turno del jugador dos al terminar el turno: " + player2.ReturnTurn());

					}

					else
					{
						$(".msgconsole").append("Ocurrio un problema determinando el turno del jugador.");
					}


			}

			}

	});


});

var Board = (function() {
	function Board() {}

	var boxes = []

	Board.prototype.createBoxes = function() {
		boxes = {
		11 : 0, 12 : 2, 13 : 0, 14 : 2, 15 : 0, 16 : 2, 17 : 0, 18 : 2, 21 : 2, 22 : 0, 23 : 2, 24 : 0, 25 : 2, 26 : 0, 27 : 2, 28 : 0, 31 : 0, 32 : 2, 33 : 0, 34 : 2, 35 : 0, 36 : 2, 37 : 0, 38 : 2, 41 : 0, 42 : 0, 43 : 0, 44 : 0, 45 : 0, 46 : 0, 47 : 0, 48 : 0, 51 : 0, 52 : 0, 53 : 0, 54 : 0, 55 : 0, 56 : 0, 57 : 0, 58 : 0, 61 : 1, 62 : 0, 63 : 1, 64 : 0, 65 : 1, 66 : 0, 67 : 1, 68 : 0, 71 : 0, 72 : 1, 73 : 0, 74 : 1, 75 : 0, 76 : 1, 77 : 0, 78 : 1, 81 : 1, 82 : 0, 83 : 1, 84 : 0, 85 : 1, 86 : 0, 87 : 1, 88 : 0
		}
		Board.loadBoxesValues();
	}


	Board.loadBoxesValues = function() {
		var zerovalues = []
		for (var values in boxes) {

				 var mapclass = $("#"+values).attr("class");
				 Board.ColorByClass(values,mapclass);

					if (boxes[values] == 2) {
						$("#"+values).css("color", "red");
						$("#"+values).html("O")
						}

	                else if (boxes[values] == 1) {
						$("#"+values).css("color", "green");
						$("#"+values).html("O");
					}
		}
	}

	Board.prototype.ReloadBoard = function() {
		Board.loadBoxesValues();
	}

	Board.ColorByClass = function(id,btnclass) {
		$("#"+id).css("background-color", btnclass);
		$("#"+id).css("color", btnclass);
	}

	Board.prototype.ReadUnitBoxValue = function(key) {
		return boxes[key];
	}

	Board.prototype.Move = function(idbutton,pastid,valueid) {

                boxes[pastid] = 0;
                boxes[idbutton] = valueid;
                Board.loadBoxesValues();
				return true;
	}

	Board.prototype.Eat = function(idbutton,pastid,ideated, valueid) {
		boxes[pastid] = 0;
		boxes[idbutton] = valueid;
		boxes[ideated] = 0;
		Board.loadBoxesValues();
		return true;
	}

	Board.prototype.GiveBoxColor = function(pm) {
			$("#"+pm).css("background-color", "red");
			$("#"+pm).css("color", "red");
	}


	return Board;

})();

var Player1 = (function() {
	function Player1() {
		console.log("Creando jugador 1...");
		$( "#jugador1" ).html("Jugador 1: " + points + " puntos");

	}

	var points = 12;
	var turn;

	Player1.prototype.OnePointLess = function() {
		points = points - 1;
		$( "#jugador1" ).html("Jugador 1: " + points);
	}

	Player1.prototype.ChangeOfTurn = function(t) {
		turn = t;
	}

	Player1.prototype.ReturnTurn = function() {
		return turn;
	}

	Player1.prototype.ReturnPoints = function() {
		return points;
	}

	return Player1;
})();

var Player2 = (function() {
	function Player2() {
		$( "#jugador2" ).html("Jugador 2: " + points + " puntos");
		console.log("Creando jugador 2...");
	}

	var points = 12;
	var turn;

	Player2.prototype.OnePointLess = function() {
		points = points - 1;
		$( "#jugador2" ).html("Jugador 2: " + points);
	}

	Player2.prototype.ChangeOfTurn = function(t) {
		turn = t;
	}

	Player2.prototype.ReturnTurn = function() {
		return turn;
	}

	Player2.prototype.ReturnPoints = function() {
		return points;
	}

	return Player2;
})();
