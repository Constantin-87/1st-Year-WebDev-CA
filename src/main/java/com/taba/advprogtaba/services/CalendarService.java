package com.taba.advprogtaba.services;

import com.taba.advprogtaba.DataAccess.DataAccess;
import com.taba.advprogtaba.models.BusSchedule;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class CalendarService {

    public List<BusSchedule> getFormattedBusSchedules() {
        DataAccess dataAccess = DataAccess.getInstance();
        Map<String, Integer> rawBusSchedules = dataAccess.getRawBusSchedules();
        List<BusSchedule> formattedSchedules = new ArrayList<>();

        for (Map.Entry<String, Integer> entry : rawBusSchedules.entrySet()) {
            String[] parts = entry.getKey().split("-");
            String route = parts[0] + "-" + parts[1];
            String datePart = parts[2] + "-" + parts[3] + "-" + parts[4];
            LocalDate date = LocalDate.parse(datePart);
            int availableTickets = entry.getValue();

            formattedSchedules.add(new BusSchedule(date, route, availableTickets));
        }
        return formattedSchedules;
    }
}
