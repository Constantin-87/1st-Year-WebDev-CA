function validateLogin() {
    var xhr = new XMLHttpRequest();
    var url = "/api/login";

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {

            if (xhr.status === 200) {
                window.location.href = 'menu.jsp';
            } else {
                var messageArea = document.getElementById("messageArea");
                messageArea.style.display = "block"; // Make the message area visible
                var response = JSON.parse(xhr.responseText);
                messageArea.value = "Login failed: " + response.message; // Display error message
            }
        }
    };

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var data = "username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password);

    xhr.send(data);
}