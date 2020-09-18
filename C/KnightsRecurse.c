/*
* University of Central Florida
* COP 3502 - 0001 - Spring 2019
* Author: <Aaron>
* Program 2: KnightsRecurse
* Date: 03/15/19
*/

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Method Declarations
void KnightsMultiply(FILE *fin, FILE *fout);
void KnightsFlip(FILE *fin, FILE *fout);
void KnightsShape(FILE *fin, FILE *fout);
void KnightsScotch(FILE *fin, FILE *fout);
void KnightsDepot(FILE *fin, FILE *fout);

int fact(int n, int k);
void flipRecursion(int a, int n);
void markX(int num, int x, int spaces, int temp, int end);
int scotchRecurse(int start, int size, int nums[]);
int depotRecurse(int maxLen, int size, int nums[], int boards, int k);

// This program reads a series of commands followed by their respective information and writes
// to a file the appropriate information. I do not have a sample input at my disposal. 
int main()
{
    FILE *fin, *fout;
    char command[20];

    // Opening file to read and verifying it opened
    fin = fopen("KnightsRecurse.in", "r");
    if(fin == NULL)
    {
        perror("Error in opening file");
        return(-1);
    }
    fout = fopen("KnightsRecurse.out", "w");

    // Reading the entire file until the EOF and calling the appropriate commands. 
    while(1)
    {
        if(feof(fin))
        {
            break;
        }

        fscanf(fin, "%s", command);

        if(strcmp(command, "KnightsMultiply") == 0)
        {
            KnightsMultiply(fin, fout);
        }
        else if(strcmp(command, "KnightsFlip") == 0)
        {
            KnightsFlip(fin, fout);
        }
        else if(strcmp(command, "KnightsShape") == 0)
        {
            KnightsShape(fin, fout);
        }
        else if(strcmp(command, "KnightsScotch") == 0)
        {
            KnightsScotch(fin, fout);
        }
        else if(strcmp(command, "KnightsDepot") == 0)
        {
            KnightsDepot(fin, fout);
        }

    }

    return 0;
}

// This command reads two values, then calls fact for the answer
void KnightsMultiply(FILE *fin, FILE *fout)
{
    double answer;
    int k, n;

    fscanf(fin, "%d", &k);
    fscanf(fin, "%d", &n);

    answer = fact( n, k );

    printf("Knights Multiply: %.lf\n", answer);
    fprintf(fout, "Knights Multiply: %.lf\n", answer);

}
// This recursive function either returns 1 or n * fact(n-1, k) until n == k
int fact(int n, int k)
{
    if(n == k)
        return 1;
    else
        return (n * fact(n-1, k));
}

// This function reads int n then calls flipRecursion with those two values. 
void KnightsFlip(FILE *fin, FILE *fout)
{
    int n, a;
    a = 0;
    fscanf(fin, "%d", &n);


    fprintf(fout, "KnightsFlip:\n");
    printf("KnightsFlip:\n");
    flipRecursion(a, n);
}

// This function flips the value of a recursively until it is 1
void flipRecursion(int a, int n)
{
    if(a == 0)
    {
        printf("KKK\n");
        a = 1;
        return flipRecursion(a, n);
    }
    else if(a == 1)
    {
        printf("FFF\n");
        return 0;
    }
}

// This function scans int n then calls markX
void KnightsShape(FILE *fin, FILE *fout)
{
    int n, temp, end;
    int spaces = 0, x = 0;
    fscanf(fin, "%d", &n);
    temp = n;
    end = n;

    fprintf(fout, "KnightsShape: ");

    markX(n, x, spaces, temp, end);


}

// This function marks an X in a series of spots to form a larger X depending on the size of num
void markX(int num, int x, int spaces, int temp, int end)
{
    if(temp > end)
    {
        return 0;
    }
    else if(spaces == x || spaces == temp- 1)
    {
        printf("X");
        markX(num, x, spaces + 1, temp, end);
    }
    else if(spaces < temp)
    {
        printf(" ");
        markX(num, x, spaces + 1, temp, end);
    }
    else if(spaces > temp - 1)
    {
        printf("\n");
        if(temp <= num/2 + 1)
        {
            markX(num + 2, x - 1, 0, temp + 1, end);
        }
        else
            markX(num, x + 1, 0,temp - 1, end);
    }
}

// This function reads the start and size ints as well as the int nums array from the file 
// and calls scotchRecurse to determine if it is solvable
void KnightsScotch(FILE *fin, FILE *fout)
{
    int start, size;
    int solvable;

    fscanf(fin, "%d", &start);
    fscanf(fin, "%d", &size);

    int nums[size];
    for(int i = 0; i < size; i++)
    {
        fscanf(fin, "%d", &nums[i]);
    }

    start = nums[start];
    fprintf(fout, "KnightsScotch: ");
    solvable = scotchRecurse(start, size, nums);

    if(solvable == 1)
    {
        printf("Solvable\n");
    }
    else
        printf("Not Solvable\n");

}

// Recursively moves through nums array checking for nums[start] == 0 to return true of 
// start == 0 to return false
int scotchRecurse(int start, int size, int nums[])
{
    if(nums[start] == 0)
    {
        return 1;
    }
    else if(start == 0)
    {
        return 0;
    }
    else if(start + nums[start] < size)
    {
        return scotchRecurse(start + nums[start], size, nums);
    }
    else if(start - nums[start] < size)
    {
        return scotchRecurse(start - nums[start], size, nums);
    }
}

// This function reads in maxLen, size and the nums array to determine number of boards for
// the depot command. 
void KnightsDepot(FILE *fin, FILE *fout)
{
    int maxLen, size;

    fscanf(fin, "%d", &maxLen);
    fscanf(fin, "%d", &size);

    int nums[size];
    for(int i = 0; i < size; i++)
    {
        fscanf(fin, "%d", &nums[i]);
    }
    int k = 0;
    int boards = 0;
    boards = depotRecurse(maxLen, size, nums, boards, k);

    printf("KnightsDepot: %d\n", boards);
}

// This function recursively increases k until k+1= size to determine number of boards. 
int depotRecurse(int maxLen, int size, int nums[], int boards, int k)
{
    if(k + 1 == size)
    {
        return boards;
    }
    for(int i = 0; i < size; i++)
    {
        if(k == i || nums[i] == 0)
        {
            continue;
        }
        else if(nums[k] == maxLen)
        {
            //printf("Equals\n");
            boards++;
            nums[k] = 0;
            return depotRecurse(maxLen, size, nums, boards, k + 1);
        }
        else if(nums[k] + nums[i] <= maxLen)
        {
            nums[k] += nums[i];
            nums[i] = 0;
            continue;
        }
        else if(nums[k] + nums[i] > maxLen)
        {
            continue;
        }
    }
    if(nums[k] == 0)
    {
        return depotRecurse(maxLen, size, nums, boards, k + 1);
    }
    boards++;
    nums[k] = 0;
    return depotRecurse(maxLen, size, nums, boards, k + 1);


}
