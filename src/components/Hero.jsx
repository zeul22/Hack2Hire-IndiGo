import { SignInButton, useUser } from "@clerk/clerk-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { BaggageClaim, Check, MapPinned, ShipWheel } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [isFlight, setisFlight] = useState(false);
  const [input, setInput] = useState("");
  const [navinput, setnavinput] = useState([]);
  const [flights, setFlights] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [openBox, setopenBox] = useState(false);
  const { user, isSignedIn } = useUser();
  const [smsCheckbox, setsmsCheckbox] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/flights/getflights"
        );
        const data = response.data.data;
        setFlights(data);
      } catch (error) {
        console.error("Error fetching flight data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    gsap.fromTo(
      ".container",
      {
        opacity: 0,
        y: 100,
      },
      {
        opacity: 1,
        duration: 4,
        y: 0,
        scrollTrigger: {
          toggleActions: "restart pause reverse pause",
          trigger: ".container",
          start: "top bottom",
          end: "top bottom",
          scrub: 3,
        },
      }
    );

    gsap.fromTo(
      ".travel-Box-1",
      {
        opacity: 0,
        x: -1000,
      },
      {
        opacity: 1,
        duration: 1,
        ease: "power1.inOut",
        x: 0,
        stagger: 1,
        delay: 0.3,
        scrollTrigger: {
          toggleActions: "restart pause reverse pause",
          trigger: ".travel-Box-1",
          start: "top bottom",
          end: "top top",
          scrub: 4,
        },
      }
    );

    gsap.fromTo(
      ".container-text",
      {
        opacity: 0,
        scale: 50,
      },
      {
        opacity: 1,
        duration: 3,
        scale: 1,
        ease: "power1.inOut",
        scrollTrigger: {
          start: "top 60%",
          end: "top 50%",
          toggleActions: "restart pause reverse pause",
          trigger: ".container",
          scrub: 3,
        },
      }
    );
    gsap.fromTo(
      ".flight-img",
      {
        opacity: 0,
        x: 300,
      },
      {
        opacity: 1,
        x: 0,
      }
    );

    gsap.fromTo(
      ".text-first",
      {
        opacity: 0,
        x: -300,
      },
      { opacity: 1, x: 0, duration: 2, ease: "power4.inOut" }
    );
  }, []);

  const handleChange = (value) => {
    setopenBox(true);
    console.log(value);
    setInput(value);
    const filtered_data = flights.filter((flight) => {
      return (
        flight.flightNumber.includes(value) || flight.airline.includes(value)
      );
    });

    console.log(filtered_data);
    setFilteredData(filtered_data);
  };

  return (
    <div className="overflow-hidden">
      <div className="mx-12">
        <div className="text-first tracking-tighter font-thin text-4xl">
          Hi There, What would you like to use IndiGo for?
        </div>
        <div className=" flex mt-6  lg:w-[1200px]  items-center  m-auto justify-center  ">
          <div
            onClick={() => setisFlight(false)}
            className={`p-2 w-[50%] cursor-pointer rounded-tl-xl hover:bg-blue-900 hover:text-white transition-all duration-300 ${
              !isFlight ? "bg-blue-800 text-white" : ""
            }`}
          >
            Flight Status
          </div>
          <Link
            to={"/flights"}
            onClick={() => setisFlight(true)}
            className={`p-2 w-[50%] cursor-pointer rounded-tr-xl  hover:bg-blue-900 hover:text-white transition-all duration-300 ${
              isFlight ? "bg-blue-800 text-white" : ""
            }`}
          >
            Airport Status{" "}
          </Link>
        </div>
        <div
          className={` p-2 flex flex-col lg:w-[1200px]  items-center  m-auto justify-center  bg-gray-100  `}
        >
          <div className="flex gap-3"></div>
          <div className="relative p-2 flex gap-3 items-center justify-center">
            <input
              value={input}
              onChange={(e) => handleChange(e.target.value)}
              type="text"
              placeholder="Flight Number"
              className="p-2"
            />
            <div
              className={`absolute -bottom-[145px] h-[150px] overflow-y-auto flex flex-col gap-1 z-[10]  bg-white w-[265px] px-2 m-auto ${
                openBox ? "" : "hidden"
              }`}
            >
              {filteredData.map((item, index) => (
                <div
                  className={`hover:bg-gray-100   cursor-pointer `}
                  onClick={() => {
                    setopenBox(false);
                    setInput(item.flightNumber);
                    setnavinput(item);
                  }}
                  key={index}
                >
                  {item.flightNumber}
                </div>
              ))}
            </div>
          </div>
          <hr className="mt-2 border-blue-100" />
          {isSignedIn && (
            <div>
              <div className="flex items-center justify-center gap-2">
                <input
                  checked={smsCheckbox}
                  onChange={(e) => {
                    setsmsCheckbox(e.target.checked);
                  }}
                  type="checkbox"
                  name=""
                  id=""
                />
                <label
                  htmlFor=""
                  className="tracking-tighter font-light text-sm my-2"
                >
                  Notify Through SMS
                </label>
              </div>
            </div>
          )}
          <div className="flex items-center justify-center p-2">
            <button
              onClick={async () => {
                if (isSignedIn) {
                  console.log("User with Flight Registration happening!");
                  const response = await axios.post(
                    "http://localhost:8080/user/flightregister",
                    {
                      emailId: user.primaryEmailAddress.emailAddress,
                      flightId: navinput._id,
                    }
                  );
                  console.log(response);
                }
                if (isSignedIn && smsCheckbox) {
                  const response = await axios.post(
                    "http://localhost:8080/flights/flightinfo/notification",
                    {
                      phoneNum: user.primaryPhoneNumber.toString(),
                    }
                  );
                  console.log(response);
                }
                if (isSignedIn && emailCheckbox) {
                  await axios.post(
                    "http://localhost:8080/flights/flightinfo/notificationemail",
                    {
                      emailId: user.primaryEmailAddress.emailAddress,
                    }
                  );
                }

                navigate("/flights/info/" + navinput._id);
              }}
              className="p-2 bg-blue-800 hover:bg-blue-900 transition-all duration-300 text-white rounded-md"
            >
              Submit
            </button>
          </div>
        </div>
        <div className="relative lg:w-[800px] m-auto h-[400px] md:h-[600px] rounded-full my-12 bg-center bg-[url('https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]  ">
          <img
            src="./indigo.png"
            className="flight-img absolute bottom-0 md:bottom-none h-[400px]  md:h-[600px] md:w-[1200px]  w-[1000px]"
            alt=""
          />
        </div>

        {/* ---------- */}
        <div className="m-12 lg:m-auto flex flex-col lg:w-[1200px] shadow-xl rounded-md">
          <div className="flex gap-2 p-3 items-center justify-center">
            <div className="hover:border-b hover:border-blue-900 transition-all duration-300 cursor-pointer">
              Economy
            </div>
            <div className="hover:border-b hover:border-blue-900 transition-all duration-300 cursor-pointer">
              Business
            </div>
            <div className="hover:border-b hover:border-blue-900 transition-all duration-300 cursor-pointer">
              Premium
            </div>
          </div>
          <hr className="mx-12  border-blue-100 " />
          <div className="flex flex-col md:flex-row gap-3 mx-6 p-3 justify-between">
            <div className="flex gap-2 items-center">
              <div className="p-3 bg-gray-100 rounded-full">
                <MapPinned />
              </div>
              <div className="font-thin">Location</div>
            </div>
            <div className="flex gap-2 items-center">
              <div className="p-3 bg-gray-100 rounded-full">
                <ShipWheel />
              </div>
              <div className="font-thin">Travelers</div>
            </div>
            <div className="flex gap-2 items-center">
              <div className="p-3 bg-gray-100 rounded-full">
                <BaggageClaim />
              </div>
              <div className="font-thin">Check-In</div>
            </div>
            <div className="flex gap-2 items-center">
              <div className="p-3 bg-gray-100 rounded-full">
                <Check />
              </div>
              <div className="font-thin">Check-Out</div>
            </div>
          </div>
        </div>

        {/* ---------- */}

        <div className="travelBox text-3xl lg:mt-16 tracking-wider font-mono flex items-center justify-center">
          TRAVEL SUPPORT
        </div>

        {/* Sub Part */}
        <div className="text-3xl tracking-widest  p-2 flex justify-center">
          <div className="travelBox p-2 rounded-xl uppercase">
            Plan & Travel with confidence
          </div>
        </div>

        {/* ----------------- */}

        <div className="h-auto min-h-[80vh] p-6 lg:p-0 bg-gray-100">
          <div className="flex flex-col justify-between items-center">
            <div className="p-2 w-full">
              <div className="flex flex-col lg:flex-row p-6 w-full justify-between items-center">
                <div className="text-4xl mb-2 lg:mb-0 lg:text-6xl font-semibold">
                  Travel to make memories
                </div>
                <a
                  target="_blank"
                  href="https://www.goindigo.in/"
                  className="p-3 hover:bg-blue-600 transition-all duration-300 cursor-pointer hover:border-white hover:text-white border border-gray-800 rounded-full"
                >
                  View All
                </a>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-24 justify-center">
              <div className="travel-Box-1 h-[50vh] w-[300px] shadow-xl flex flex-col justify-center items-center gap-3 rounded-full bg-white">
                <div className="bg-blue-600 p-6 rounded-full">
                  <BaggageClaim />
                </div>
                <div className="text-3xl">Book</div>
                <div className="text-sm p-6 flex items-center text-center">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptate possimus quis cum quod. Ipsa id sed quisquam dolorum
                  commodi impedit?
                </div>
              </div>
              <div className="travel-Box-1 h-[50vh] w-[300px] shadow-xl flex flex-col justify-center items-center gap-3 rounded-full bg-white">
                <div className="bg-blue-600 p-6 rounded-full">
                  <BaggageClaim />
                </div>
                <div className="text-3xl">Travel</div>
                <div className="text-sm p-6 flex items-center text-center">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptate possimus quis cum quod. Ipsa id sed quisquam dolorum
                  commodi impedit?
                </div>
              </div>
              <div className="travel-Box-1 h-[50vh] w-[300px] shadow-xl flex flex-col justify-center items-center gap-3 rounded-full bg-white">
                <div className="bg-blue-600 p-6 rounded-full">
                  <BaggageClaim />
                </div>
                <div className="text-3xl">Save More</div>
                <div className="text-sm p-6 flex items-center text-center">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptate possimus quis cum quod. Ipsa id sed quisquam dolorum
                  commodi impedit?
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Last Part */}
      </div>

      <div className="relative h-[100vh] bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1656261538631-3e1d3964763b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]">
        <div className="container-text text-white font-extrabold  opacity-80 bottom-[60%] md:bottom-[50%] text-2xl md:text-3xl lg:text-4xl  left-20  md:left-32 left-30 absolute  tracking-tighter ">
          Find exclusive offers <div>the best deals available for you.</div>
        </div>
        <div className="absolute bottom-[35%] left-[40%] xl:left-[150px] xl:bottom-[45%]  mt-6 flex flex-col items-center justify-center">
          {!isSignedIn ? (
            <div className="p-2 w-[100px] xl:w-[200px] cursor-pointer items-center text-center hover:bg-blue-900 transition-all duration-300 bg-blue-800 text-white rounded-md">
              <SignInButton />
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div className="xl:hidden">
          <div className=" container absolute border top-6 left-[20px] 2xl:left-[30px]  h-[120px] w-[120px] md:h-[200px] md:w-[200px]   justify-center rounded-full flex flex-col text-center text-white">
            <div className="font-extrabold text-2xl  md:text-[40px]">2024</div>
            <div className="font-bold text-[12px] md:text-[15px]">
              Airline of the Year
            </div>
            <div className="font-bold text-[8px] md:text-[12px]">
              Air Transport Awards
            </div>
          </div>
          <div className=" container absolute border top-6 left-[180px] md:left-[350px] h-[120px] w-[120px] md:h-[200px] md:w-[200px] justify-center rounded-full flex flex-col text-center text-white">
            <div className="font-extrabold text-2xl  md:text-[40px]">2024</div>
            <div className="font-bold text-[12px] md:text-[15px]">
              Airline of the Year
            </div>
            <div className="font-bold text-[8px] md:text-[12px]">
              Travel & Tour World
            </div>
          </div>
          <div className=" container absolute border top-6 left-[340px] md:left-[700px] h-[120px] w-[120px] md:h-[200px] md:w-[200px] justify-center rounded-full flex flex-col text-center text-white">
            <div className="font-extrabold text-2xl  md:text-[40px]">2021</div>
            <div className="font-bold text-[10px] md:text-[15px]">
              5th Best Low-Cost Airline
            </div>
            <div className="font-bold text-[8px] md:text-[12px]">Skytrax</div>
          </div>
        </div>
        <div className=" hidden xl:block">
          <div className=" container absolute border top-6 right-10  h-[120px] w-[120px] md:h-[200px] md:w-[200px]   justify-center rounded-full flex flex-col text-center text-white">
            <div className="font-extrabold text-[40px]">2024</div>
            <div className="font-bold text-[12px] md:text-[15px]">
              Airline of the Year
            </div>
            <div className="font-bold text-[8px] md:text-[12px]">
              Air Transport Awards
            </div>
          </div>
          <div className=" container absolute border top-[250px] right-10 h-[120px] w-[120px] md:h-[200px] md:w-[200px] justify-center rounded-full flex flex-col text-center text-white">
            <div className="font-extrabold text-[40px]">2024</div>
            <div className="font-bold text-[12px] md:text-[15px]">
              Airline of the Year
            </div>
            <div className="font-bold text-[8px] md:text-[12px]">
              Travel & Tour World
            </div>
          </div>
          <div className=" container absolute border  top-[500px] right-10 h-[120px] w-[120px] md:h-[200px] md:w-[200px] justify-center rounded-full flex flex-col text-center text-white">
            <div className="font-extrabold text-[40px]">2021</div>
            <div className="font-bold text-[10px] md:text-[15px]">
              5th Best Low-Cost Airline
            </div>
            <div className="font-bold text-[8px] md:text-[12px]">Skytrax</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
