$(document).ready(function() {
	
	var player1 = new Player1;
	var player2 = new Player2;
	var gameboard = new Board;
	player1.ChangeOfTurn(true);
	player2.ChangeOfTurn(false);
	gameboard.createBoxes();
	
		
		$('button').click(function(){
	
		var idbutton = $(this).attr("id")
		var positions =
		{
			ul : idbutton - 11, ur : idbutton - 9, ll : parseInt(idbutton) + parseInt(9), lr : parseInt(idbutton) + parseInt(11)
		}
		
		if(gameboard.ReadUnitBoxValue(idbutton) === 0)
		{
		}
		else if (gameboard.ReadUnitBoxValue(idbutton) === 1 && player1.ReturnTurn())
		{
		$("#"+idbutton).css("background-color", "yellow");
		gameboard.GiveBoxColor(positions["ul"],positions["ur"]);
		gameboard.Move(positions["ul"],positions["ur"],idbutton)
		player1.ChangeOfTurn(false);
		player2.ChangeOfTurn(true);

		}
		else if(gameboard.ReadUnitBoxValue(idbutton) === 2 && player2.ReturnTurn())
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

var Player1 = (function() {
	function Player1() {}
	
	var points = 16;
	var turn;
	
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

var Player2 = (function() {
	function Player2() {}
	
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