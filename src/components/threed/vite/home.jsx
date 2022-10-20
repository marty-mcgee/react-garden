import * as React from "react";
import { animated } from "react-spring";
import { useWiggle } from "../hooks/wiggle";
import { Link } from "wouter";

// Our language strings for the header
const strings = [
  "hello threed.ai",
  "word = HEY HEY HEY",
  "Salut threed.ai",
  "Hola threed.ai",
  "안녕 threed.ai",
  "Hej threed.ai"
];

// Utility function to choose a random value from the language array
function randomLanguage() {
  return strings[Math.floor(Math.random() * strings.length)];
}

/**
* The Home function defines the content that makes up the main content of the Home page
*
* This component is attached to the /about path in router.jsx
* The function in app.jsx defines the page wrapper that this appears in along with the footer
*/

export default function Home() {
  /* We use state to set the word string from the array https://reactjs.org/docs/hooks-state.html
     - We'll call setWord when the user clicks to change the string
  */
  const [word, setWord] = React.useState(strings[0]);

  /* The wiggle function defined in /hooks/wiggle.jsx returns the style effect and trigger function
     - We can attach this to events on elements in the page and apply the resulting style
  */
  const [style, trigger] = useWiggle({ x: 5, y: 5, scale: 1 });

  // When the user clicks we change the header language
  const handleChangeWord = () => {

    // Choose a new Word from our languages
    const newWord = randomLanguage();

    // Call the function to set the state string in our component
    setWord(newWord);
  };
  return (
    <>
      <h1 className="title">{word}</h1>
      {/* When the user hovers over the image we apply the wiggle style to it */}
      <animated.div onMouseEnter={trigger} style={style}>
        <img
          src="https://cdn.glitch.com/2f80c958-3bc4-4f47-8e97-6a5c8684ac2c%2Fillustration.svg?v=1618196579405"
          className="illustration"
          onClick={handleChangeWord}
          alt="Illustration click to change language"
        />
      </animated.div>
      <div className="navigation">
        {/* When the user hovers over this text, we apply the wiggle function to the image style */}
        <animated.div onMouseEnter={trigger}>
          <a className="btn--click-me" onClick={handleChangeWord}>
            Psst, click me
          </a>
        </animated.div>
      </div>
      <div className="instructions">
        <h2>Using this project</h2>
        <p>
          This is a <strong>threed.ai</strong> project. You can use
          it to build your own app. See more info in the{" "}
          <Link href="/about">About</Link> page, and check out README.md in the
          editor for additional detail plus next steps you can take.
        </p>
      </div>
    </>
  );
}
