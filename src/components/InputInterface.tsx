import Stack from "react-bootstrap/Stack";
import LocationForm from "../components/LocationForm";
import { useLocation } from "../hooks/useLocation";

export default function InputInterface() {
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

					{distance && <p>Total distance: {distance} kms</p>}
					{journeyDuration && <p>Duration: {journeyDuration} hours</p>}
				</Stack>
			</Stack>
		</Stack>
	);
}
