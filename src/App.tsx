import { useEffect, useState } from 'react';
import styled from "styled-components";
import IceAndFire from "../components/IceAndFire";
import { Character } from "../interfaces/Characters";

const ParentDiv = styled.div`
    width: 100vw;
    margin: auto;
    background-color: #8a003c;
    display: block;
    text-align: center;
`;

export default function App() {

    // useState Hook to store Data.
    const [data, setData] = useState<Character[]>([]);

    // useEffect Hook for error handling and re-rendering.
    useEffect(() => {
        async function fetchData(): Promise<void> {
            const pages = Array.from({ length: 20 }, (_, i) => i + 1);
            const pageSize = 50;
            const characterURLs: string[] = [];

            // Fetch character lists from multiple pages
            const responses: Character[][] = await Promise.all(
                pages.map(page =>
                    fetch(`https://anapioficeandfire.com/api/characters?page=${page}&pageSize=${pageSize}`)
                        .then(response => response.json())
                )
            );

            // Collect URLs of characters with known names
            responses.forEach((data: Character[]) => {
                const knownCharacters = data.filter((char: Character) => char.name);
                characterURLs.push(...knownCharacters.map((char: Character) => char.url));
            });

            // Fetch full details for each character URL
            const characterDetails: Character[] = await Promise.all(
                characterURLs.map(url =>
                    fetch(url).then(response => response.json())
                )
            );

            setData(characterDetails);
        }

        fetchData()
            .then(() => console.log("Data fetched successfully"))
            .catch((e: Error) => console.log("There was an error: " + e));
    }, [data.length]);

    return (
        <ParentDiv>
            <IceAndFire data={data} />
        </ParentDiv>
    );
}
