import { useEffect, useRef, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';

import { getCoordinates } from '../utils/getCoordinates';
import { useLocation } from '../hooks/useLocation';

type LocationFormProps = {
    type: "start" | "end",
    children?: React.ReactNode
}

type LocationResult = {
    place_id: number;
    licence: string;
    osm_type: string;
    osm_id: number;
    lat: string;
    lon: string;
    display_name: string;
    class: string;
    type: string;
    place_rank: number;
    importance: number;
    name: string;
    addresstype: string;
    boundingbox: string[];
};


function LocationForm({ type, children }: LocationFormProps) {

    const [locationData, setLocationData] = useState<LocationResult[] | null>(null)

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
        const dataFromGetCoordinates = await getCoordinates(locationName)
        // dataFromGetCoordinates.forEach(data => console.log(data.osm_id))

        const setLocationType = (type === "start") ? setStartLocation : setEndLocation

        setLocationType(
            {
                location: dataFromGetCoordinates[0].display_name,
                lat: dataFromGetCoordinates[0].lat,
                long: dataFromGetCoordinates[0].lon
            })

        setLocationData(dataFromGetCoordinates)
    }

    useEffect(() => console.log(locationData), [locationData])

    // const { location: startLoc, lat: startLat, long: startLong } = startLocation
    // const { location: endLoc, lat: endLat, long: endLong } = endLocation

    const searchLocationOptions = locationData?.map(loc => {
        const setLocationType = (type === "start") ? setStartLocation : setEndLocation
        console.log(loc.osm_id)
        return <Button
            key={loc.osm_id}
            variant="warning"
            onClick={() => {
                setLocationType(
                    {
                        location: loc.display_name,
                        lat: loc.lat,
                        long: loc.lon
                    })

            }}
        >{loc.display_name}</Button>
    })

    console.log(searchLocationOptions)


    // console.log("Start coordinates", startLoc, startLat, startLong)
    // console.log("End coordinates", endLoc, endLat, endLong)


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

            <Stack gap={3}>
                {
                    searchLocationOptions
                }
            </Stack>
        </Form>
    )
}

export default LocationForm