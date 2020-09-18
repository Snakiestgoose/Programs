// Aaron Hobgood
// COP 3503, Spring 2020
// 4526542
// =============================
// SneakyKnights.java
// =============================
import java.io.*;
import java.util.*;

// This program takes a situation where a person is running for their lives and along their path are blocks with numbers
// The runner wishes to pick the greatest combination of numbers as they run along the path.
// The runner cannot choose two in a row. When they jump to get one, they must wait until after the following to jump again

public class RunLikeHell 
{	
	// Given array of blocks, maxGain finds the highest total combination and returns it
	public static int maxGain(int [] blocks)
	{
		int total = 0;
		// Some base cases to handle if the length is shorter than 3
		// It also initializes total so if the length of blocks is 4, it can properly compare them
		if (blocks.length <= 2)
			return Math.max(blocks[0], blocks[1]);
		else 
			total = Math.max((blocks[0] + blocks[2]), blocks[1]);
		if (blocks.length == 3)
			return total;
		
		int [] dpArray = new int[blocks.length + 1];
		// Initalize base cases to jump start the for-loop.
		dpArray[0] = blocks[0];
		dpArray[1] = blocks[1];
		dpArray[2] = blocks[0] + blocks[2];
		// dp solution ffrom the bottom up: yeet
		for (int i = 3; i < blocks.length; i++)
		{
			// current index = block[i] + the greater of the two previous available blocks
			dpArray[i] = Math.max((dpArray[i-2] + blocks[i]), (dpArray[i-3] + blocks[i]));
			// Update the total if current dpArray[i] is greater
			if (dpArray[i] > total)
				total = dpArray[i];
		}
		return total;
	}
	
	public static double difficultyRating()
	{
		return 3.0;
	}
	public static double hoursSpent()
	{
		return 12.0;
	}
}
