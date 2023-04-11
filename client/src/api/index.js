import axios from "axios";
import travelAdvisorCredential from '../credentials/rapid_api_travel_advisor_credential.json'

const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary'

export async function getPlaceData(tr, bl) {
    console.log('executing ')
    try {
        const {data: {data}} = await axios.get(URL, {
            params: {
                bl_latitude: bl.lat,
                tr_latitude: tr.lat,
                bl_longitude: bl.lng,
                tr_longitude: tr.lng,
                // bl_latitude: '11.847676',
                // tr_latitude: '12.838442',
                // bl_longitude: '109.095887',
                // tr_longitude: '109.149359',
                limit: '30'
            },
            headers: {
                'X-RapidAPI-Key': travelAdvisorCredential["X-RapidAPI-Key"],
                'X-RapidAPI-Host': travelAdvisorCredential["X-RapidAPI-Host"]
            }
        })

        return data
    }catch (err){
        console.error(err)
    }
}



