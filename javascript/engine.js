$(document).ready(function()
{
	var players =
	{
		player1 : true, player2: false
	}


	var board =
	{
		11 : 0, 12 : 2, 13 : 0, 14 : 2, 15 : 0, 16 : 2, 17 : 0, 18 : 2, 21 : 2, 22 : 0, 23 : 2, 24 : 0, 25 : 2, 26 : 0, 27 : 2, 28 : 0, 31 : 0, 32 : 2, 33 : 0, 34 : 2, 35 : 0, 36 : 2, 37 : 0, 38 : 2, 41 : 0, 42 : 0, 43 : 0, 44 : 0, 45 : 0, 46 : 0, 47 : 0, 48 : 0, 51 : 0, 52 : 0, 53 : 0, 54 : 0, 55 : 0, 56 : 0, 57 : 0, 58 : 0, 61 : 1, 62 : 0, 63 : 1, 64 : 0, 65 : 1, 66 : 0, 67 : 1, 68 : 0, 71 : 0, 72 : 1, 73 : 0, 74 : 1, 75 : 0, 76 : 1, 77 : 0, 78 : 1, 81 : 1, 82 : 0, 83 : 1, 84 : 0, 85 : 1, 86 : 0, 87 : 1, 88 : 0
	}

function loadValues()
{
    var zerovalues = []
	for (var values in board)
	{
                if(board[values] == 0)
                {
                    zerovalues[values] = board[values]
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
		else if (board[values] == 2)
		{
                        
			$("#"+values).css("color", "red");
			$("#"+values).html("0")
		}
                else if (board[values] == 1) 
		{
                        
			$("#"+values).css("color", "green");
			$("#"+values).html("0");
		}
	}
}
	
	loadValues();

	function makeamove(id)
	{
		$(".white").css("background-color", "white");
		$(".black").css("background-color", "black");
		$("#"+id).css("background-color", "yellow");
		var positions =
		{
			ul : id - 11, ur : id - 9, ll : parseInt(id) + parseInt(9), lr : parseInt(id) + parseInt(11)
		}
		
		if(players["player1"])
		{
            alert(positions["ul"] + " " + board[positions["ur"]] + " " + positions["ur"] + " " + board[positions["ur"]] + " " + positions["ll"] + " " + board[positions["ll"]] + " " + positions["lr"] + " " + board[positions["lr"]])
		
			if(board[positions["ul"]] === 0)
			{

			$("#"+positions["ul"]).css("background-color", "red");
			$("#"+positions["ul"]).css("color", "red");
                
                $("#"+positions["ul"]).click(function()
                {
                board[id] = 0;
                board[positions["ul"]] = 1;
                loadValues();
                })
                
			}
                        
			if(board[positions["ur"]] === 0)
			{
				$("#"+positions["ur"]).css("color", "red");
				$("#"+positions["ur"]).css("background-color", "red");
                 $("#"+positions["ur"]).click(function()
                {
                board[id] = 0;
                board[positions["ur"]] = 1;
                loadValues();
                })
			}
                        
               
		}

               /* else if(player["player2"])
                {
                    
                    }*/

	}

	$("button").click(function(event)
	{
        
		var idbutton = $(this).attr("id");
		if(board[idbutton] === 0)
		{
			$(".white").css("background-color", "white");
			$(".black").css("background-color", "black");
		}
		else if (board[idbutton] === 1 && players["player1"])
		{
		
		makeamove(idbutton);
		players["player1"] = false;
		players["player2"] = true;	
        idbutton = 0;

		}
		else if(board[idbutton] === 2 && players["player2"])
		{
			
		makeamove(idbutton);
		players["player1"] = true;
		players["player2"] = false;
        idbutton = 0;
		}
		else
		{
			alert("Es turno del otro jugador.");
		}
		
	})
})
