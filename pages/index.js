import "bootstrap/dist/css/bootstrap.min.css";
import Head from "next/head";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Teleprompter from "../components/Teleprompter";
import React from "react";

const INITIAL_TEXT = `This is a test to see how things work. This should scroll as you approach the next word. If all goes well you can talk and it will move along.`;

export default function Home() {
  const [show, setShow] = React.useState(false);
  const [listening, setListening] = React.useState(false);
  const [words, setWords] = React.useState(INITIAL_TEXT.split(" "));
  const [progress, setProgress] = React.useState(0);
  const [fontSize, setFontSize] = React.useState(3);

  const handleInput = (e) => {
    setWords(e.target.value.split(" "));
    progress && setProgress(0);
  };

  const handleListening = () => {
    if (listening) {
      setListening(false);
    } else {
      setProgress(0);
      setListening(true);
    }
  };

  const handleReset = () => setProgress(0);

  const handleChange = (progress) => setProgress(progress);

  return (
    <Container fluid="md">
      <Head>
        <title>Teleprompter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Welcome to{" "}
          <a target="__blank" href="https://en.wikipedia.org/wiki/Teleprompter">
            Teleprompter!
          </a>
        </h1>

        <p className="description mt-4">
          Teleprompter’s user-friendly app shows your script while you record so
          you nail your video the first time.
        </p>

        <p className="mt-4 text-left">How to use?</p>
        <ol>
          <li>Paste your content in text area below</li>
          <li>
            Click <code>Start Teleprompter</code> button
          </li>
          <li>Give permission for Audio device when modal opens</li>
          <li>Start speaking and it will move the content as you speak</li>
        </ol>

        <div style={{ width: "80%" }} className="mt-3 m-auto">
          <p>Paste your content in text area below...</p>
          <FloatingLabel controlId="floatingTextarea2">
            <Form.Control
              onChange={handleInput}
              value={words.join(" ")}
              as="textarea"
              placeholder="Paste your content here!"
              style={{ height: "100px", width: "100%", padding: "6px" }}
            />
          </FloatingLabel>
        </div>
        <div className="d-flex justify-content-center">
          <Button
            className="mt-4 text-center"
            variant="primary"
            onClick={() => {
              setShow(true);
              handleListening();
            }}
          >
            Start Teleprompter!
          </Button>
        </div>
      </main>

      <footer className="fixed-bottom bg-white">
        <a
          href="https://github.com/avanish-patel"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made with ❤️ and ☕️ by Avanish Patel
        </a>
      </footer>

      <Modal
        show={show}
        fullscreen={true}
        onHide={() => {
          setShow(false);
          setListening(false);
        }}
      >
        <Modal.Header
          className="bg-black"
          // className="btn-close-white"
          closeButton
          closeVariant="white"
        >
          <div className="d-flex">
            <div className="wrapper">
              <span className="minus" onClick={() => setFontSize(fontSize - 1)}>
                -
              </span>
              <span className="num"> {fontSize} </span>
              <span className="plus" onClick={() => setFontSize(fontSize + 1)}>
                +
              </span>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body className="bg-black">
          <Teleprompter
            fontSize={fontSize}
            words={words}
            listening={listening}
            progress={progress}
            onChange={handleChange}
          />
        </Modal.Body>
      </Modal>
      <style jsx>{`
        main {
          padding: 5rem 0;
        }

        .wrapper {
          height: 40px;
          min-width: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
        }
        .wrapper span {
          width: 100%;
          text-align: center;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          user-select: none;
        }
        .wrapper span.num {
          font-size: 15px;
          border-right: 2px solid rgba(0, 0, 0, 0.2);
          border-left: 2px solid rgba(0, 0, 0, 0.2);
          pointer-events: none;
        }
        footer {
          width: 100%;
          height: 60px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        a:hover {
          text-decoration: none !important;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          font-weight: 900;
          line-height: 1.15;
          font-size: 3rem;
          text-align: center;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          // padding: 0.75rem;
          // font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .container {
            margin: 10px;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </Container>
  );
}
