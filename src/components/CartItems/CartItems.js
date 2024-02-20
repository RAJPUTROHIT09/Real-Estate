import React, { useContext, useState, useEffect } from "react";
import "./CartItems.css";
import { HouseContext } from "../HouseContext";
import { housesData } from "../../data";
import { Link, useParams } from "react-router-dom";

const CartItems = () => {
  const { idArr,removeFromCart} = useContext(HouseContext);

  const filteredItems = idArr.filter((item) => item.days > 0);

  const updateHouseData = (filteredItems, house) => {
    const updatedCollection = filteredItems.map((item) => {
      const houseToUpdate = house.find((h) => h.id === item.itemId);
      if (houseToUpdate) {
        // Create a new object with the updated days property
        return { ...houseToUpdate, days: item.days };
      }
      return null;
    });

    // Filter out any null entries (house not found)
    return updatedCollection.filter((item) => item !== null);
  };

  const deleteEntryFromCart = (itemId) => {
    removeFromCart(itemId); // Assuming removeFromCart handles removal logic
  };
  console.log()

  const houseCollection = updateHouseData(filteredItems, housesData);

  const getTotalCartAmount = () => {
    // Initialize total amount
    let totalAmount = 0;

    // Iterate over houseCollection and sum up the prices
    houseCollection.forEach((house) => {
      totalAmount += house.price * house.days; // Assuming house.price represents the price of each item
    });

    return totalAmount;
  };

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>House</p>
        <p>Address</p>
        <p>Price</p>
        <p>Day/Days</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />

      {houseCollection.map((house) => {
        return (
          <div key={house.id}>
            <div className="cartitems-format cartitems-format-main">
              <img src={house.image} alt="" className="carticon-product-icon" />
              <p>{house.name}</p>
              <p>${house.price}</p>
              <p className="days">{house.days}</p>
              <p>${house.price * house.days}</p>
              <button   onClick={() => deleteEntryFromCart(house.id)} className="remove">
                Delete
              </button>
            </div>
            <hr />
          </div>
        );
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>====================Cart====================</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Extra Charge Fee</p>
              <p>No</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${getTotalCartAmount()}</h3>
            </div>
          </div>
          <Link to="/registration">
            <button>PROCEED TO CHECKOUT</button>
          </Link>
        </div>
       
      </div>
    </div>
  );
};

export default CartItems;
