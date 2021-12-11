const slugGenerator = (word: string, addDate = true): string => {
    const letters = {
        ą: "a",
        ä: "a",
        ę: "e",
        ż: "z",
        ź: "z",
        ó: "o",
        ö: "o",
        ł: "l",
        ć: "c",
        ń: "n",
        ś: "s",
        ü: "u",
        ß: "b",
        _: "-",
        "#": "-",
        "%": "-",
        "?": "-",
        " ": "-",
    };
    const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    //
    let result: string | string[] = word.toLowerCase().split("") as string[];
    result.forEach((character, index) => {
        if (Object.keys(letters).includes(character)) {
            (result as string[])[index] = (letters as any)[character];
        }
    });
    result = result.map((character) => {
        if (!alphabet.includes(character)) return "_";
        else return character;
    });
    //
    result = result.join("") as string;
    if (addDate) result += Date.now();

    return result;
};

export default slugGenerator;
