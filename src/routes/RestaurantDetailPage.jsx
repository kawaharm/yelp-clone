import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { RestaurantsContext } from '../context/RestaurantsContext';
import RestaurantFinder from '../api/RestaurantFinder';
import Reviews from "./Reviews";
import AddReview from "../components/AddReview";


function RestaurantDetailPage(props) {
    const { id } = useParams();
    const { selectedRestaurant, setSelectedRestaurant } = useContext(RestaurantsContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await RestaurantFinder.get(`/${id}`);
                setSelectedRestaurant(response.data.data.restaurant);
            } catch (err) {
                console.log('ERROR: ', err);
            }
        }

        fetchData();
    }, [])

    return (
        <div>
            {selectedRestaurant && (
                <>
                    <div className="mt-3">
                        <Reviews />
                    </div>
                    <div className="mt-3">
                        <AddReview />
                    </div>
                </>
            )}
        </div>
    )
}

export default RestaurantDetailPage;