const numGates = 15;
const numFlights = 30;

const weather = Math.floor(Math.random() * 5) + 1;
const crowd = Math.floor(Math.random() * 5) + 1;

let flights = [];

for (let i = 0; i < numFlights; i++) {
  flights.push({
    id: i + 1,
    gate: Math.floor(Math.random() * numGates) + 1,
    departureTime: Math.floor(Math.random() * 1440),
    arrivalTime: Math.floor(Math.random() * 1440),
  });
}

if (weather === 5) {
  flights.forEach((flight) => (flight.cancelled = true));
} else if (weather > 1 && weather < 4) {
  for (let i = 0; i < 3; i++) {
    flights[Math.floor(Math.random() * numFlights)].cancelled = true;
  }
}

if (crowd === 5) {
  for (let i = 0; i < 6; i++) {
    flights[Math.floor(Math.random() * numFlights)].delayed = 45;
  }
} else if (crowd > 1 && crowd < 4) {
  for (let i = 0; i < 3; i++) {
    flights[Math.floor(Math.random() * numFlights)].delayed = 45;
  }
} else if (crowd === 1) {
  flights[Math.floor(Math.random() * numFlights)].delayed = 45;
}

for (let i = 0; i < Math.ceil(numFlights * 0.05); i++) {
  flights[Math.floor(Math.random() * numFlights)].cancelled = true;
}

let gateSchedule = {};

flights.forEach((flight) => {
  if (!flight.cancelled) {
    if (!gateSchedule[flight.gate]) {
      gateSchedule[flight.gate] = [];
    }
    let conflict = gateSchedule[flight.gate].find(
      (scheduledFlight) =>
        (scheduledFlight.departureTime <= flight.departureTime &&
          scheduledFlight.arrivalTime >= flight.departureTime) ||
        (scheduledFlight.departureTime <= flight.arrivalTime &&
          scheduledFlight.arrivalTime >= flight.arrivalTime)
    );

    if (conflict) {
      let freeGate = Object.keys(gateSchedule).find(
        (gate) =>
          !gateSchedule[gate].find(
            (scheduledFlight) =>
              (scheduledFlight.departureTime <= flight.departureTime &&
                scheduledFlight.arrivalTime >= flight.departureTime) ||
              (scheduledFlight.departureTime <= flight.arrivalTime &&
                scheduledFlight.arrivalTime >= flight.arrivalTime)
          )
      );

      if (freeGate) {
        console.log(
          `Flight ${flight.id} moved from Gate ${flight.gate} to Gate ${freeGate}`
        );
        flight.gate = parseInt(freeGate);
        gateSchedule[freeGate].push(flight);
      } else {
        console.log(
          `Flight ${flight.id} at Gate ${flight.gate} delayed by 45 mins due to conflict`
        );
        flight.delayed = (flight.delayed || 0) + 45;
      }
    } else {
      gateSchedule[flight.gate].push(flight);
    }
  }
});

flights.forEach((flight) => {
  console.log(
    `Flight ${flight.id}: Gate ${flight.gate}, Departure Time ${
      flight.departureTime
    }, Arrival Time ${flight.arrivalTime}, Cancelled ${
      flight.cancelled ? "Yes" : "No"
    }, Delayed by ${flight.delayed || 0} mins`
  );
});
