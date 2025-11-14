import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
//import "leaflet-routing-machine";
//import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

import { MapContainer, TileLayer, useMap, Polyline } from 'react-leaflet'
import { useLocation } from "../hooks/useLocation";


type CenterMapProps = {
    long: string | null
    lat: string | null
}

function CenterMap({ lat, long }: CenterMapProps) {

    const map = useMap()

    useEffect(() => {
        if(lat && long) {
            const center : [number, number] = [parseFloat(lat), parseFloat(long)]
            map.setView(center, map.getZoom())
        }
    }, [lat, long, map])

    return null
}

function FitMap( { route }: { route: [number, number][]} ) {
    const map = useMap()

    useEffect(() => {
        if(route.length > 1) {
            
            map.fitBounds(route)
        }
    }, [route, map])

    return null
}


export default function Map() {
    
    const { startLocation, endLocation, setRoute, setDistance, route, distance } = useLocation()
    //const [route, setRoute] = useState<[number, number][]>([])

    const { lat: startLat, long: startLong } = startLocation
    const { lat: endLat, long: endLong } = endLocation
    
    //console.log(startLat, startLong, endLat, endLong)
    
    useEffect(() => {
    
        if(!startLat || !endLat) {

            return

        }

        async function fetchRoute() {
            const res = await fetch(`https://router.project-osrm.org/route/v1/driving/${startLong},${startLat};${endLong},${endLat}?overview=full&geometries=geojson`)
            const data = await res.json()
           // console.log("Route Data:", data.routes[0].legs[0].distance)
            const distanceInKm = Math.floor(data.routes[0].legs[0].distance / 1000)
            setDistance(distanceInKm)

            if(data.routes?.length) {
                const coords = data.routes[0].geometry.coordinates.map(
                    ([lng, lat]: [number, number]) => [lat, lng]
                )
                setRoute(coords)
            }
        }

        fetchRoute()
    
    
    }, [startLat, startLong, setRoute, setDistance, endLat, endLong])
    
    const mapStyle = {
        height: "400px",
        width: "100%",
    }

    // JUST FOR DEV CONSOLE

    useEffect(() => {
        console.log("Distance", distance)
    }, [distance])

    // END OF CONSOLE

    return (
        <>

            <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} style={mapStyle}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <FitMap route = {route} />

                <CenterMap lat={startLat ? startLat : endLat} long={startLong ? startLong : endLong} />
               
                {route.length > 0 && <Polyline positions={route} color="purple" />}
            </MapContainer>
        </>

    )
}