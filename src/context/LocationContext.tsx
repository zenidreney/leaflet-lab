import { createContext, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";

type LocationObject = {
    location: string | null
    long: string | null
    lat: string | null
}
type LocationContextProps = {
    children: ReactNode
}
type LocationContextType = {
    startLocation: LocationObject
    setStartLocation: Dispatch<SetStateAction<LocationObject>>
    endLocation: LocationObject
    setEndLocation: Dispatch<SetStateAction<LocationObject>>
    route: [number, number][]
    setRoute: Dispatch<SetStateAction<[number, number][]>>
    distance: number | null
    setDistance: Dispatch<SetStateAction<number | null>>
}

const LocationContext = createContext<LocationContextType | undefined>(undefined)

function LocationContextProvider({ children }: LocationContextProps) {

    const [startLocation, setStartLocation] = useState<LocationObject>({
        location: null,
        long: null,
        lat: null
    })
    const [endLocation, setEndLocation] = useState<LocationObject>({
        location: null,
        long: null,
        lat: null
    })

    const [route, setRoute] = useState<[number, number][]>([])

    const [distance, setDistance] = useState<number | null>(null)

    return (
        <LocationContext.Provider value={{
            startLocation,
            setStartLocation,
            endLocation,
            setEndLocation,
            route,
            setRoute,
            distance,
            setDistance
        }}>
            {children}
        </LocationContext.Provider>

    )
}

export { LocationContext, LocationContextProvider }