import {addLocationApi} from "../api/AddLocationApi.js";

export const getFocusLogList = async () => {
    // TODO: loglist
}

export const addLocation = async (spotName, focusTimeId, latitude, longitude, placeId, placeUrl) => {
    console.log('FocusLogService: addLocation');

    const locationRequest = {
        spotName: spotName,
        focusTimeId: focusTimeId,
        latitude: latitude,
        longitude: longitude,
        placeId: placeId,
        placeUrl: placeUrl
    };

    return await addLocationApi("/focus-log/add/location", locationRequest);
}