import { Button, Divider, Input } from 'antd';
import { useState } from 'react';
import { LetterPicker } from './letter-pickers/LetterPicker';
import { WordsProposal } from './WordsProposal';

export const Resolver = () => {
    const [knownLetters, setKnownLetters] = useState([]);
    const [rejectedLetters, setRejectedLetters] = useState('');

    return (
        <div>
            <Divider>Odrzucone litery</Divider>
            <Input
                placeholder="Odrzucone litery"
                value={rejectedLetters}
                onChange={(e) => setRejectedLetters(e.target.value)}
            />
            <Divider>Znane litery</Divider>
            {knownLetters.map((v, index) => (
                <LetterPicker
                    key={index}
                    letter={v}
                    removeLetter={() =>
                        setKnownLetters(
                            knownLetters.filter(
                                (iteratedLetter) => iteratedLetter !== v
                            )
                        )
                    }
                    setLetter={(v) => {
                        const nextLetters = [...knownLetters];
                        nextLetters[index] = v;
                        setKnownLetters(nextLetters);
                    }}
                />
            ))}
            <Button onClick={() => setKnownLetters([...knownLetters, {}])} style={{width: '100%', marginTop: '25px'}}>
                +
            </Button>
            <WordsProposal
                rejectedLetters={rejectedLetters}
                knownLetters={knownLetters}
            />
        </div>
    );
};
