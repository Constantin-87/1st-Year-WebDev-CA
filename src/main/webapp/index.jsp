<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <title>Login</title>
        <link rel="stylesheet" type="text/css" href="styles.css">
        <script src="login.js" type="text/javascript"></script>
    </head>
    <body>
        <div class="container">
            <h2>Login</h2>

            <!-- Add a text area for messages -->
            <textarea id="messageArea" readonly style="width: 100%; height: 50px; display: none;"></textarea><br>

            <form id="loginForm">
                <label for="username">Username:</label>
                <input type="text" id="username" name="username"><br><br>

                <label for="password">Password:</label>
                <input type="password" id="password" name="password"><br><br>

                <input type="button" value="Login" onclick="validateLogin()">
            </form>
            <br>
            <a href="register.jsp" class="button">Register</a>
        </div>
    </body>
</html>
