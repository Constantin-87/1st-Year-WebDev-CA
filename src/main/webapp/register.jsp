<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <title>Register</title>
        <link rel="stylesheet" type="text/css" href="styles.css">
        <script src="register.js" type="text/javascript"></script>
    </head>
    <body>
        <div class="container">
            <h2>Registration</h2>

            <!-- Text area for messages -->
            <textarea id="messageArea" readonly style="width: 100%; height: 50px; display: none;"></textarea><br>

            <form id="registrationForm">
                <label for="name">Name:</label>
                <input type="text" id="name" name="name"><br>

                <label for="surname">Surname:</label>
                <input type="text" id="surname" name="surname"><br>

                <label for="dateOfBirth">Date of Birth:</label>
                <input type="date" id="dateOfBirth" name="dateOfBirth" max="2024-12-31" min="1900-01-01"><br>

                <label for="age">Age:</label>
                <input type="number" id="age" name="age"><br>

                <label for="gender">Gender:</label>
                <select id="gender" name="gender">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select><br>

                <label for="username">Username:</label>
                <input type="text" id="username" name="username"><br>

                <label for="password">Password:</label>
                <input type="text" id="password" name="password"><br>

                <input type="button" value="Register" onclick="submitForm()">
            </form>
            <br>
            <a href="index.jsp" class="button">Back to Login</a>
        </div>
    </body>
</html>
