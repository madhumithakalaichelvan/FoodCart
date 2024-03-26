async function CustomApi(url) {
    try {
        const fetchDetails = await fetch(url)
        const data = await fetchDetails.json()
        return data
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}


export default CustomApi;