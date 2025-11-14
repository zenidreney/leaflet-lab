import InputInterface from "./components/InputInterface"
import { LocationContextProvider } from "./context/LocationContext"
import Map from "./components/Map"

import Stack from 'react-bootstrap/Stack';

import "./App.css"

function App() {

  return (
    
      <LocationContextProvider>

        <Stack gap={3} className="app-container mt-3">
          <InputInterface />
          <Map />
        </Stack>

      </LocationContextProvider>
    
  )
}

export default App
