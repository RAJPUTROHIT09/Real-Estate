import React, { useContext, useState } from "react";

import { useNavigate } from "react-router-dom";

//import data
import { housesData } from "../data";

//imprort params
import { useParams } from "react-router-dom";

//import icons
import { BiBed, BiBath, BiArea } from "react-icons/bi";

import { HouseContext } from "../components/HouseContext";

//import link
import { Link } from "react-router-dom";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CartItems from "../components/CartItems/CartItems";

const PropertyDetails = () => {
  const { addToCart } = useContext(HouseContext);
  //get the house id
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [subtotalDays, setSubtotalDays] = useState(0);
  const [btnOpen, setBtnOpen] = useState(false);
  // const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const calculateDays = (start, end) => {
    const diffInMilliseconds = Math.abs(end - start);
    const daysDifference = Math.ceil(
      diffInMilliseconds / (1000 * 60 * 60 * 24)+1
    );
    return daysDifference === 0 ? 1 : daysDifference;
  };

  const today = new Date(); // Get the current date



  // get the house based on the id
  const house = housesData.find((house) => {
    return house.id === parseInt(id);
  });

  return (
    <section>
      <div className="container mx-auto min-h-[800px] mb-14">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">{house.name}</h2>
            <h3 className="text-lg mb-4">{house.address}</h3>
          </div>
          <div className="mb-4 lg:mb-0 flex gap-x-2 text-sm">
            <div className="bg-yellow-500 text-white px-3 rounded-full">
              {house.type}
            </div>
            <div className="bg-green-500 text-white px-3 rounded-full">
              {house.country}
            </div>
          </div>
          <div className="text-3xl font-semibold text-blue-600">
            $ {house.price}
          </div>
        </div>
        <div className="flex flex-col items-start gap-8 lg:flex-row">
          <div className="max-w-[768px]">
            <div className="mb-8">
              <img src={house.imageLg} alt="" />
            </div>
            <div className="flex gap-x-6 text-green-700 mb-6">
              <div className="flex gap-x-2 items-center">
                <BiBed className="text-2xl" />
                <div>{house.bedrooms}</div>
              </div>
              <div className="flex gap-x-2 items-center">
                <BiBath className="text-2xl" />
                <div>{house.bathrooms}</div>
              </div>
              <div className="flex gap-x-2 items-center">
                <BiArea className="text-2xl" />
                <div>{house.surface}</div>
              </div>
            </div>
            <div>{house.description}</div>
          </div>
          <div className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 w-full mb-8 border border-gray-300 rounded-lg p-6">
            <div className="flex items-center gap-x-4 mb-8">
              <div className="w-20 h-20 p-2 border-2 border-white rounded-full overflow-hidden">
                <img
                  src={house.agent.image}
                  alt={house.agent.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-white">
                <div className="font-bold text-lg">{house.agent.name}</div>
                <Link
                  to=""
                  className="text-green-300 text-sm hover:text-green-500 transition"
                >
                  Owner Name
                </Link>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-3xl font-semibold text-yellow-400">
                {house.name}
              </h2>
              <h3 className="text-lg text-gray-200">{house.address}</h3>
              <h2 className="text-2xl font-semibold text-lime-500">For Rent</h2>
            </div>

            <div div className="flex flex-col gap-4 text-gray-200">
              <div className="flex items-center gap-x-2">
                <BiBed className="text-2xl" />
                <div>{house.bedrooms} Bedrooms</div>
              </div>
              <div className="flex items-center gap-x-2">
                <BiBath className="flex text-2xl" />
                <div>{house.bathrooms} Bathrooms</div>
              </div>
              <div className="flex items-center gap-x-2">
                <BiArea className="text-2xl" />
                <div>{house.surface} sqft</div>
              </div>
            </div>

            <div className="mt-6 flex gap-4">
            <DatePicker
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
              if (date > endDate) {
                setEndDate(date); // If start date is later than end date, update end date
              }
              setSubtotalDays(calculateDays(date, endDate));
            }}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            dateFormat="MMMM d, yyyy"
            minDate={today} // Set the minimum date to today
            className="border border-gray-300 focus:border-green-500 outline-none rounded w-full px-4 h-14 text-sm"
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => {
              setEndDate(date);
              if (date < startDate) {
                setStartDate(date); // If end date is earlier than start date, update start date
              }
              setSubtotalDays(calculateDays(startDate, date));
            }}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            dateFormat="MMMM d, yyyy"
            minDate={today} // Set the minimum date to today
            className="border border-gray-300 focus:border-green-500 outline-none rounded w-full px-4 h-14 text-sm"
          />
            </div>

            <div className="mt-6 flex gap-4">
              <label
                className="bg-gray-700 text-white py-2 px-4 rounded mx-auto text-justify-center hover:bg-green-600 focus:outline-none focus:shadow-outline-green active:bg-green-800"
                onClick={() => {
                  console.log("Buy Now Clicked!");
                }}
              >
                Total Days: {subtotalDays}
              </label>
            </div>
            <div className="mt-6 flex gap-4">
              <Link
                to={`/cart/`}
                key={"a"}
                onClick={addToCart(house.id, subtotalDays)}
                className="bg-[#db2777] text-white py-2 px-4 rounded mx-auto text-justify-center hover:bg-green-600 focus:outline-none focus:shadow-outline-green active:bg-green-800"
              >
                Buy Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyDetails;