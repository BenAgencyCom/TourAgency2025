import type { NextPage, GetStaticProps } from "next";
import { GetCharacterResult, Character } from "../@types/rickandmortyapi";
import Image from "next/image";
import Link from "next/link";
import imageLoader from "../imageLoader";

const Home: NextPage<{ characters: Character[] }> = ({ characters }) => {
    return (
        <>
            <h1>Essa</h1>
            <ul>
                {characters.map((character) => {
                    return (
                        <li key={character.id}>
                            <Image
                                loader={imageLoader}
                                unoptimized={true}
                                src={character.image}
                                alt={character.name}
                                width="250"
                                height="250"
                            ></Image>
                            <h2>{character.name}</h2>
                            <Link href={`/characters/${character.id}`}>
                                <a> Read more</a>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

export const getStaticProps: GetStaticProps = async (context) => {
    const res = await fetch("https://rickandmortyapi.com/api/character");
    const { results }: GetCharacterResult = await res.json();

    return {
        props: {
            characters: results,
        },
    };
};

export default Home;
