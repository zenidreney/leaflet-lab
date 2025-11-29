import { useRef } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';

import { getCoordinates } from '../utils/getCoordinates';
import { useLocation } from '../hooks/useLocation';

type LocationFormProps = {
    type: "start" | "end",
    children?: React.ReactNode
}


function LocationForm({ type, children }: LocationFormProps) {

    const userInputTextRef = useRef<HTMLInputElement>(null)
    const {
        startLocation,
        setStartLocation,
        endLocation,
        setEndLocation
    } = useLocation()
    const { location: startPoint } = startLocation
    const { location: endPoint } = endLocation

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const locationName = userInputTextRef.current && userInputTextRef.current.value ? userInputTextRef.current.value : ""
        const { name, latitude, longitude } = await getCoordinates(locationName)

        const setLocationType = type === "start" ? setStartLocation : setEndLocation

        setLocationType(
            {
                location: name,
                lat: latitude,
                long: longitude
            })
    }
    const { location: startLoc, lat: startLat, long: startLong } = startLocation
    const { location: endLoc, lat: endLat, long: endLong } = endLocation

    console.log("Start coordinates", startLoc, startLat, startLong)
    console.log("End coordinates", endLoc, endLat, endLong)


    return (
        <Form onSubmit={handleSubmit}>
            <Stack direction="horizontal" gap={3} className='align-items-end'>
                <Form.Group
                    controlId={`form-${type}-location`}
                    style={
                        { width: "100%" }
                    }>
                    <Form.Label>
                        {children}
                    </Form.Label>
                    <Form.Control
                        ref={userInputTextRef}
                        style={
                            { maxWidth: "520px" }
                        }
                        type="text"
                        placeholder="Enter a city or a town..."
                        required
                    />
                </Form.Group>

                <Button variant="success" type="submit">
                    Submit
                </Button>

            </Stack>

            {type === "start" && startPoint && <p>Start from: {startPoint}</p>}

            {type === "end" && endPoint && <p>End at: {endPoint}</p>}

        </Form>
    )
}

export default LocationForm