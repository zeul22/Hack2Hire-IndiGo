import { SignInButton, useUser } from "@clerk/clerk-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const FlightInfo = () => {
  const param = useParams();
  const [data, setdata] = useState([]);
  const { user, isSignedIn } = useUser();

  const fetchFlightData = async () => {
    const response = await axios.get(
      "http://localhost:8080/flights/getflight/" + param.id
    );
    if (!response) {
      console.log("Something is wrong");
    }
    setdata(response.data.data);
  };
  useEffect(() => {
    fetchFlightData();
  }, []);
  return (
    <div className="flex flex-col gap-6 h-[100vh]">
      {!isSignedIn && (
        <div>
          <div className="mt-6 font-thin text-2xl md:text-5xl  xl:text-6xl flex items-center justify-center">
            Get regular updates about your flight!
          </div>
          <div className="flex justify-center ">
            <div className="p-2 w-[150px] cursor-pointer hover:bg-blue-900 transition-all duration-300  text-center bg-blue-800 text-white rounded-md">
              <SignInButton />
            </div>
          </div>
        </div>
      )}
      {data ? (
        <div className=" flex items-center flex-col  justify-center mt-16 ">
          <div className="text-center text-3xl md:text-6xl font-thin w-full px-6 md:w-auto ">
            {" "}
            <div className="bg-blue-800 text-white p-3">
              {" "}
              Flight Information
            </div>
            <div className="flex flex-col gap-2  bg-gray-100 p-2 w-full">
              <div className="font-bold text-2xl md:text-4xl flex justify-between px-2">
                <div>Flight Number</div>
                <div>{data.flightNumber}</div>
              </div>
              <hr />
              <div className="font-bold text-2xl md:text-4xl flex justify-between px-2">
                <div>Departure Gate</div>
                <div>{data.departureGate}</div>
              </div>
              <hr />
              <div className="font-bold text-2xl md:text-4xl flex justify-between px-2">
                <div>Flight Status</div>
                <div>{data.status}</div>
              </div>
              <hr />
            </div>
          </div>
        </div>
      ) : (
        <div>No relevant information</div>
      )}
    </div>
  );
};

export default FlightInfo;
