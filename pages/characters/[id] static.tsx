import Link from "next/link";
import type { GetStaticPathsResult, GetStaticPropsContext } from "next";
import type { Character, GetCharacterResult } from "../../@types/rickandmortyapi";

export default function CharacterPage({ character }: { character: Character }) {
    return (
        <>
            <Link href="/">
                <a>Menu</a>
            </Link>
            <h1>Name: {character.name}</h1>
        </>
    );
}

interface CharacterRouteParams {
    [key: string]: any;
    id: string;
}
export async function getStaticPaths(): Promise<GetStaticPathsResult<CharacterRouteParams>> {
    const res = await fetch("https://rickandmortyapi.com/api/character");
    const { results }: GetCharacterResult = await res.json();
    return {
        paths: results.map((character) => ({
            params: { id: String(character.id) },
        })),
        fallback: true,
    };
}

export const getStaticProps = async (context: GetStaticPropsContext<CharacterRouteParams>) => {
    const res = await fetch(`https://rickandmortyapi.com/api/character/${context.params?.id}`);
    const character: Character = await res.json();
    //
    return {
        props: {
            character,
        },
    };
};
