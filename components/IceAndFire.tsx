import styled from "styled-components";
import { Character } from "../interfaces/Characters";

const AllCharsDiv = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    background-color: #fffdc4;
    margin: auto;
    width: 75%;
`;

const SingleCharDiv = styled.div<{ alive: boolean }>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 30%;
    padding: 2%;
    margin: 1%;
    background-color: ${(props) => (props.alive ? '#fffdc4' : 'black')};
    color: ${(props) => (!props.alive ? '#fffdc4' : 'black')};
    border: 5px solid ${(props) => (!props.alive ? 'black' : 'black')};
    font-family: 'Georgia', serif;
    text-align: center;
`;

const CuteH1 = styled.h1`
    font-size: calc(1em + 1.5vw);
`;

export default function IceAndFire(props: { data: Character[] }) {
    return (
        <div>
            <h2>Game of Thrones Characters</h2>
            <AllCharsDiv>
                {props.data.map((char) => (
                    <SingleCharDiv key={char.url} alive={!char.died}>
                        <CuteH1>{char.name || "Unknown"}</CuteH1>
                        <p>{char.gender}</p>
                        {char.aliases.length > 0 && <p>Alias: {char.aliases.join(", ")}</p>}
                        {char.died ? <p>Died: {char.died}</p> : <p>Alive</p>}
                    </SingleCharDiv>
                ))}
            </AllCharsDiv>
        </div>
    );
}
