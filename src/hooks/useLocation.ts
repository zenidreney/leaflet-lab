import { useContext } from "react"
import { LocationContext } from "../context/LocationContext"


export default function useLocation() {
    const context = useContext(LocationContext)
    if (!context) throw new Error("useLocation to be used inside LocationProvider")
    return context
}