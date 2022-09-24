import React from "react";
import stringSimilarity from "string-similarity";

const cleanWord = (word) =>
  word
    .trim()
    .toLocaleLowerCase()
    .replace(/[^a-z]/gi, "");

export default function Teleprompter({
  words,
  progress,
  listening,
  onChange,
  fontSize,
}) {
  const recognizeRef = React.useRef(null);
  const scrollRef = React.useRef(null);
  const [results, setResults] = React.useState("");

  React.useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    recognizeRef.current = new SpeechRecognition();
    recognizeRef.current.continuous = true;
    recognizeRef.current.interimResults = true;
  }, []);

  React.useEffect(() => {
    if (listening) {
      recognizeRef.current.start();
    } else {
      recognizeRef.current.stop();
    }
  }, [listening]);

  React.useEffect(() => {
    const handleResult = ({ results }) => {
      const interim = Array.from(results)
        .filter((r) => !r.isFinal)
        .map((r) => r[0].transcript)
        .join(" ");
      setResults(interim);

      const newIndex = interim.split(" ").reduce((memo, word) => {
        if (memo >= words.length) {
          return memo;
        }
        const similarity = stringSimilarity.compareTwoStrings(
          cleanWord(word),
          cleanWord(words[memo])
        );
        memo += similarity > 0.75 ? 1 : 0;
        return memo;
      }, progress);
      if (newIndex > progress && newIndex <= words.length) {
        onChange(newIndex);
      }
    };
    recognizeRef.current.addEventListener("result", handleResult);
    return () => {
      recognizeRef.current.removeEventListener("result", handleResult);
    };
  }, [onChange, progress, words]);

  React.useEffect(() => {
    /* eslint-disable no-unused-expressions */
    scrollRef.current
      .querySelector(`[data-index='${progress + 10}']`)
      ?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
  }, [progress]);

  return (
    <React.Fragment>
      <div
        ref={scrollRef}
        className="teleprompter"
        style={{ fontSize: `${fontSize}rem` }}
      >
        {words.map((word, i) => (
          <span
            key={`${word}:${i}`}
            data-index={i}
            style={{
              color: i < progress ? "#4a4a4a" : "#f8f8f8",
            }}
          >
            {word}{" "}
          </span>
        ))}
      </div>
      {results && <div className="interim">{results}</div>}

      <style jsx>{`
        .teleprompter {
          //   font-size: 5.25rem;
          width: 100%;
          //   scroll-behavior: smooth;
          display: block;
          margin-bottom: 1rem;
          //   background: transparent no-repeat;
          //   background-image: radial-gradient(
          //       farthest-side at 50% 0,
          //       rgba(0, 0, 0, 0.1),
          //       rgba(0, 0, 0, 0)
          //     ),
          //     radial-gradient(
          //       farthest-side at 50% 100%,
          //       rgba(0, 0, 0, 0.1),
          //       rgba(0, 0, 0, 0)
          //     );
          //   background-position: 0 0, 0 100%;
          //   background-size: 100% 14px;
        }

        .interim {
          background: rgb(0, 0, 0, 0.25);
          color: white;
          flex: 0 0 auto;
          padding: 0.5rem;
          border-radius: 1rem;
          display: inline-block;
        }
      `}</style>
    </React.Fragment>
  );
}
