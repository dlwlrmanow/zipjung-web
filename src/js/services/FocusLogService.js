import {addLocationApi} from "../api/AddLocationApi.js";

export const getFocusLogList = async () => {
    // TODO: loglist
}

export const addLocationService = async (spotName, focusTimeId, latitude, longitude, placeId) => {
    const locationRequest = {
        spotName: spotName,
        focusTimeId: focusTimeId,
        latitude: latitude,
        longitude: longitude,
        placeId: placeId
    };

    return await addLocationApi("/focus-log/add/location", locationRequest);
}