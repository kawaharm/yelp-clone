import React, { useState, useContext } from "react";

import RestaurantFinder from "../api/RestaurantFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";

function AddRestaurant() {
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [priceRange, setPriceRange] = useState("Price Range");
    const { addRestaurants } = useContext(RestaurantsContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await RestaurantFinder.post("/", {
                name: name,
                location: location,
                price_range: priceRange,
            });
            addRestaurants(response.data.data.restaurant);
        } catch (err) {
            console.log('ERROR: ', err);
        }
    }

    return (
        <div className="mb-4">
            <form action="">
                <div className="row">
                    <div className="col">
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            className="form-control"
                            placeholder="name" />
                    </div>
                    <div className="col">
                        <input
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            type="text"
                            className="form-control"
                            placeholder="location" />
                    </div>
                    <div className="col">
                        <select
                            value={priceRange}
                            onChange={(e) => setPriceRange(e.target.value)}
                            className="custom-select my-1"
                            style={{ width: "80%" }}>
                            <option disabled>Price Range</option>
                            <option value="1">$</option>
                            <option value="2">$$</option>
                            <option value="3">$$$</option>
                            <option value="4">$$$$</option>
                            <option value="5">$$$$$</option>
                        </select>
                    </div>
                    <div className="col">
                        <button
                            onClick={handleSubmit}
                            type="submit"
                            className="btn btn-primary px-3"
                            style={{ width: "30%" }}>Add</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddRestaurant;