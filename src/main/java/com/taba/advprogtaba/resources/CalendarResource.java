package com.taba.advprogtaba.resources;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.taba.advprogtaba.models.BusSchedule;
import com.taba.advprogtaba.services.CalendarService;
import com.fasterxml.jackson.databind.ObjectMapper;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/busschedule")
public class CalendarResource {

    private final CalendarService calendarService = new CalendarService();

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getBusSchedules() {
        List<BusSchedule> formattedSchedules = calendarService.getFormattedBusSchedules();
        String json = convertToJson(formattedSchedules);
        return Response.ok(json, MediaType.APPLICATION_JSON).build();
    }

    private String convertToJson(List<BusSchedule> schedules) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            return mapper.writeValueAsString(schedules);
        } catch (JsonProcessingException e) {
            System.out.println("Severe: Exception in reserveTicket: " + e.getMessage());
            return null;
        }
    }
}
