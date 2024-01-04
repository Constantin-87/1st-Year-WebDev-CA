package com.taba.advprogtaba.resources;

import com.taba.advprogtaba.models.Passenger;
import com.taba.advprogtaba.services.RegistrationService;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/passengers")
public class RegistrationResource {

    private final RegistrationService passengerService = new RegistrationService();

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response registerPassenger(Passenger passenger,
            @Context HttpServletRequest request) {
        String result = passengerService.registerPassenger(passenger);

        if (result.contains("Successfully registered")) {
            HttpSession session = request.getSession();
            session.setAttribute("username", passenger.getUsername()); // Store the username in session
            return Response.status(Response.Status.CREATED).entity(result).build();
        } else if (result.contains("Invalid input data")) {
            return Response.status(Response.Status.CONFLICT).entity(result).build();
        } else if (result.contains("Passenger already exists")) {
            return Response.status(Response.Status.CONFLICT).entity(result).build();
        } else {
            // For unexpected cases
            return Response.status(Response.Status.BAD_REQUEST).entity("Unexpected error occurred").build();
        }
    }
}
