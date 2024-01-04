package com.taba.advprogtaba.services;

import com.taba.advprogtaba.DataAccess.DataAccess;
import com.taba.advprogtaba.models.Passenger;

public class LoginService {

    private final DataAccess dataAccess;

    public LoginService() {
        this.dataAccess = DataAccess.getInstance();
    }

    public String validateLogin(String username, String password) {
        Passenger registeredPassenger = dataAccess.getRegisteredPassenger(username);
        if (registeredPassenger == null) {
            return "No registered passenger found with username: " + username;
        }
        if (!registeredPassenger.getPassword().equals(password)) {
            return "Incorrect password";
        }
        return "Success";
    }

}
