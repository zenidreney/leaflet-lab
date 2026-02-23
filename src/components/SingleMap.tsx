import LocationForm from "./LocationForm";
import { Stack } from "react-bootstrap";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { useEffect } from "react";
import { useLocation } from "../hooks/useLocation";

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

export default function SingleMap() {
	const { mapRef, startLocation } = useLocation();
	const { lat: startLat, long: startLong } = startLocation;

	const mapStyle = {
		height: "400px",
		width: "100%",
	};

	return (
		<Stack gap={3} >
			<LocationForm type="start" />
			<Stack ref={mapRef}>
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
					<CenterMap lat={startLat} long={startLong} />
				</MapContainer>
			</Stack>
		</Stack>
	);
}
