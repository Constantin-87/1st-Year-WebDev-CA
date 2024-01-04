package com.taba.advprogtaba.resources;

import com.taba.advprogtaba.DataAccess.DataAccess;
import com.taba.advprogtaba.models.Ticket;
import com.taba.advprogtaba.models.TicketRequest;
import com.taba.advprogtaba.services.TicketService;
import java.util.List;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.core.Context;

@Path("/tickets")
public class TicketResource {

    private final TicketService ticketService;

    public TicketResource() {
        this.ticketService = new TicketService(DataAccess.getInstance()); // Use DataAccess singleton
    }

    @POST
    @Path("/reserve")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response reserveTicket(TicketRequest ticketRequest, @Context HttpServletRequest request) {
        try {
            if (ticketService == null || ticketRequest == null) {
                System.out.println("Error: TicketService or TicketRequest is null");
                return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("{\"message\": \"Service unavailable\"}").build();
            }

            String route = ticketRequest.getRoute();
            String date = ticketRequest.getDate();
            HttpSession session = request.getSession(false);
            String username = session != null ? (String) session.getAttribute("username") : null;

            if (username == null || username.isEmpty()) {
                System.out.println("Warning: Username not found in session");
                return Response.status(Response.Status.BAD_REQUEST).entity("{\"message\": \"Username not found in the session\"}").build();
            }

            boolean ticketReserved = ticketService.reserveTicket(route, date, username);

            if (ticketReserved) {
                System.out.println("Info: Ticket reserved successfully for user: " + username);
                return Response.status(Response.Status.CREATED).entity("{\"message\": \"Ticket reserved successfully\"}").build();

            } else {
                System.out.println("Warning: Ticket reservation failed for user: " + username);
                return Response.status(Response.Status.BAD_REQUEST).entity("{\"message\": \"Ticket reservation failed\"}").build();
            }
        } catch (Exception e) {
            System.out.println("Severe: Exception in reserveTicket: " + e.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("{\"message\": \"Internal server error\"}").build();
        }
    }

    @GET
    @Path("/bookedTickets/{username}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getBookedTickets(@PathParam("username") String username, @Context HttpServletRequest request) {
        try {
            System.out.println("Received a request to get booked tickets for user: " + username);

            HttpSession session = request.getSession(false);
            String sessionUsername = session != null ? (String) session.getAttribute("username") : null;

            if (sessionUsername == null || !sessionUsername.equals(username)) {
                System.out.println("Warning: Unauthorized access to getBookedTickets by user: " + sessionUsername);
                return Response.status(Response.Status.UNAUTHORIZED).entity("Unauthorized access").build();
            }

            List<Ticket> tickets = ticketService.getBookedTickets(username);
            return Response.status(Response.Status.OK).entity(tickets).build();
        } catch (Exception e) {
            System.out.println("Severe: Exception in getBookedTickets: " + e.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Internal server error").build();
        }
    }
}
