package com.taba.advprogtaba.services;

import com.taba.advprogtaba.DataAccess.DataAccess;
import com.taba.advprogtaba.models.Passenger;
import java.time.LocalDate;
import java.util.regex.Pattern;

public class RegistrationService {

    private final DataAccess dataAccess;
    
    // Regex patterns
    private final Pattern namePattern = Pattern.compile("^[a-zA-Z]{2,15}$");
    private final Pattern usernamePattern = Pattern.compile("^.{2,15}$");
    private final Pattern passwordPattern = Pattern.compile("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,15}$");

    public RegistrationService() {
        // Retrieve the singleton instance of DataAccess
        this.dataAccess = DataAccess.getInstance();
    }

    // Method to register a new passenger
    public String registerPassenger(Passenger passenger) {
        
        // Validate fields
        if (!namePattern.matcher(passenger.getName()).matches() ||
            !namePattern.matcher(passenger.getSurname()).matches() ||
            !usernamePattern.matcher(passenger.getUsername()).matches() ||
            !passwordPattern.matcher(passenger.getPassword()).matches() ||
            !isValidDateOfBirth(passenger.getDateOfBirth()) ||
            passenger.getAge() < 0 || passenger.getAge() > 120 ||
            (passenger.getGender() == null || passenger.getGender().isEmpty())) {
            
            return "Invalid input data";
        }
        
        // Directly call DataAccess to register the passenger
        boolean isRegistered = dataAccess.registerPassenger(passenger);

        if (isRegistered) {
            return "Successfully registered";
        } else {
            return "Passenger already exists";
        }
    }
    
    private boolean isValidDateOfBirth(LocalDate dob) {
        int currentYear = LocalDate.now().getYear();
        int dobYear = dob.getYear();
        return dobYear <= currentYear && dobYear >= currentYear - 120;
    }
}
