import React, { useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

//set location to MSC, Spin 'n Stone
const loc = {
    lat: 30.612379915919746,
    lng: -96.34152692140881
};

//Set the dimensions of the maps container
const dims = {
    width: '75vw',
    height: '50vw'
};

/* Simple on load function, display marker information
 * Not necessary but good to have for further implementations
 */
const markLoader = marker => {
    console.log('Marker: ', marker)
}

/* Actual component that will load the Google Maps container for the website
 * Use the API Key created for this project, along with the location of the MSC.
 * Use preset width and height for the container, liable to change
 * @return a GoogleMapsComp that automatically zooms on location and sets a marker
 */
function GoogleMapsComp() {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyCzagfBb-gzeJrOcmijV9FfNmcjKDtbRts'
    })
    const [zoomUse, setZoom] = useState(0)
    const [map, setMap] = useState(null)
    const onLoad = useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(loc);
        map.fitBounds(bounds);
        map.setMapTypeId('satellite');
        setTimeout(() => setZoom(17), 1000);
        setMap(map);
        map.setTilt(45);
    }, [])

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={dims}
            center={loc}
            zoom={zoomUse}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            <Marker
                onLoad={markLoader}
                position={loc}
            />
        </GoogleMap>
    ) : <></>
}

export default GoogleMapsComp;