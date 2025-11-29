import InputInterface from "./components/InputInterface"
import { LocationContextProvider } from "./context/LocationContext"
import Map from "./components/Map"

import Stack from 'react-bootstrap/Stack';

import "./App.css"

function App() {

  return (
    
      <LocationContextProvider>

        <Stack gap={3} className="app-container mt-3 text-white px-3 pb-3">
          <InputInterface />
          <Stack className="rounded-3 overflow-hidden"><Map /></Stack>
        </Stack>

      </LocationContextProvider>
    
  )
}

export default App
