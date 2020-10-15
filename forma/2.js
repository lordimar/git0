window.onload = () => {
    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    const INPUT = document.querySelector('input');

    function validateEmail(value) {
        return EMAIL_REGEXP.test(value);
    }

    function updateInput() {
        if (validateEmail(INPUT.value)) INPUT.style.borderColor = 'green';
        else {
            INPUT.style.borderColor = 'red';
        }

    }

    INPUT.addEventListener('input', updateInput);

    document.getElementById('name').onkeydown = function (e) {
        return !(/^[0-9 ]$/.test(e.key));  
    }
    document.getElementById('number').onkeydown = function (e) {
        return !(/^[А-Яа-яA-Za-z ]$/.test(e.key));  
    }
}

function validate() {
    var name = document.getElementById("name");
    var number = document.getElementById("number");
    if (name.value.length<2) {
        name.style.border = "2px solid red";
        // return false;
    } else {
        name.style.border = "2px solid green";
        
    }
   
    if (!number.value) {
        number.style.border = "2px solid red";
        return false;
    } else {
        number.style.border = "2px solid green";
    }
    return true;

    
}