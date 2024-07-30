import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Flights = () => {
  const [data, setData] = useState([]);
  const [currentFlight, setCurrentFlight] = useState(null);
  const [flights, setFlights] = useState([]);
  const [index, setIndex] = useState(-1);

  const getAllFlights = async () => {
    const response = await axios.get(
      "http://localhost:8080/flights/getflights"
    );
    setData(response.data.data);
  };

  useEffect(() => {
    getAllFlights();

    const fetchInterval = setInterval(() => {
      getAllFlights();
    }, 10000); 

    return () => clearInterval(fetchInterval);
  }, []);

  useEffect(() => {
    if (data.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % data.length;
        setCurrentFlight(data[newIndex]);
        setFlights((prevFlights) => {
          const updatedFlights = [...prevFlights, data[newIndex]];
          if (updatedFlights.length > 30) {
            return updatedFlights.slice(-30);
          }
          return updatedFlights;
        });
        return newIndex;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [data]);

  const navigate = useNavigate();

  function convertTo24HourFormat(isoDateString) {
    const date = new Date(isoDateString);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    return `${formattedHours}:${formattedMinutes}`;
  }

  return (
    <div className="p-6 min-h-[100vh]">
      <div className="font-thin text-2xl flex justify-center my-3 md:text-4xl">
        Get all flight information in one go!
      </div>
      <div className="flex flex-col bg-gray-100 rounded-xl shadow-xl p-2 w-full lg:w-[800px] m-auto">
        {data &&
          data.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                navigate("/flights/info/" + item._id);
              }}
              className="flex cursor-pointer hover:bg-blue-900 transition-all duration-300 hover:text-white justify-between gap-3 p-2 rounded-xl items-center"
            >
              <div>{item.flightNumber}</div>
              <div>{item.airline}</div>
              <div>{item.arrivalGate}</div>
              <div>{item.departureGate}</div>
              <div>{convertTo24HourFormat(item.scheduled_departureTime)}</div>
              <div>{convertTo24HourFormat(item.scheduled_arrivalTime)}</div>
              {item.status === "On Time" ? (
                <div className="bg-green-300 px-2">On Time</div>
              ) : item.status === "Delayed" ? (
                <div className="bg-orange-300 px-2">Delayed</div>
              ) : (
                <div className="bg-red-500 px-2">Cancelled</div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Flights;
