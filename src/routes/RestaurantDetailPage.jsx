import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { RestaurantsContext } from '../context/RestaurantsContext';
import RestaurantFinder from '../api/RestaurantFinder';
import Reviews from "./Reviews";
import AddReview from "../components/AddReview";
import StarRating from '../components/StarRating';


function RestaurantDetailPage(props) {
    const { id } = useParams();
    const { selectedRestaurant, setSelectedRestaurant } = useContext(RestaurantsContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await RestaurantFinder.get(`/${id}`);
                setSelectedRestaurant(response.data.data);
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
                    <h1 className="text-center display-1">{selectedRestaurant.restaurant.name}</h1>
                    <div className="text-center">
                        <StarRating rating={selectedRestaurant.restaurant.average_rating} />
                        <span className="text-warning ms-1">
                            {selectedRestaurant.restaurant.count ? `(${selectedRestaurant.restaurant.count})` : "(0)"}

                        </span>
                    </div>
                    <div className="mt-3">
                        <Reviews reviews={selectedRestaurant.reviews} />
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