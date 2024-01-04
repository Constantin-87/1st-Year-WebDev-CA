<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <title>Main Menu</title>        
        <link rel="stylesheet" type="text/css" href="styles.css">
        <%
            String username = (String) session.getAttribute("username");
            if (username == null) {
                // Redirect to login page if not logged in
                response.sendRedirect("index.jsp");
                return;
            }
        %>
    </head>
    <body data-username="<%= username %>">
        <div class="banner">
            <h2>Banner</h2>
        </div>
        <div class="button-row">
            <button id="bookTicketBtn" class="button">Book Ticket</button>
            <button id="bookedTicketsBtn" class="button">Already Booked Tickets</button>
            <a href="index.jsp" class="button">Back to Login</a>
        </div>
        <div class="content">
            <div id="bookTicket" class="section book-ticket-container">
                <div class="route-buttons">
                    <!-- Buttons for each route -->
                    <button class="route-button">Dublin-Galway</button>
                    <button class="route-button">Dublin-Cork</button>
                    <button class="route-button">Dublin-Limerick</button>
                    <button class="route-button">Galway-Dublin</button>
                    <button class="route-button">Cork-Dublin</button>
                    <button class="route-button">Limerick-Dublin</button>
                </div>

                <div id="calendar-Dublin-Galway" class="calendar-container" style="display: none;"></div>
                <div id="calendar-Dublin-Cork" class="calendar-container" style="display: none;"></div>
                <div id="calendar-Dublin-Limerick" class="calendar-container" style="display: none;"></div>
                <div id="calendar-Galway-Dublin" class="calendar-container" style="display: none;"></div>
                <div id="calendar-Cork-Dublin" class="calendar-container" style="display: none;"></div>
                <div id="calendar-Limerick-Dublin" class="calendar-container" style="display: none;"></div>

                <div><button id="buyTicketBtn" class="button">Buy Ticket</button></div>
            </div>

            <div id="bookedTickets" class="section" style="display: none;">
                <!-- Content for already booked tickets -->
            </div>
        </div>
        <script src="menu.js" type="text/javascript"></script>        
    </body>
</html>
