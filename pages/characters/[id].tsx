import type { GetServerSideProps } from "next";
import type { Character } from "../../@types/rickandmortyapi";
import type { FunctionComponent } from "react";

import Link from "next/link";

const CharacterPage: FunctionComponent<{ character: Character }> = ({ character }) => {
    return (
        <>
            <Link href="/">
                <a>Menu</a>
            </Link>
            <h1>Name: {character.name}</h1>
        </>
    );
};
export default CharacterPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const res = await fetch(`https://rickandmortyapi.com/api/character/${context.query.id}`);
    const character = await res.json();

    return {
        props: {
            character,
        },
    };
};
