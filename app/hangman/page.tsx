"use client";
import React, { useEffect, useState } from "react";

const WordSpaces = ({
  word,
  correctGuesses,
}: {
  word: string;
  correctGuesses: string[];
}) => {
  return (
    <div className="flex flex-row gap-2 items-center">
      {word.split("").map((letter, i) => (
        <div key={i}>{correctGuesses.includes(letter) ? letter : "____"}</div>
      ))}
    </div>
  );
};

const Alphebet = ({
  onclick,
  guesses,
}: {
  onclick: (l: string) => void;
  guesses: string[];
}) => {
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

  return (
    <div className="gap-2 grid grid-cols-10 ">
      {alphabet
        .filter((l) => !guesses.includes(l))
        .map((letter) => {
          return (
            <div className="btn" onClick={() => onclick(letter)}>
              {letter}
            </div>
          );
        })}
    </div>
  );
};

const WordDefinition = ({ word }: { word: string }) => {
  const [definition, setDefinition] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log("loading:", loading);
    console.log("def:", definition);
  });

  const apiUrl = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${process
    .env.DICTIONARY_API_KEY!}`;

  const getDefinition = () => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then(
        (data) => setDefinition(data[0].meanings[0].definitions[0].definition) //adjust data destructure
      )
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  };

  //adjust render logic to get filled with missing definition message
  return (
    <>
      {!definition ? (
        <div onClick={() => getDefinition} className="btn">
          Get Definition
        </div>
      ) : loading ? (
        <div>loading...</div>
      ) : (
        <div>{definition}</div>
      )}
    </>
  );
};

const HangmanPage = () => {
  const [word, setWord] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [guesses, setGuesses] = useState<string[]>([]);

  useEffect(() => {
    fetch("https://random-word-api.herokuapp.com/word?number=1")
      .then((res) => res.json())
      .then((data) => setWord(data[0]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col gap-7 items-center">
      {loading ? (
        <>loading...</>
      ) : (
        <>
          <progress
            className="progress progress-warning w-56"
            value={
              guesses.filter((l) => !word.split("").includes(l)).length * 10
            }
            max="100"
          ></progress>
          <Alphebet
            onclick={(l: string) => setGuesses([...guesses, l])}
            guesses={guesses}
          />
          <WordSpaces
            word={word}
            correctGuesses={guesses.filter((l) => word.split("").includes(l))}
          />
          {word.split("").every((l) => guesses.includes(l)) && (
            <>
              <div className="btn" onClick={() => location.reload()}>
                New Word
              </div>
              <WordDefinition word={word} />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default HangmanPage;

// Use hangman ascii art:
//choose a fixed width font for ascii art
//use break for maintaining the different lines <br />
