import { useLocation } from '../hooks/useLocation';

import Stack from 'react-bootstrap/Stack';


import LocationForm from "../components/LocationForm";


export default function InputInterface() {
    // console.log("loading: ", loading, "error: ", error)
    const { distance, journeyDuration } = useLocation()




    return (
        <Stack direction="vertical" className="van-detail-container">

            <Stack
                direction="horizontal"
                gap={5}
                className="
                        van-description-container 
                        flex-column-reverse
                        flex-md-row
                        
                        ">
                <Stack className="m-3 m-md-0 p-2">

                   

                    <LocationForm type="start">Start from...</LocationForm>
                    <LocationForm type="end">End at...</LocationForm>


                {distance && <p>Total distance: { distance } kms</p>}
                {journeyDuration && <p>Duration: { journeyDuration } hours</p>}
                </Stack>

            </Stack>

        </Stack>
    )
}
