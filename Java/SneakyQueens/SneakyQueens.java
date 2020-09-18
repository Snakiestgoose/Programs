// Aaron Hobgood aa889461
// COP 3503, Spring 2020
// =============================
// SneakyQueens.java
// =============================

import java.io.*;
import java.util.*;

// This program takes a chess board of n size with x queens and checks if any of them can take another. 
// A queen piece can move horizontally, vertically, or diagonally. An example of their positions would be a1, or bdeu1256
public class SneakyQueens
{	
	// Method Returns false if Queens can Attack or True if Queens are Safe
	public static boolean allTheQueensAreSafe(ArrayList<String> list, int boardSize)
	{	
		// Arrays for checking the chess boards 
		int[] smallDiagonal = new int[boardSize * 2 - 1];
		int[] bigDiagonal = new int[boardSize * 2 - 1];
		int[] horizontal = new int[boardSize];
		int[] vertical = new int[boardSize];
		
		int diagonalValue = 0;
		
		for (int i = 0; i < list.size(); i++)
		{		
			// Using Horner's Law to calculate and 
			// return the value of the letters and numbers
			int[] queen = horners(list.get(i), 26);
			
			// Checking the Horizontal value "-"
			if (horizontal[queen[0]-1] == 1)
				return false;
			else 
				horizontal[queen[0]-1] = 1;
			// Checking the Vertical value "|"
			if (vertical[queen[1]-1] == 1)
				return false;
			else 
				vertical[queen[1]-1] = 1;
				
			// Checking the Diagonal value: -> "/"
			diagonalValue = queen[0] - ( queen[1] - 1 ) + ( boardSize - 2 );
			if (smallDiagonal[diagonalValue] == 1)
				return false;
			else 
				smallDiagonal[diagonalValue] = 1;
			
			// Checking the Diagonal value: -> "\" 
			diagonalValue = queen[0] + ( queen[1] - 1 );
			if (bigDiagonal[diagonalValue] == 1)
				return false;
			else 
				bigDiagonal[diagonalValue] = 1;
		}
		return true;
	}
	
	//Horner's Law thanks to Szum's code with some modifications
	public static int[] horners(String queen, int multiplier)
	{
		int n = queen.length();
		int retval[] = new int[2];
		String numbers = "";
		
		for (int i = 0; i < n; i++ )
		{
			if (queen.charAt(i) >= 'a' && queen.charAt(i) <= 'z')
			{
				retval[0] *= multiplier;
				retval[0] += queen.charAt(i) - 96;
			}
			else
				numbers += queen.charAt(i);
		}
		retval[1] = Integer.parseInt(numbers);
		
		return retval;
	}
	
	//Difficulty Rating
	public static double difficultyRating()
	{
		return 4.5;
	}
	
	//Hours Spent
	public static double hoursSpent()
	{
		return 30.0;
	}
	
}
