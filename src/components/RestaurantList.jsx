import React, { useContext, useEffect } from 'react';

import RestaurantFinder from "../api/RestaurantFinder";
import { RestaurantsContext } from '../context/RestaurantsContext';

function RestaurantList() {
    const { restaurants, setRestaurants } = useContext(RestaurantsContext);
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
        }

        fetchData();
    }, [])

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
                            <tr key={restaurant.id}>
                                <td>{restaurant.name}</td>
                                <td>{restaurant.location}</td>
                                <td>{"$".repeat(restaurant.price_range)}</td>
                                <td>Reviews</td>
                                <td>
                                    <button className="btn btn-warning">Update</button>
                                </td>
                                <td>
                                    <button className="btn btn-danger">Delete</button>
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