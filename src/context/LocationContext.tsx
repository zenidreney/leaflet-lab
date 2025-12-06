import { createContext, type Dispatch, type ReactNode, type SetStateAction, useRef, useState } from "react";

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
    journeyDuration: string | null
    setJourneyDuration: Dispatch<SetStateAction<string | null>>
    mapRef: React.RefObject<HTMLDivElement | null>;
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

    const [journeyDuration, setJourneyDuration] = useState<string | null>(null)

      const mapRef = useRef<HTMLDivElement>(null);

    return (
        <LocationContext.Provider value={{
            startLocation,
            setStartLocation,
            endLocation,
            setEndLocation,
            route,
            setRoute,
            distance,
            setDistance,
            journeyDuration,
            setJourneyDuration,
            mapRef
        }}>
            {children}
        </LocationContext.Provider>

    )
}

export { LocationContext, LocationContextProvider }