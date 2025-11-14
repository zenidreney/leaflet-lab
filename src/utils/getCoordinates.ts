export async function getCoordinates(location: string) {
    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${location}`, {
        headers: { 'User-Agent': 'van-trip-explorer-student-project/1.0' }
    })

    const data = await res.json()
    //console.log(typeof data[0].name, typeof data[0].lat, typeof data[0].lon)

    return {
        name: data[0].name,
        latitude: data[0].lat,
        longitude: data[0].lon
    }
    
}