package com.taba.advprogtaba.models;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class TicketRequest {

    private String route;
    private String date;

    public TicketRequest() {
    }

    public TicketRequest(String route, String date) {
        this.route = route;
        this.date = date;
    }

    public String getRoute() {
        return route;
    }

    public void setRoute(String route) {
        this.route = route;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

}
