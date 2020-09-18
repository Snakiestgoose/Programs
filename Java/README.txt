These three java assignments come from my Computer Science II class at UCF with Prof. Szumlanski. 
The professor provided a bash function for testing all test cases provided. This can be done in a linux environment with bash test-all.sh

Sneaky Queens takes a chess board of n size with x queens and finds if any of the queens can capture one another. 
	Ex: _______	Returns false as none of the queens hit one another
	   |_|Q|_|_|
	   |_|_|_|Q|
	   |Q|_|_|_|
	   |_|_|Q|_|

Sneaky Knights is similar to Sneaky Queens, except with Knights, which move in an L shape on a chess board. 
	Ex: _______	Returns true as there is one or more possible moves
	   |_|K|_|_|
	   |_|_|_|K|
	   |K|_|_|_|
	   |_|_|K|_|


Run Like Hell is a dynamic programming problem similar to the Fibonacci or 0-1 Knapsack programming problems with a fast solution. The problem takes a list of numbers as blocks and a runner who is running below the blocks and hits them like Mario, but cannot hit two in a row. The program finds the max combination that the runner can get. 
	Ex:		15 3 6 17 2 1 20
		o-------/\-----/\-----/\	
	15+17+20 = 52, the highest combination
