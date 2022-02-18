import { sampleSize } from 'lodash';
import { useEffect, useState } from 'react';
import { useFetch } from '../custom-hooks/useFetch';

export const WordsProposal = ({ rejectedLetters, knownLetters }) => {
    const [wordsProposal, setWordsProposal] = useState('');
    const [matchingWords, setMatchingWords] = useState([])
    const [allWords, loading] = useFetch(
        `${process.env.PUBLIC_URL}/data/words.json`
    );

    useEffect(() => {
        if (!allWords) return;
        const consideredKnownLetters = knownLetters.filter(
            (v) =>
                v.character &&
                v.position !== undefined &&
                v.isValidPosition !== undefined
        );

        const presentLetters = new Set(
            consideredKnownLetters.map((v) => v.character)
        );

        const proposals = allWords.filter((word) => {
            for (let letter of consideredKnownLetters) {
                const { character, position, isValidPosition } = letter;
                if (isValidPosition && word[position] !== character)
                    return false;
                if (!isValidPosition && word[position] === character)
                    return false;
            }

            for (let rejectedLetter of Array.from(rejectedLetters)) {
                if (word.includes(rejectedLetter)) return false;
            }

            for (let character of Array.from(presentLetters)) {
                if (!word.includes(character)) return false;
            }

            if (word.includes('-')) return false;
            return true;
        });
        setMatchingWords(proposals);
        setWordsProposal(sampleSize(proposals, 150).join(', '));
    }, [knownLetters, rejectedLetters, allWords]);
    if (loading) return 'Loading...';

    return (
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <div>Pasujących słów: {matchingWords.length}</div>
            <div>{wordsProposal}</div>
        </div>
    );
};
