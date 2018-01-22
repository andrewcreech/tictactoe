/////////////////////////////////////////////
// TicTacToe 
// Designed & Developed by Andrew Creech 2017
/////////////////////////////////////////////

$(document).ready(function(){
	var square = $('.square');
	var menu = $('.menu');
	var player1;
	var player2;
	var winningCombo = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
	var board = [null,null,null,null,null,null,null,null,null];
	var currentPlayer;
	var gameOver;
	var numberOfMoves = 0;
	
	////////////////
	// choose x or o
	$('.choose-player').click(function(){
		if ($(this).hasClass('x')){
			player1 = 'x';
			player2 = 'o';
			currentPlayer = player1;
			$(this).parent().children('.o, span').hide(500);
		} else {
			player1 = 'o';
			player2 = 'x';
			currentPlayer = player2;
			$(this).parent().children('.x, span').hide(500);
		}
		gameOver = false;
		menu.delay(1500).fadeOut(400);
	});
	
	/////////////////
	// take your turn
	square.click(function(){
		// make sure square is open
		if ($(this).hasClass('open-square') && !gameOver){
			$(this).removeClass('open-square');
			// increment numberOfMoves
			numberOfMoves++;
			// display current move in DOM
			$(this).addClass(currentPlayer);
			$(this).children().html(currentPlayer).hide().fadeIn(400);
			// load current move into the board array
			var currentSquare = parseInt($(this).attr('id'));
			board.splice(currentSquare, 1, currentPlayer);
			// check for the win
			if (checkForWin(currentPlayer, board, winningCombo)){
				gameOver = true;
				// display winner
				menu.children('.x, .o').hide();
				menu.delay(800).fadeIn(400).append('<div class="square winner '+ currentPlayer +'"><span>'+ currentPlayer +'</span></div><span class="winner">wins</span>');
				// call resetGame function
				setTimeout(resetGame, 1300);
			} 
			// no win so check for draw
			else if (numberOfMoves === 9){
				menu.children('.x, .o').hide();
				menu.delay(800).fadeIn(400).append('<div class="winner"><span>It was a draw</span></div>');
				setTimeout(resetGame, 1300);
			}
			// if game is not over... swap currentPlayer
			if (currentPlayer === player1) {
				currentPlayer = player2;
			} else {
				currentPlayer = player1;
			}
		}
	});
	
	///////////////////////
	// checkForWin function
	function checkForWin(currentPlayer, board, winningCombo){
		// loop through sets of winningCombos
		for (i=0; i<winningCombo.length; i++){
			// preset winning to true
			var hasAWinningCombo = true;
			// loop through each sets values
			for (j=0; j<winningCombo[i].length; j++){
				var test = winningCombo[i][j];
				// if no match after all sets, return false & game will continue
				if (board[test] !== currentPlayer){
						hasAWinningCombo = false;
						} 
			}
			// if not false we have a winner, game will end
			if (hasAWinningCombo){
					return true;
			}	
		}
	}
	
	/////////////////////
	// resetGame function
	function resetGame() {
		// start game again
		$('.winner').delay(1500).fadeOut(400);
		$('.choose-player, .or').delay(2500).fadeIn(500);
		// reset boards
		board = [null,null,null,null,null,null,null,null,null];
		$('#0,#1,#2,#3,#4,#5,#6,#7,#8')
			.removeClass('x o')
			.addClass('open-square')
			.empty()
			.html('<span></span>');
		// reset numberOfMoves
		numberOfMoves = 0;
	}
});