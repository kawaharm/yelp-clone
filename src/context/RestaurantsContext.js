// Context API: Used to pass data through component tree without having to
// pass props down manually at every level
import React, { useState, createContext } from "react";

export const RestaurantsContext = createContext();

// Wrapped around App so all Components have access to these states
export const RestaurantsContextProvider = props => {
    const [restaurants, setRestaurants] = useState([]);

    return (
        <RestaurantsContext.Provider value={{ restaurants, setRestaurants }}>
            {props.children}
        </RestaurantsContext.Provider>
    )
}