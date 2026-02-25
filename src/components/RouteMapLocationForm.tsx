import Stack from "react-bootstrap/Stack";
import LocationForm from "./LocationForm";
import { useLocation } from "../hooks/useLocation";

export default function RouteMapLocationForm() {
	// console.log("loading: ", loading, "error: ", error)
	const { distance, journeyDuration } = useLocation();

	return (
		<Stack direction="vertical">
			<Stack
				direction="horizontal"
				gap={5}
				className="
                        flex-column-reverse
                        flex-md-row
                        "
			>
				<Stack className="m-0 p-2" gap={3}>
					<LocationForm type="start">Start from...</LocationForm>
					<LocationForm type="end">End at...</LocationForm>

					<Stack>
						{distance && <p className="fw-bold">Total distance: {distance} kms</p>}
						{journeyDuration && <p className="fw-bold">Duration: {journeyDuration} hours</p>}
					</Stack>
				</Stack>
			</Stack>
		</Stack>
	);
}
