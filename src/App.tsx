import Stack from "react-bootstrap/Stack";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import InputInterface from "./components/InputInterface";
import RouteMap from "./components/RouteMap";
import { LocationContextProvider } from "./context/LocationContext";

import "./App.css";
import SingleMap from "./components/SingleMap";

function App() {
	return (
		<LocationContextProvider>
			<Stack
				gap={3}
				className="app-container mt-3 text-white px-3 pb-3 shadow-lg"
			>
				<Stack className="mt-2 align-items-center">
					<h1>ZenidMap</h1>
				</Stack>
				<Tabs
					defaultActiveKey="profile"
					id="uncontrolled-tab-example"
					className="mb-3"
				>
					<Tab eventKey="map" title="Map">
						<SingleMap />
					</Tab>
					<Tab eventKey="route" title="Route">
						<InputInterface />
						<Stack className="rounded-3 overflow-hidden">
							<RouteMap />
						</Stack>
					</Tab>
				</Tabs>
			</Stack>
		</LocationContextProvider>
	);
}

export default App;
