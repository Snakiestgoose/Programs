/*
    Name: Aaron Hobgood
    PID: 4526542
    Date: 12/02/2018
    Assignment: Linked Lists
*/
#include <stdio.h>
#include <stdlib.h>

/****************************************
*   This is the struct for holding      *
*   the contact info                    *
****************************************/
struct ContactInfo
{
    char firstName[20], lastName[20];
    int phoneNumber;

    struct ContactInfo *next;
};

/****************************************
*   This function populates the struct  *
****************************************/
void getContactInfo(struct ContactInfo *ptr)
{
    printf("What is your first name? ");
    scanf("%s", ptr->firstName);
    printf("What is your last name? ");
    scanf("%s", ptr->lastName);
    printf("What is your phone number? ");
    scanf("%d", &ptr->phoneNumber);
}

/****************************************
*   This function adds and allocates    *
*   a spot at the end of the struct list*
*   and returns the new slot            *
****************************************/
struct ContactInfo *addContactToList(struct ContactInfo *ptr)
{
    while( ptr->next != NULL )
    {
        ptr = ptr->next;
    }

    ptr->next = calloc( 1, sizeof( struct ContactInfo ) );

    return ptr->next;
}

/****************************************
*   This function displays what is in   *
*   the struct pointer passed to it     *
****************************************/
void displayContacts(struct ContactInfo *ptr)
{
    printf("First Name: %s \nLast Name: %s \n", ptr->firstName,ptr->lastName);
    printf("Phone %d\n", ptr->phoneNumber);
}

/****************************************
*   This function walks the list until  *
*   the end of it and calls the display *
*   function.                           *
****************************************/
void walkTheList(struct ContactInfo *ptr)
{
    while(ptr != NULL)
    {
        displayContacts( ptr );
        ptr = ptr->next;
    }
}

/****************************************
*   The main function declares the      *
*   pointers, creates contact memory    *
*   and fills it by calling other       *
*   functions  .                        *
****************************************/
int main()
{
    struct ContactInfo *ci, *np;
    int i, input;

    /*Optional input to save time in the for loop for whoever is grading*/
    printf("How many contacts would you like to add? ");
    scanf("%d", &input);
    input = input - 1;

    /*This populates the first struct slot with memory*/
    ci = calloc( 1, sizeof( struct ContactInfo ) );
    /*This fills the first memory of the struct*/
    getContactInfo(ci);

    /*This for loop fills the linked list in the struct to the number in the input*/
    for(i=0; i<input; i++)
    {
        np = addContactToList(ci);
        getContactInfo(np);
    }

    printf("\n");

    /*The walkTheList function walks the struct list and prints its contents*/
    walkTheList(ci);

    return 0;
}
