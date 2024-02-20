import React, { createContext, useEffect, useState } from "react";
//import data
import { housesData } from "../data";

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < housesData.length + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};
//create context
export const HouseContext = createContext();
const HouseContextProvider = ({ children }) => {
  const [houses, setHouses] = useState(housesData);
  const [country, setCountry] = useState("Location (any)");
  const [countries, setCountries] = useState([]);
  const [property, setProperty] = useState("Property type (any)");
  const [properties, setProperties] = useState([]);
  const [price, setPrice] = useState("Price range (any)");
  const [loading, setLoading] = useState(false);
  const [idArr, setIdArr] = useState([]);

  
  const addToCart = (itemId, days) => {
    idArr.push({ itemId, days });
  };

  // console.log("idArr ===>", idArr);

  const removeFromCart = (itemId) => {
    setIdArr((prev) => {
      // Find the index of the first occurrence of the itemId in the array
      const indexToRemove = prev.findIndex((item) => item.itemId === itemId);
  
      // If the itemId is found, remove it from the array
      if (indexToRemove !== -1) {
        const newArray = [...prev];
        newArray.splice(indexToRemove, 1);
        return newArray;
      }
  
      // If itemId is not found, return the current state unchanged
      return prev;
    });
  };

  // console.log("remove From Cart ===>",removeFromCart)

  //return all countries
  useEffect(() => {
    const allCountries = houses.map((houses) => {
      return houses.country;
    });

    //remove duplicates
    const uniqueCountries = ["Location (any)", ...new Set(allCountries)];

    //set Countries State
    setCountries(uniqueCountries);
  }, []);

  //return all properties
  useEffect(() => {
    const allProperties = houses.map((houses) => {
      return houses.type;
    });

    //remove duplicates
    const uniqueProperties = ["Location (any)", ...new Set(allProperties)];

    //set Properties State
    setProperties(uniqueProperties);
  }, []);

  const handleClick = () => {
    // set loading
    setLoading(true);

    //create a function that checks if the string includes '(any)'
    const isDefault = (str) => {
      return str.split(" ").includes("(any)");
    };
    //get first value of price and parse it to number
    const minPrice = parseInt(price.split(" ")[0]);
    //get second value of price which is the maximum price & parse it to the number
    const maxPrice = parseInt(price.split(" ")[2]);

    const newHouses = housesData.filter((houses) => {
      const housePrice = parseInt(houses.price);

      //if all values are selected
      if (
        houses.country === country &&
        houses.type === property &&
        housePrice >= minPrice &&
        housePrice <= maxPrice
      ) {
        return houses;
      }

      //if all values are default
      if (isDefault(country) && isDefault(property) && isDefault(price)) {
        return houses;
      }

      //if country is not default
      if (!isDefault(country) && isDefault(property) && isDefault(price)) {
        return houses.country === country;
      }

      //if property is not default
      if (!isDefault(property) && isDefault(country) && isDefault(price)) {
        return houses.type === property;
      }

      //if price is not default
      if (!isDefault(price) && isDefault(country) && isDefault(property)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return houses;
        }
      }

      //if country and property is not default
      if (!isDefault(country) && !isDefault(property) && isDefault(price)) {
        return houses.country === country && houses.type === property;
      }

      //if country and price is not default
      if (!isDefault(country) && isDefault(property) && !isDefault(price)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return houses.country === country;
        }
      }

      //property and price is not define
      if (isDefault(country) && !isDefault(property) && !isDefault(price)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return houses.type === property;
        }
      }
    });

    setTimeout(() => {
      return (
        newHouses.length < 1 ? setHouses([]) : setHouses(newHouses),
        setLoading(false)
      );
    }, 1000);
  };

  return (
    <HouseContext.Provider
      value={{
        country,
        setCountry,
        countries,
        property,
        setProperty,
        properties,
        price,
        setPrice,
        houses,
        loading,
        handleClick,
        loading,
        idArr,
        addToCart,
        removeFromCart,
        
      }}
    >
      {children}
    </HouseContext.Provider>
  );
};

export default HouseContextProvider;
