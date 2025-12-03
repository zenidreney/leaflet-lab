import Stack from "react-bootstrap/Stack";
import InputInterface from "./components/InputInterface";
import UserMap from "./components/UserMap";
import { LocationContextProvider } from "./context/LocationContext";

import "./App.css";

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
				<InputInterface />
				<Stack className="rounded-3 overflow-hidden">
					<UserMap />
				</Stack>
			</Stack>
		</LocationContextProvider>
	);
}

export default App;
