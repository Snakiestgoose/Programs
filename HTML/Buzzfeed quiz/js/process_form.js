//  Aaron Hobgood
//  DIG 3716c Dan Novatnak
//  process_form.js

// add comments
// ad links

// Global variables
// flags that are used to determine all input is correct and passed around
var flags = {
    q1_valid: false,
    q2_valid: false,
    q3_valid: false,
    q4_valid: false,
    q5_valid: false,
    q6_valid: false
};
// The users data that is stored after the data is submitted
var user_input = {
    first_name: "",
    last_name: "",
    email: "",
    tel: "",
    sulley: "",
    anon: false
};
// answers array that contains the value of each answers value
var answers = [];

// This initial function disables the questionaire section, a sort of cheat to adding the entire thing through
// DOM when the user info is submitted
function setVisibility() {
    document.questionaire.style.visibility = "hidden";
}

// listening function that handles the blur and focus events of the user input
function setUpForm() {
    // some shortcuts
    firstname = document.survey.firstName;
    lastname = document.survey.lastName;
    email = document.survey.email;
    tel = document.survey.tel;
    sulley = document.survey.sulley;

    // Each blur calls the validateData function
    // Each focus is a short function the span of that element
    firstname.addEventListener('blur', validateData);
    firstname.addEventListener('focus', function() {
        var q1 = document.getElementById('q1');
        var span = q1.getElementsByTagName('span');
        span[0].firstChild.nodeValue = "Letters only!";
        span[0].className = "focus";
    });

    lastName.addEventListener('blur', validateData);
    lastName.addEventListener('focus', function() {
        var q2 = document.getElementById('q2');
        var span = q2.getElementsByTagName('span');
        span[0].firstChild.nodeValue = "Letters only!";
        span[0].className = "focus";
    });

    email.addEventListener('blur', validateData);
    email.addEventListener('focus', function() {
        var q3 = document.getElementById('q3');
        var span = q3.getElementsByTagName('span');
        span[0].firstChild.nodeValue = "chars@chars.chars";
        span[0].className = "focus";
    });

    tel.addEventListener('blur', validateData);
    tel.addEventListener('focus', function() {
        var q4 = document.getElementById('q4');
        var span = q4.getElementsByTagName('span');
        span[0].firstChild.nodeValue = "123-456-7890";
        span[0].className = "focus";
    });

    sulley.addEventListener('blur', validateData);
    sulley.addEventListener('focus', function() {
        var q5 = document.getElementById('q5');
        var span = q5.getElementsByTagName('span');
        span[0].firstChild.nodeValue = "http(s)://chars~chars";
        span[0].className = "focus";
    });

    // checkbox that disables the input fields to remain anonymous
    anon.addEventListener('change', function() {
        if (document.survey.elements['anon'].checked) {
            document.getElementById("firstName").disabled = true;
            document.getElementById("lastName").disabled = true;
            document.getElementById("email").disabled = true;
            document.getElementById("tel").disabled = true;
            document.getElementById("sulley").disabled = true;
            flags.q6_valid = true;
        }
        else {
            document.getElementById("firstName").disabled = false;
            document.getElementById("lastName").disabled = false;
            document.getElementById("email").disabled = false;
            document.getElementById("tel").disabled = false;
            document.getElementById("sulley").disabled = false;
            flags.q6_valid = false;
        }
    });

    // There are two submit buttons, one that submits the user info and sends the flags to the processForm,
    // The other submits the answers to the questionaire and calculate them in calcQuest
    document.survey.addEventListener("submit", sendFlags);
    document.questionaire.addEventListener("submit", calcQuest);
}

