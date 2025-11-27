export async function getCoordinates(location: string) {
    try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${location}`, {
            headers: { 'User-Agent': 'van-trip-explorer-student-project/1.0' }
        })

        if (!res.ok) {
            console.log(res.status)
            throw new Error(`Request Error Code: ${res.status} `)
        }

        const data = await res.json()

        // console.log(data.length, Array.isArray(data))

        if( !Array.isArray(data) || data.length === 0 ) {
            alert("Please enter a valid city or town in the text box")
            throw new Error("No results found")
        }


        return {
            name: data[0].name,
            latitude: data[0].lat,
            longitude: data[0].lon
        }
    } catch (error) {
        console.log(error)
        throw error
    }

}