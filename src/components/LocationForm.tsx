import { useEffect, useRef } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';

import { getCoordinates } from '../utils/getCoordinates';
import { useLocation } from '../hooks/useLocation';

type locationFormProps = {
    type: "start" | "end",
    children?: React.ReactNode
}


function LocationForm({ type, children }: locationFormProps) {
    console.log(children)

    const locationRef = useRef<HTMLInputElement>(null)
    const {
        startLocation,
        setStartLocation,
        endLocation,
        setEndLocation
    } = useLocation()

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const locationName = locationRef.current && locationRef.current.value ? locationRef.current.value : "madrid"
        const { name, latitude, longitude } = await getCoordinates(locationName)

        if (type === "start") {

            setStartLocation({
                location: name,
                lat: latitude,
                long: longitude
            })

        } else if (type === "end") {

            setEndLocation({
                location: name,
                lat: latitude,
                long: longitude
            })
        }
    }

    // JUST FOR DEVELOPMENT CONSOLE

    useEffect(() => {
        const { location: startLocConsole, lat: startLatConsole, long: startLongConsole } = startLocation
        const { location: endLocConsole, lat: endLatConsole, long: endLongConsole } = endLocation

        console.log("Start City:", startLocConsole, "latitude", startLatConsole, "longitude", startLongConsole);
        console.log("End City:", endLocConsole, "latitude", endLatConsole, "longitude", endLongConsole)
    }, [startLocation, endLocation]);

    const { location: startLoc, lat: startLat, long: startLong } = startLocation
    const { location: endLoc, lat: endLat, long: endLong } = endLocation

    console.log("Start 2nd console", startLoc, startLat, startLong)
    console.log("End 2nd console", endLoc, endLat, endLong)

    // END OF CONSOLE

    return (
        <Form onSubmit={handleSubmit}>
            <Stack direction="horizontal" gap={3} className='align-items-end'>
                <Form.Group controlId="formStartLocation" style={
                    { width: "100%" }
                }>
                    <Form.Label className="text-muted">
                        {children}
                    </Form.Label>
                    <Form.Control
                        ref={locationRef}
                        type="text"
                        placeholder="Enter a city or a town..."
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>

            </Stack>
            
            {type === "start" && startLoc && <p>Start at: {startLoc}</p>}

            {type === "end" && endLoc && <p>End at: {endLoc}</p>}

        </Form>
    )
}

export default LocationForm