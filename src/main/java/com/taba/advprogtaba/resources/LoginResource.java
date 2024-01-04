package com.taba.advprogtaba.resources;

import com.taba.advprogtaba.services.LoginService;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/login")
public class LoginResource {

    private final LoginService loginService = new LoginService();

    @POST
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Produces(MediaType.APPLICATION_JSON)
    public Response validateLogin(@FormParam("username") String username,
            @FormParam("password") String password,
            @Context HttpServletRequest request) {
        
        String validationResult = loginService.validateLogin(username, password);

        if ("Success".equals(validationResult)) {
            HttpSession session = request.getSession();
            session.setAttribute("username", username); // Store the username in session
            return Response.ok().entity("{\"status\":\"success\"}").build();
        } else {
            return Response.status(Response.Status.UNAUTHORIZED).entity("{\"status\":\"failed\", \"message\":\"" + validationResult + "\"}").build();
        }
    }
}
