function submitForm() {
    
    if (!validateForm()) {
        return; // Stop the form submission if validation fails
    }
    
    var xhr = new XMLHttpRequest();
    var url = "/api/passengers";

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");

     xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            var messageArea = document.getElementById("messageArea");
            messageArea.style.display = "block";

            if (xhr.status === 201) {
                messageArea.value = xhr.responseText; // Display server response
                setTimeout(function() {
                    window.location.href = 'menu.jsp'; // Redirect after 2 seconds
                }, 2000);
            } else {
                messageArea.value = "Error: " + xhr.responseText; // Display error message
            }
        }
    };

    var data = JSON.stringify({
        "name": document.getElementById("name").value,
        "surname": document.getElementById("surname").value,
        "username": document.getElementById("username").value,
        "password": document.getElementById("password").value,
        "dateOfBirth": document.getElementById("dateOfBirth").value,
        "age": parseInt(document.getElementById("age").value),
        "gender": document.getElementById("gender").value
    });

    xhr.send(data);
}

function validateForm() {
    var name = document.getElementById("name").value;
    var surname = document.getElementById("surname").value;
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var dob = document.getElementById("dateOfBirth").value;
    var age = parseInt(document.getElementById("age").value);
    var gender = document.getElementById("gender").value;

    var nameRegex = /^[a-zA-Z]{2,15}$/;
    var usernameRegex = /^.{2,15}$/;
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;

    if (!name.match(nameRegex) || !surname.match(nameRegex)) {
        alert("Name and surname must be 2-15 characters long and contain only letters.");
        return false;
    }

    if (!username.match(usernameRegex)) {
        alert("Username must be 2-15 characters long.");
        return false;
    }

    if (!password.match(passwordRegex)) {
        alert("Password must be 8-15 characters long, include uppercase and lowercase letters, numbers, and special characters.");
        return false;
    }

    // Validate date of birth for reasonable year range
    var currentYear = new Date().getFullYear();
    var dobYear = new Date(dob).getFullYear();
    if (dobYear > currentYear || dobYear < currentYear - 120) {
        alert("Please enter a valid year for the date of birth (no later than current year and not more than 120 years ago).");
        return false;
    }

    if (isNaN(age) || age < 0 || age > 120) {
        alert("Age must be a number between 0 and 120.");
        return false;
    }

    if (!gender) {
        alert("Please select a gender.");
        return false;
    }

    return true;
}
