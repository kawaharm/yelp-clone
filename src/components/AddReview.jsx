import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import RestaurantFinder from '../api/RestaurantFinder';

function AddReview() {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState("Rating");

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        try {
            const newReview = await RestaurantFinder.post(`/${id}/addReview`, {
                name: name,
                content: reviewText,
                rating: rating
            })
            // Refresh page to render new review
            window.location.reload(false);
        } catch (err) {
            console.log('ERROR: ', err);
        }
    }

    return (
        <div className="mb-2">
            <form action="">
                <div className="form-row">
                    <div className="form-group col-8">
                        <label htmlFor="name">Name</label>
                        <input
                            value={name}
                            onChange={e => setName(e.target.value)}
                            id="name"
                            placeholder="name"
                            type="text"
                            className="form-control" />
                    </div>
                    <div className="form-group col-4">
                        <label htmlFor="rating">Rating</label>
                        <select
                            value={rating}
                            onChange={e => setRating(e.target.value)}
                            id="rating"
                            className="custom-select"
                        >
                            <option disabled>Rating</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="review">Review</label>
                    <textarea
                        value={reviewText}
                        onChange={e => setReviewText(e.target.value)}
                        id="review"
                        className="form-control"></textarea>
                </div>
                <button
                    type="submit"
                    onClick={handleSubmitReview}
                    className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default AddReview;