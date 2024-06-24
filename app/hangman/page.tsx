"use client";
import React, { useEffect, useState } from "react";

type WordSpacesProps = {
  word: string;
  correctGuesses: string[];
};

const WordSpaces = ({ word, correctGuesses }: WordSpacesProps) => {
  console.log(word);
  console.log(word.split(""));
  return (
    <div className="flex flex-row gap-2">
      {word.split("").map((letter, i) => (
        <div key={i}>{correctGuesses.includes(letter) ? letter : "____"}</div>
      ))}
    </div>
  );
};

const HangmanPage = () => {
  const [word, setWord] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [guesses, setGuesses] = useState<string[]>([]);

  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

  useEffect(() => {
    fetch("https://random-word-api.herokuapp.com/word?number=1")
      .then((res) => res.json())
      .then((data) => setWord(data[0]))
      .finally(() => setLoading(false));
  }, []);

  console.log(word);

  return (
    <div>
      <div className="mb-32">HangmanPage</div>

      <div className="flex flex-col gap-7 items-center">
        <progress
          className="progress progress-warning w-56"
          value={0}
          max="100"
        ></progress>
        {loading ? (
          <div>loading...</div>
        ) : (
          <div>
            <div className="gap-2 grid grid-cols-10 ">
              {alphabet
                .filter((l) => !guesses.includes(l))
                .map((letter) => {
                  return (
                    <div
                      className="btn"
                      onClick={() => setGuesses([...guesses, letter])}
                    >
                      {letter}
                    </div>
                  );
                })}
            </div>
            <WordSpaces
              word={word}
              correctGuesses={guesses.filter((l) => word.split("").includes(l))}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default HangmanPage;
