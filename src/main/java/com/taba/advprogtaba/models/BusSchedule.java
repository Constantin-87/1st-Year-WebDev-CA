package com.taba.advprogtaba.models;

import java.time.LocalDate;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class BusSchedule {
    private LocalDate date;
    private String route;
    private int availableTickets;

    public BusSchedule() {
    }
    
    public BusSchedule(LocalDate date, String route, int availableTickets) {
        this.date = date;
        this.route = route;
        this.availableTickets = availableTickets;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getRoute() {
        return route;
    }

    public void setRoute(String route) {
        this.route = route;
    }

    public int getAvailableTickets() {
        return availableTickets;
    }

    public void setAvailableTickets(int availableTickets) {
        this.availableTickets = availableTickets;
    }
}
