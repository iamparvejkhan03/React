import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

function Github(){
    // const [data, setData] = useState({});

    // useEffect(() => {
    //     fetch("https://api.github.com/users/hiteshchoudhary").then(response => response.json()).then(data => setData(data));
    // }, []);

    const data = useLoaderData();

    return (
        <div className="px-24 py-12 bg-gray-400">
            <img src={data.avatar_url} alt="" className="h-40 rounded-full" />
            <h1>Followers: {data.followers}</h1>
        </div>
    );
}

export default Github;

export const useGithubInfo = async () => {
    let response = await fetch("https://api.github.com/users/hiteshchoudhary");
    let json = await response.json();
    return json;
}