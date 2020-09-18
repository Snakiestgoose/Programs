// Aaron Hobgood aa889461
// COP 3503, Spring 2020
// =============================
// SneakyKnights.java
// =============================

import java.io.*;
import java.util.*;
import java.awt.*;

// This program takes a chess board of n size with x knights and checks if any of them can take another. 
// A knight piece can move in an L shape such as up two over one. An example of their positions would be a1, or bdeu1256
public class SneakyKnights
{	  
	// Method Returns false if Queens can Attack or True if Queens are Safe
	public static boolean allTheKnightsAreSafe(ArrayList<String> list, int boardSize)
	{	
		// Point that holds the current point value of the knight
		Point pointy;

		// HashSet that contains the knight's Point
		HashSet<Point> hashyHash = new HashSet<Point>();
		
		// Loop through the number of knights
		for (int i = 0; i < list.size(); i++)
		{		
			// Using Horner's Law to calculate and 
			// return the value of the letters and numbers
			// This is the same format as my SneakyQueens.
			int [] knight = horners(list.get(i), 26);
			pointy = new Point(knight[0], knight[1]);
			
			hashyHash.add(pointy);
			
			// Some if else statements about the different spots the Knight could attack
			// False is returned saying the knights are not safe.
			if (hashyHash.contains(new Point(pointy.x - 1, pointy.y + 2)))
				return false;
			else if (hashyHash.contains(new Point(pointy.x - 2, pointy.y + 1)))
				return false;
			else if (hashyHash.contains(new Point(pointy.x - 2, pointy.y - 1)))
				return false;
			else if (hashyHash.contains(new Point(pointy.x - 1, pointy.y - 2)))
				return false;
			else if (hashyHash.contains(new Point(pointy.x + 1, pointy.y - 2)))
				return false;
			else if (hashyHash.contains(new Point(pointy.x + 2, pointy.y - 1)))
				return false;
			else if (hashyHash.contains(new Point(pointy.x + 2, pointy.y + 1)))
				return false;
			else if (hashyHash.contains(new Point(pointy.x + 1, pointy.y + 2)))
				return false;
		}		
		return true;
	}
	
	// Horner's Law thanks to Szum's code with some modifications
	// This is borrowed from my SneakyQueens code and modified
	public static int[] horners(String knight, int multiplier)
	{
		int n = knight.length();
		int retval[] = new int[2];
		String numbers = "";
		
		for (int i = 0; i < n; i++ )
		{
			if (knight.charAt(i) >= 'a' && knight.charAt(i) <= 'z')
			{
				retval[0] *= multiplier;
				retval[0] += knight.charAt(i) - 96;
			}
			else
				numbers += knight.charAt(i);
		}
		retval[1] = Integer.parseInt(numbers);
		
		return retval;
	}
	
	//Difficulty Rating
	public static double difficultyRating()
	{
		return 3.8;
	}
	
	//Hours Spent
	public static double hoursSpent()
	{
		return 15;
	}
	
}
