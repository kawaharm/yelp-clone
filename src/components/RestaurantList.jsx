import React, { useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import RestaurantFinder from "../api/RestaurantFinder";
import { RestaurantsContext } from '../context/RestaurantsContext';

function RestaurantList() {
    const { restaurants, setRestaurants } = useContext(RestaurantsContext);
    // History of browser
    let navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Get all restaurants from server
                const response = await RestaurantFinder.get("/")
                // Store restaurant list in state
                setRestaurants(response.data.data.restaurants);
            } catch (err) {
                console.log('ERROR: ', err)
            }
        };

        fetchData();
    }, [])

    const handleUpdate = (e, id) => {
        // To prevent event bubbling
        // Without this, all parent/child elements above (ex. handleRestaurantSelect) will also run
        e.stopPropagation();
        try {
            // Navigate to update page
            navigate(`/restaurants/${id}/update`);
        } catch (err) {
            console.log('ERROR: ', err);
        }
    }

    const handleRestaurantSelect = (id) => {
        try {
            // Navigate to detail page
            navigate(`/restaurants/${id}`);
        } catch (err) {
            console.log('ERROR: ', err);
        }
    };

    const handleDelete = async (e, id) => {
        // To prevent event bubbling 
        e.stopPropagation();
        try {
            const response = await RestaurantFinder.delete(`/${id}`);
            console.log(response);
            // To update UI after deletion 
            setRestaurants(restaurants.filter(restaurant => {
                return restaurant.id !== id;
            }))
        } catch (err) {
            console.log('ERROR: ', err);
        }
    }

    return (
        <div className="list-group">
            <table className="table table-hover table-dark">
                <thead>
                    <tr className="bg-primary">
                        <th scope="col">Restaurant</th>
                        <th scope="col">Location</th>
                        <th scope="col">Price Range</th>
                        <th scope="col">Ratings</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {/* && Means will only render if restaurants exists */}
                    {restaurants && restaurants.map(restaurant => {
                        return (
                            <tr onClick={() => handleRestaurantSelect(restaurant.id)} key={restaurant.id}>
                                <td>{restaurant.name}</td>
                                <td>{restaurant.location}</td>
                                <td>{"$".repeat(restaurant.price_range)}</td>
                                <td>Reviews</td>
                                <td>
                                    {/* "() =>" will prevent function from running immediately and only on click */}
                                    <button
                                        onClick={(e) => handleUpdate(e, restaurant.id)}
                                        className="btn btn-warning">Update</button>
                                </td>
                                <td>
                                    {/* "() =>" will prevent function from running immediately and only on click */}
                                    <button
                                        onClick={(e) => handleDelete(e, restaurant.id)}
                                        className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default RestaurantList;