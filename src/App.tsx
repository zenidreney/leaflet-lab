import InputInterface from "./components/InputInterface"
import { LocationContextProvider } from "./context/LocationContext"

function App() {

  return (
    <>
    <LocationContextProvider>

       <InputInterface />

    </LocationContextProvider>
    
    </>
  )
}

export default App
