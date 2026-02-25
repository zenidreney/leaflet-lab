import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import Stack from "react-bootstrap/Stack";
import { MapContainer, Polyline, TileLayer, useMap } from "react-leaflet";
import { useLocation } from "../hooks/useLocation";
import RouteMapLocationForm from "./RouteMapLocationForm";

type CenterMapProps = {
	long: string | null;
	lat: string | null;
};

function CenterMap({ lat, long }: CenterMapProps) {
	const map = useMap();

	useEffect(() => {
		if (lat && long) {
			const center: [number, number] = [parseFloat(lat), parseFloat(long)];
			map.setView(center, map.getZoom());
		}
	}, [lat, long, map]);

	return null;
}

function FitMap({ route }: { route: [number, number][] }) {
	const map = useMap();

	useEffect(() => {
		if (route.length > 1) {
			map.fitBounds(route);
		}
	}, [route, map]);

	return null;
}

export default function UserMap() {
	const {
		startLocation,
		endLocation,
		route,
		setRoute,
		distance,
		setDistance,
		journeyDuration,
		setJourneyDuration,
		mapRef,
	} = useLocation();

	const { lat: startLat, long: startLong } = startLocation;
	const { lat: endLat, long: endLong } = endLocation;
	const [isRouteLoading, setIsRouteLoading] = useState(false)

	useEffect(() => {
		if (!startLat || !endLat) {
			return;
		}

		async function fetchRoute() {
			try {
				setIsRouteLoading(true)
				const res = await fetch(
					`https://router.project-osrm.org/route/v1/driving/${startLong},${startLat};${endLong},${endLat}?overview=full&geometries=geojson`,
				);
				const data = await res.json();
				// console.log("Route Data:", typeof data.routes[0].legs[0].duration);
				const distanceInKm = Math.floor(data.routes[0].legs[0].distance / 1000);
				setDistance(distanceInKm);
	
				const secondsToHours = 1 / 3600;
				const journeyDurationInHours =
					data.routes[0].legs[0].duration * secondsToHours;
				setJourneyDuration(journeyDurationInHours.toFixed(2));
	
				if (data.routes?.length) {
					const coords = data.routes[0].geometry.coordinates.map(
						([lng, lat]: [number, number]) => [lat, lng],
					);
					setRoute(coords);
				}
			} catch (error) {
				throw new Error(`Cannot fetch route becaouse of ${error}`)
			} finally {
				setIsRouteLoading(false)
			}
		}

		fetchRoute();
	}, [
		startLat,
		startLong,
		setRoute,
		setDistance,
		endLat,
		endLong,
		setJourneyDuration,
	]);

	const mapStyle = {
		height: "400px",
		width: "100%",
	};

	// JUST FOR DEV CONSOLE

	useEffect(() => {
		console.log("Distance", distance, "Duration", journeyDuration);
	}, [distance, journeyDuration]);

	// END OF CONSOLE

	return (
		<Stack ref={mapRef}>
						<RouteMapLocationForm />

			{isRouteLoading ? <p>Route Loading...</p> : ""}
			<MapContainer
				center={[51.505, -0.09]}
				zoom={13}
				scrollWheelZoom={false}
				style={mapStyle}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<FitMap route={route} />
				<CenterMap
					lat={startLat ? startLat : endLat}
					long={startLong ? startLong : endLong}
				/>
				{route.length > 0 && <Polyline positions={route} color="purple" />}
			</MapContainer>
		</Stack>
	);
}
