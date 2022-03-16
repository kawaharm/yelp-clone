import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RestaurantsContext } from "../context/RestaurantsContext";
import RestaurantFinder from "../api/RestaurantFinder";


function UpdateRestaurant(props) {
    const { id } = useParams();
    const { restaurants } = useContext(RestaurantsContext);
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [priceRange, setPriceRange] = useState("");
    let navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await RestaurantFinder.get(`/${id}`);

                /* DO NOT use useContext to fetch data bc it depends on
                ** RestaurantList to fetch data first. Going directly to
                ** UpdatePage before accessing homepage will cause error.  
                */
                setName(response.data.data.restaurant.name);
                setLocation(response.data.data.restaurant.location);
                setPriceRange(response.data.data.restaurant.price_range);
            } catch (err) {
                console.log('ERROR: ', err);
            }
        }

        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedRestaurant = await RestaurantFinder.put(`/${id}`, {
            name: name,
            location: location,
            price_range: priceRange,
        });
        // Navigate back to homepage
        navigate("/");
    }

    return (
        <>
            <h1>{name}</h1>
            <form action="">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        type="text"
                        id="name"
                        className="form-control" />
                </div>

                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input
                        value={location}
                        onChange={e => setLocation(e.target.value)}
                        type="text"
                        id="location"
                        className="form-control" />
                </div>

                <div className="form-group">
                    <label htmlFor="price_range">Price Range</label>
                    <input
                        value={priceRange}
                        onChange={e => setPriceRange(e.target.value)}
                        type="number"
                        id="price_range"
                        className="form-control" />
                </div>

                <button
                    onClick={handleSubmit}
                    className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}

export default UpdateRestaurant;