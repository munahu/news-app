import { useEffect, useState } from "react";

function useFetchData (url) {
    const [data, setData] = useState({});

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(url);
                const data = await response.json();
                setData(data.articles);
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [url])
    
    return data;
}

export default useFetchData