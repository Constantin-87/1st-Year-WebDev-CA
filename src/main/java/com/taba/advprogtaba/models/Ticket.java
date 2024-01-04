package com.taba.advprogtaba.models;
import java.time.LocalDate;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Ticket {
    private int ticketNumber;
    private Passenger passenger;
    private LocalDate ticketDate;    
    private String route; 
    
    public Ticket() {
    }  
    
    public Ticket(int ticketNumber, LocalDate ticketDate, Passenger passenger, String route) {
        this.ticketNumber = ticketNumber;
        this.passenger = passenger;
        this.ticketDate = ticketDate;
        this.route = route;
    }  

    public LocalDate getTicketDate() {
        return ticketDate;
    }

    public void setTicketDate(LocalDate ticketDate) {
        this.ticketDate = ticketDate;
    }
    
    public int getTicketNumber() {
        return ticketNumber;
    }

    public void setTicketNumber(int ticketNumber) {
        this.ticketNumber = ticketNumber;
    }

    public Passenger getPassenger() {
        return passenger;
    }

    public void setPassenger(Passenger passenger) {
        this.passenger = passenger;
    }

    public String getRoute() {
        return route;
    }

    public void setRoute(String route) {
        this.route = route;
    }
}
