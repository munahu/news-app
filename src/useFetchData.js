import { useEffect, useState } from "react";

function useFetchData (url) {
    const [data, setData] = useState({});

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(url);
                const data = await response.json();
                url.includes("headlines") ? setData(data.articles): setData(data.sources);
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [url])
    
    return data;
}

export default useFetchData