// This function validates all of the data accordingly from the user input in survey and displays a check or error
function validateData() {
    
    var NameRegEx = /^[A-Za-z]+$/;
    var EmailRegEx = /^[a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~;]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/;
    var TelRegEx = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
    var SulleyRegEx = /https?:\/\/.+~\w+/;

    if (this.name == "firstName" || this.name == "lastName") {
        if (this.name == "firstName")
            var q = document.getElementById('q1');
        else
            var q = document.getElementById('q2');
        var span = q.getElementsByTagName('span');
        if (this.value.match(NameRegEx)) {
            if (span[0].firstChild.nodeValue == null) {
                span[0].appendChild(document.createTextNode(''));
                span[0].className = "success";
            }
            else {
                span[0].firstChild.nodeValue = '';
                span[0].className = "success";
            }
            span[0].style.content = "\2713";
            if (this.name == "firstName")
                flags.q1_valid = true;
            else
                flags.q2_valid = true;
        }
        else {
            if(span[0].firstChild.nodeValue == null) {
                span[0].appendChild(document.createTextNode('\u274C Try Again'));
            } else {
                span[0].firstChild.nodeValue = "\u274C Try Again";
                span[0].className = "error";
            }
            if (this.name == "firstName")
                flags.q1_valid = false;
            else
                flags.q2_valid = false;
        }
    }
    else if (this.name == "email") {
        var q3 = document.getElementById('q3');
		var span = q3.getElementsByTagName('span');
        
        if (this.value.match(EmailRegEx)) {
            if (span[0].firstChild.nodeValue == null) {
                span[0].appendChild(document.createTextNode(''));
            }
            else {
                span[0].firstChild.nodeValue = "";
            }
            span[0].className = "success";
            flags.q3_valid = true;
        }
        else {
            if(span[0].firstChild.nodeValue == null) {
                span[0].appendChild(document.createTextNode('\u274C Try Again'));
            } else {
                span[0].firstChild.nodeValue = '\u274C Try Again';
            }
            span[0].className = "error";
            flags.q3_valid = false;
        }
    }
    else if (this.name == "tel") {
        var q4 = document.getElementById('q4');
		var span = q4.getElementsByTagName('span');
        
        if (this.value.match(TelRegEx)) {
            if (span[0].firstChild.nodeValue == null) {
                span[0].appendChild(document.createTextNode(''));           
            }
            else {
                span[0].firstChild.nodeValue = "";
            }
            span[0].className = "success";
            flags.q4_valid = true;
        }
        else {
            if(span[0].firstChild.nodeValue == null) {
                span[0].appendChild(document.createTextNode('\u274C Try Again'));
            } else {
                span[0].firstChild.nodeValue = "\u274C Try Again";
            }
            flags.q4_valid = false;
            span[0].className = "error";
        }
    }
    else if (this.name == "sulley") {
        var q5 = document.getElementById('q5');
		var span = q5.getElementsByTagName('span');
        
        if (this.value.match(SulleyRegEx)) {
            if (span[0].firstChild.nodeValue == null) {
                span[0].appendChild(document.createTextNode(''));
            }
            else {
                span[0].firstChild.nodeValue = "";
            }
            span[0].className = "success";
            flags.q5_valid = true;
        }
        else {
            if(span[0].firstChild.nodeValue == null) {
                span[0].appendChild(document.createTextNode('\u274C Try Again'));
            } else {
                span[0].firstChild.nodeValue = '\u274C Try Again';
            }
            flags.q5_valid = false;
            span[0].className = "error";
        }
    }
}
// Short function for sending the flags to processForm, slightly redundant as I made them global
function sendFlags() {
    processForm(flags.q1_valid, flags.q2_valid, flags.q3_valid, flags.q4_valid, flags.q5_valid, flags.q6_valid);
}
// This is where the survey is processed as valid and then removed to make the questionaire visible
function processForm(q1_valid, q2_valid, q3_valid, q4_valid, q5_valid, q6_valid) {
    event.preventDefault();
    if((q1_valid && q2_valid && q3_valid && q4_valid && q5_valid) || q6_valid) {	
        if (!q6_valid) {
        user_input.first_name = document.survey.firstName.value;
        user_input.last_name = document.survey.lastName.value;
        user_input.email = document.survey.email.value;
        user_input.tel = document.survey.tel.value;
        user_input.sulley = document.survey.sulley.value;
        }
        else {
            user_input.anon = true;
        }
        var elem = document.getElementById("survey");
        elem.parentNode.removeChild(elem);
        document.questionaire.style.visibility = "visible";
        return false;
    } else {	
        var invalid_process = document.createElement("h3");
        invalid_process.className = "error";
        invalid_process_text = document.createTextNode("Error: not all input is valid");
        invalid_process.appendChild(invalid_process_text);
        var elem = document.getElementById("survey");
        elem.insertBefore(invalid_process, elem.firstChild);
        return false;
    }
}
// This function finds the radion button input and determines that all of the questions were answered
function calcQuest() {
    event.preventDefault();
    var characterChoice = [0, 0, 0];
    // Array positions in characterChoice are: 
    // [0] = ren // [1] = paterson // [2] = sackler
    
    var radio_buttons = document.questionaire.elements['question1'];
	for (var x=0; x<radio_buttons.length; x++) {
		if(radio_buttons[x].checked) {
            answers[0] = radio_buttons[x].value;
            if (x == 0)
                characterChoice[0]++;
            else if (x == 1)
                characterChoice[1]++;
            else if (x == 2)
                characterChoice[2]++;
        }
    }
    radio_buttons = document.questionaire.elements['question2'];
	for (var x=0; x<radio_buttons.length; x++) {
		if(radio_buttons[x].checked) {
            answers[1] = radio_buttons[x].value;
            if (x == 0)
                characterChoice[2]++;
            else if (x == 1)
                characterChoice[0]++;
            else if (x == 2)
                characterChoice[1]++;
        }
    }
    radio_buttons = document.questionaire.elements['question3'];
	for (var x=0; x<radio_buttons.length; x++) {
		if(radio_buttons[x].checked) {
            answers[2] = radio_buttons[x].value;
            if (x == 0)
                characterChoice[1]++;
            else if (x == 1)
                characterChoice[2]++;
            else if (x == 2)
                characterChoice[0]++;
        }
    }
    if (answers[0] == undefined || answers[1] == undefined || answers[2] == undefined) {
        resetRadios();
        var invalid_process = document.createElement("h3");
        invalid_process.className = "error";
        invalid_process_text = document.createTextNode("Please answer all questions.");
        invalid_process.appendChild(invalid_process_text);
        var elem = document.getElementById("questionaire");
        elem.insertBefore(invalid_process, elem.firstChild);
    }
    else if (characterChoice[0] >= characterChoice[2] && characterChoice[0] > characterChoice[1])
        displayBadge("KYLO REN");
    else if (characterChoice[1] >= characterChoice[0] && characterChoice[1] > characterChoice[2])
        displayBadge("PATERSON");
    else if (characterChoice[2] >= characterChoice[1] && characterChoice[2] > characterChoice[0])
        displayBadge("ADAM SACKLER");
    else
        displayBadge("PHILLIP ALTMAN")
}
// This function resets all of the radio questions if the user submitted without answering them. 
function resetRadios() {
    var radio_buttons = document.questionaire.elements['question1'];
	for (var x=0; x<radio_buttons.length; x++) {
		radio_buttons[x].checked = false;
    }
    radio_buttons = document.questionaire.elements['question2'];
	for (var x=0; x<radio_buttons.length; x++) {
		radio_buttons[x].checked = false;
    }
    radio_buttons = document.questionaire.elements['question3'];
	for (var x=0; x<radio_buttons.length; x++) {
		radio_buttons[x].checked = false;
    }
}
// This function determines which badge based on the argument sent from calcQuest
function displayBadge(badge) {
    event.preventDefault();
    // elem is used throughout this function to add all of the elements linearly. 
    var elem = document.getElementById("questionaire");
    elem.parentNode.removeChild(elem);
    elem = document.getElementById("column-left");

    var image =  document.createElement("img");
    var heading = document.createElement("h1");
    var text = document.createTextNode(badge);
    heading.appendChild(text);
    elem.appendChild(heading);
    elem.appendChild(image);

    var caption = document.createElement("a");
    var caption_text = document.createTextNode("");
    caption.title = "Click to follow";
    caption.target = "_blank";
    caption.appendChild(caption_text);
    elem.appendChild(caption);

    var user_data = document.createElement("p");
    // user is anonymous, display ANON
    if (user_input.anon) {
        var user_data_text = document.createTextNode("Congratulations ANON!");
    }
    else {
        // user is non anonymous, display their info
        var user_data_text = document.createTextNode("Congratulations " + user_input.first_name + 
        " " + user_input.last_name + "!");
        user_data.appendChild(user_data_text);

        var line_break = document.createElement("br");
        user_data.appendChild(line_break);

        user_data_text = document.createTextNode("Email: " + user_input.email);
        user_data.appendChild(user_data_text);

        var line_break = document.createElement("br");
        user_data.appendChild(line_break);

        user_data_text = document.createTextNode("Phone: " + user_input.tel);
        user_data.appendChild(user_data_text);

        var line_break = document.createElement("br");
        user_data.appendChild(line_break);

        user_data_text = document.createTextNode("Student: " + user_input.sulley);
    }
    user_data.appendChild(user_data_text);
    var line_break = document.createElement("br");
    user_data.appendChild(user_data_text);
    var line = document.createElement("hr");
    user_data.appendChild(line);
    elem.appendChild(user_data);

    var para = document.createElement("p");
    // determine from badge which character to display in the image and their info. 
    if (badge == "KYLO REN") {
        caption_text.nodeValue = "https://students.cah.ucf.edu/~aa889461/dig3716c/assignment2/img/ren.jpg";
        caption.href = "https://students.cah.ucf.edu/~aa889461/dig3716c/assignment2/img/ren.jpg";
        image.src = 'img/ren.jpg';
        var para_text = document.createTextNode("You got Kylo Ren! The intimate Supreme Leader" +
        " would take you to his house on your first date. Perhaps be wed at the Skywalker Vineyard,"
        + " and would honeymoon at the red light district in Amsterdam.");
    }
    else if (badge == "PATERSON") {
        caption_text.nodeValue = "https://students.cah.ucf.edu/~aa889461/dig3716c/assignment2/img/paterson.jpg";
        caption.href = "https://students.cah.ucf.edu/~aa889461/dig3716c/assignment2/img/paterson.jpg";
        image.src = 'img/paterson.jpg';
        var para_text = document.createTextNode("You got Paterson, the poetic, artistic bus driver from New Jersey." +
        " On your first date, he would follow normal conventions of going to a restaurant. Paterson is an old soul who"
        + " would enjoy a museum wedding and would honeymoon to the relaxing and romantic Napa Valley.");
    }
    else if (badge == "ADAM SACKLER") {
        caption_text.nodeValue = "https://students.cah.ucf.edu/~aa889461/dig3716c/assignment2/img/sackler.jpg";
        caption.href = "https://students.cah.ucf.edu/~aa889461/dig3716c/assignment2/img/sackler.jpg";
        
        image.src = 'img/sackler.jpg';
        var para_text = document.createTextNode("You got Adam Sackler, the odd boy next door. He doesn't really care "  +
        "what he does on the first date, he just wants to make you happy. That's why he wants to have a courthouse wedding " +
        "and stay at his home in New York for the honeymoon.");
    }
    else {
        caption_text.nodeValue = "https://students.cah.ucf.edu/~aa889461/dig3716c/assignment2/img/altman.jpg";
        caption.href = "https://students.cah.ucf.edu/~aa889461/dig3716c/assignment2/img/altman.jpg";
        
        image.src = 'img/altman.jpg';
        var para_text = document.createTextNode("You got Phillip Altman from This is Where I Leave You! That means you "  +
        "had a three way tie and instead get a perfect balance of Adam Driver. The wild child yet sensitive lover " +
        "to meet all of your needs.");
    }
    para.appendChild(para_text);
    elem.appendChild(para);

    var line = document.createElement("hr");
    elem.appendChild(line);

    // Add the users answers to the questions at the bottom
    var questionH4 = document.createElement("h4");
    var questionH4_text = document.createTextNode("Your answers: ");
    questionH4.appendChild(questionH4_text);
    elem.appendChild(questionH4);
    var ul_element = document.createElement("ul");
    var li_element = document.createElement("li");
    var li_text = document.createTextNode(answers[0]);
    li_element.appendChild(li_text);
    ul_element.appendChild(li_element);
    var li_element = document.createElement("li");
    var li_text = document.createTextNode(answers[1]);
    li_element.appendChild(li_text);
    ul_element.appendChild(li_element);
    var li_element = document.createElement("li");
    var li_text = document.createTextNode(answers[2]);
    li_element.appendChild(li_text);
    ul_element.appendChild(li_element);

    elem.appendChild(ul_element);
}
// load listeners at the beginning
window.addEventListener("load", setVisibility, false);
window.addEventListener("load", setUpForm, false);