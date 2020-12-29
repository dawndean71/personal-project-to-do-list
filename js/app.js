
//************************************* BEGIN VARIABLES *******************************************/
// Select the elements using this syntax: document.getElementById("elementID") 
// or document.querySelector("class or id");

// select the clear (refresh) element and store it in a variable called 'clear'
// since it is a const, its value cannot be reassigned.
const clear = document.querySelector(".clear");

//select the list element and store it in a variable called 'list'. 
const list = document.getElementById("list");

// select the input textbox and store it in a variable called 'input'. This is how we 
// retrieve the to-do tasks the user enters
const input = document.getElementById("input");

// Create constants for the following class names:
// 1. fa-check-circle
// 2. fa-circle-thin
// 3. lineThrough
// Advantage: the constant names are shorter so you save time and also prevent mistakes down the line.
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// Create an object for the date
const currentDate = new Date ();

// Create the options for the date. I want to display it as: Sunday, January 10th, 2020.
const options = {weekday:"long", month:"short", day:"numeric", year:"numeric"};
// select the date element and store it in a variable called 'date'. This will display todays date.
const date = document.getElementById("date");

// Maniuplate/change the html DOM (Document Object Model) and insert the current date in the tree. 
// To accomplish this, use the date selector variable and access the HTML document by using ".innerHTML" method.
// eg: <div class="date"> INNER HTML </div>
// To retrieve the current date, use the date object and acess the .toLocaleDateString(language, options) method.
date.innerHTML = currentDate.toLocaleDateString("en-US", options);

// Retrieve item from localStorage
let data = localStorage.getItem("TODO"); // 'TODO' is the key connected to the value LIST

// Create LIST array to store items
let LIST = [];
// Create id variable and set it to 0
let id = 0;

//************************************* END VARIABLES *******************************************/


//-----------------------------------------FUNCTIONS----------------------------------------------//
// I need 4 functions:
// 1. loadToDo
// 2. addToDo
// 4. completeToDo
// 3. deleteToDo

checkLocalStorage();
//******************************** BEGIN loadToDo function ****************************************** */
// create a function that will loop through each item in the array and add it to the to do list.
function loadToDo (array) {
    // so for each item, add to list
    array.forEach(function(item) {
        addToDo(item.name, item.id, item.done, item.trash)});
    };


//************************************* END loadToDo function ********************************************* */

// Call checkStorage and clear storage
clearLocalStorage();

//******************************** BEGIN addToDo funciton ************************************************* */
// Create the addToDo function to add an item to the list 
// Add theese parameters to the funciton: toDo, id, done and trash. We will use these as placeholders within the item 
// template in order to retrieve the input text from the user, the id #, and the job (complete or delete).
function addToDo(toDo, id, done, trash) {
    // check if the item is in the trash
    // if item is in trash, return nothing, else execute the code below
    if(trash) {
        return;
    }
    // check if the user has completed the task (green fill and strikethrough)
    const DONE = done ? CHECK : UNCHECK;  // we will toggle between check and uncheck
    const LINE = done ? LINE_THROUGH : "";
    // create item template
    const item = 
    `
    <li class="item">
    <!-- circle icon to the left -->
    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
    <!-- item text -->
    <p class="text ${LINE}">${toDo}</p> 
    <!-- trash icon to the right -->
    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
    </li>
    `;
    // Create a const variable for position and give it the value 
    // of “beforeend”. This positions every new item after the last child of the list element. 
    const position = "beforeend";

    // insert the item entered by the user into the DOM tree by using insertAdjacentHTML(position,item);
    list.insertAdjacentHTML(position, item);

}
//******************************** END addToDo funciton ************************************************* */

//  If the user decides to press the enter key to submit their to do list task instead of clicking the add button,
//  how would we know that they clicked the enter key? We need to implement an event listener.

// Recall that each key on the keyboard has a key code, the enter keys key code is 13. But since 'keyCode' has been
// deprecated, we use '.key' instead and the value we use with this is the actually name of they key.
document.addEventListener("keyup", function(event){
    //if the user presses the enter key, retrieve the value of the input and add the item to the list.
    if(event.key == 'Enter'){
        const toDo = input.value;
        // if the input isnt empty (toDo == true), add the item to the list by calling the addToDo() function
        // else send an alert.
        if(toDo){
            addToDo(toDo, id, false, false);   
            // push the items to our array 
            LIST.push({
                name : toDo,
                id : id, 
                done : false,
                trash : false
            });
            // Add item to localStorage (this code must be added everywhere the list array is updated)
            localStorage.setItem("TODO", JSON.stringify(LIST));
            //increment the id so that 2 items do not have the same id
            id++;           
        }
        // clear the input box after adding an item to the list
        input.value = "";
        }
});

//******************************** BEGIN completeToDo funciton ****************************************** */

// After an item has been added to the list, the user now has the ability to check and uncheck a task. 
// - When the user checks the circle, the previous state disappears.
// - When the user unchecks the circle the previous state also disappears. 
// - When the user clicks the empty circle and marks it green, we must remove the empty circles class from the 
//   class list and add the green circle to the class list. 
// - When the circle is green, and the user clicks the circle, we must remove the green circle from the class 
// list and return the empty circle to the class list.    

