package com.taba.advprogtaba.DataAccess;

import com.taba.advprogtaba.models.Passenger;
import com.taba.advprogtaba.models.Ticket;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.Year;
import java.util.*;

public class DataAccess {

    private static DataAccess instance;

    //Create bus routes
    private static final String[] ROUTES = {"Dublin-Galway", "Dublin-Limerick", "Dublin-Cork", "Galway-Dublin", "Limerick-Dublin", "Cork-Dublin"};
    //Set the size of the bus
    private static final int SEAT_LIMIT = 20;

    // HashMaps to hold buses schedule, passengers, and tickets data
    private Map<String, Integer> busSchedules;
    private Map<String, Passenger> registeredPassengers;
    private Map<String, List<Ticket>> passengerTickets;

    // Private constructor for Singleton
    private DataAccess() {
        busSchedules = new HashMap<>();
        registeredPassengers = new HashMap<>();
        passengerTickets = new HashMap<>();
        initializeScheduleForYear(2024);
    }

    // Singleton instance access method
    public static synchronized DataAccess getInstance() {
        if (instance == null) {
            instance = new DataAccess();
        }
        return instance;
    }

    // Initialize bus schedules
    private void initializeScheduleForYear(int year) {
        LocalDate startDate = LocalDate.ofYearDay(year, 1);
        LocalDate endDate = LocalDate.ofYearDay(year, Year.of(year).length());

        for (LocalDate date = startDate; date.isBefore(endDate); date = date.plusDays(1)) {
            for (String route : ROUTES) {
                String busIdentifier = route + "-" + date.toString();
                if (date.getDayOfWeek() == DayOfWeek.MONDAY || date.getDayOfWeek() == DayOfWeek.WEDNESDAY || date.getDayOfWeek() == DayOfWeek.FRIDAY) {
                    busSchedules.put(busIdentifier, SEAT_LIMIT - new Random().nextInt(SEAT_LIMIT + 1)); // Randomize available tickets
                } else {
                    busSchedules.put(busIdentifier, -1); // Mark as not running
                }
            }
        }
    }

    // Synchronized method to register a new passenger
    public synchronized boolean registerPassenger(Passenger passenger) {
        String username = passenger.getUsername();
        if (!registeredPassengers.containsKey(username)) {
            registeredPassengers.put(username, passenger);
            return true; // Registration successful
        }
        return false; // Username already exists
    }

    // Method to get a registered passenger
    public Passenger getRegisteredPassenger(String username) {
        return registeredPassengers.get(username);
    }

    // Synchronized method to get available tickets
    public synchronized int getAvailableTickets(String route, LocalDate date) {
        String busIdentifier = route + "-" + date.toString();
        return busSchedules.getOrDefault(busIdentifier, 0);
    }

    // Synchronized method to update the number of available tickets
    public synchronized boolean updateAvailableTickets(String route, LocalDate date, int newAvailableTickets) {
        String busIdentifier = route + "-" + date;

        if (newAvailableTickets >= 0 && newAvailableTickets <= SEAT_LIMIT) {
            busSchedules.put(busIdentifier, newAvailableTickets);
            return true; // Update successful
        }
        return false; // Update failed due to invalid ticket count
    }

    // Synchronized method to store a ticket for a passenger
    public synchronized void storeTicket(String username, Ticket ticket) {
        if (!passengerTickets.containsKey(username)) {
            passengerTickets.put(username, new ArrayList<>());
        }
        passengerTickets.get(username).add(ticket);
    }

    // Method to get raw bus schedules
    public synchronized Map<String, Integer> getRawBusSchedules() {
        return new HashMap<>(busSchedules); // Return a copy of the busSchedules map
    }

    public List<Ticket> getTicketsForPassenger(String username) {
        return passengerTickets.getOrDefault(username, Collections.emptyList());
    }
}
