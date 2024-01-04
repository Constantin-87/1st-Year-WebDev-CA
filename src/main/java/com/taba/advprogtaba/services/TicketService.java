package com.taba.advprogtaba.services;

import com.taba.advprogtaba.DataAccess.DataAccess;
import com.taba.advprogtaba.models.Passenger;
import com.taba.advprogtaba.models.Ticket;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Random;

public class TicketService {

    private final DataAccess dataAccess;
    private final DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("d/M/yyyy");

    public TicketService(DataAccess dataAccess) {
        this.dataAccess = dataAccess;
    }

    // Method to reserve a ticket
    public boolean reserveTicket(String route, String dateString, String username) {
        try {
            LocalDate date = LocalDate.parse(dateString, dateFormatter);
            Passenger passenger = dataAccess.getRegisteredPassenger(username);
            if (passenger != null) {
                int availableTickets = dataAccess.getAvailableTickets(route, date);
                if (availableTickets > 0) {
                    dataAccess.updateAvailableTickets(route, date, availableTickets - 1);
                    int ticketNumber = generateTicketNumber();
                    Ticket ticket = new Ticket(ticketNumber, date, passenger, route);
                    dataAccess.storeTicket(username, ticket);
                    System.out.println("Ticket reserved successfully");
                    return true; // Ticket reserved successfully
                }
            }
            System.out.println("No tickets available or passenger not registered");
            return false; // No tickets available or passenger not registered
        } catch (Exception e) {
            System.out.println("Exception occurred: " + e.getMessage());
            return false; // Handle exception and return false
        }
    }

    private int generateTicketNumber() {
        return new Random().nextInt(1000);
    }

    public List<Ticket> getBookedTickets(String username) {
        return dataAccess.getTicketsForPassenger(username);
    }
}