// To do this we will create a function for this and use the .classList and .toggle method:

// ++++++++++++++++++++
// How .classList works: 
// ++++++++++++++++++++
// if the CLASS exists in the class list, remove it, else, if the class does not exist, add it.

// ++++++++++++++++++++
// How .toggle works:
// ++++++++++++++++++++
// the toggle method toggles between hide() and show() on the selected element. 

// ++++++++++++++++++++
// How .querySelector works:
// ++++++++++++++++++++
// the querySelector() method returns the first Element within the document that matches the specified
// selector, or group of selectors. 

function completeToDo (element) { 
    // if CHECK is in the class list, remove it and add the UNCHECK 
    // reminder: check = fa-check-circle
    // reminder: uncheck = fa-circle-thin
          element.classList.toggle(CHECK);    
          // if UNCHECK is in the class list, remove it and add the CHECK
          element.classList.toggle(UNCHECK);
          // don’t forget when the item is checked, there is a line through the text, we need to implement this too. 
          // the element that is currently selected is the circle, but we want to select the text next to this circle, 
          // we need to select the parent node of this element and then search for the text class name. We want to toggle 
          // this strike through so use .classList and .toggle again.
          element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH); 
          // now we need to update the ‘done’ property so that the changes are not only shown on the user interface but also
          // in the array.
          // if done is true, set it to false, and if false, set it to true. Use ternary operator
          LIST[element.id].done = LIST[element.id].done ? false : true;
        }

//******************************** END completeToDo funciton ****************************************** */


//******************************** BEGIN deleteToDo function ****************************************** */

// if the user clicks on the trash can icon, everything must be removed. 
// This includes the following elements:
// 1. the id
// 2. the item (text)   
// 3. the ‘done’ element
// 4. the ‘trash’ element
// -  in order to delete everything,  we want to select the TRASH element. But we don’t want to just delete
// the trash element, we want to remove all elements. To do so, lets think of each element as a child element 
// and these child elements have a parent. To remove all children at the same time, we can simply remove the parent.
//  Access the parent by using .parentNode.

//+++++++++++++++++++++++++++++++++++++
// Steps to remove an item from a list:
//+++++++++++++++++++++++++++++++++++++
// 1. Create a removeToDo function.
// 2. Give it a parameter called “element”. This will be used to access the parent node so we can remove it. 
// Parameters allow us to pass information or instructions into functions.
// 3. Access the parentNode using the element parameter 
// 4. Now access the .removeChild method. The thing you want to remove is the parentNode.

function deleteToDo (element) {
    // this only removes everything from the user interface
        element.parentNode.parentNode.removeChild(element.parentNode);
        // to update the array list we must do this
        LIST[element.id].trash = true;
}

//******************************** END deleteToDo function ****************************************** */

// Now we want to TARGET AN ELEMENT. We do this so we can figure out which element has triggered a specific 
// event.
// - we need to select the entire list
// - then we need to add an Event Listener to the list element that will be on the look out for a “click” event. 
// - after the user clicks, we want something to happen. What is it? If the user clicks on the trash can, we want
// to know what element that is the user just clicked on. 
// - So after the click event, we want to run a function that targets that click event.  

// const list = document.getElementById("list");
//after the user clicks, run a function that will return info on the element that was clicked.
list.addEventListener("click", function(event) {
const element = event.target;
// retrieve the value of the job attribute, what is it created to do?
const elementJob = element.getAttribute("job");  // this will return, ‘delete’ or ‘complete’ because these are 
                                                 // the attribute values we set for the circle icon and the trash icon
                                                 // job attribute.


// if the user clicks the empty circle, meaning the ‘job is complete’, then run the completeToDo function, if not 
//run the deleteToDo function
if(elementJob == "complete") {
    completeToDo(element);
    } else if (elementJob == "delete") {
        deleteToDo(element); 
    }
    // Add item to localStorage (this code must be added everywhere the list array is updated)
    localStorage.setItem("TODO", JSON.stringify(LIST));
    });


//********************************** BEGIN checkLocalStorage function ****************************************/
// When the user first opens the application there will be no data, so we should check if we have data in the
// local storage. If the data is empty, we need to create the list array and set the id to 0.
// if the user has data, we need to retrieve the list from local Storage and load it to the user interface.
function checkLocalStorage () { 
    if(data) {
        LIST = JSON.parse(data);
        id = LIST.length; 
        //call load function
        loadToDo(LIST);
    } else {
        // if the user is opening the app for the first time create the list array and set id to 0
        LIST = [];
        id = 0;
    
    }
    }
    //********************************** END checkLocalStorage function ****************************************/
    
    //********************************** BEGIN clearLocalStorage function ****************************************/
    // Clear localStorage
    // - we want to know when the user clicks the clear refresh button. So to know this, we need to add an event
    //  listener
    function clearLocalStorage() {
    const clear = document.querySelector(".clear");
    //after the user clicks on the refresh button, what event do we want to happen?
    clear.addEventListener("click", function() {
    // delete items from local Storage
    localStorage.clear();
    //reload the page
    location.reload();
    }
    )};
   //********************************** END clearLocalStorage function ****************************************/
