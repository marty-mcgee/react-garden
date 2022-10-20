import * as React from "react"
/* ADD IMPORTS FROM TODO ON THE NEXT LINE */

/**
* The About function defines the component that makes up the About page
* This component is attached to the /about path in router.jsx
*/

export default function About() {
  /* DECLARE STYLE AND TRIGGER FOR WIGGLE EFFECT FROM TODO ON NEXT LINE */

  return (
    <div className="page">
      <h1 className="title">
        About threed.ai
      </h1>
      <p>
        <em>
          If you&apos;re completely new to React, learning the{" "}
          <a href="https://reactjs.org/docs/hello-world.html">main concepts</a>{" "}
          will get you off to a great start.You&apos;ll also see comments and links
          to supporting resources throughout the code.
        </em>
      </p>
      <p>
        This page is a great spot to tell the world a few details about your new
        threed app! Check out your project&apos;s <code>README.md</code> file
        to learn more about how to customize your content.
      </p>
      <p>
        The ThreeD + Glitch community is glad to welcome you, and the Internet is better
        when it&apos;s made by real people. We can&apos;t wait to see what you create!
      </p>
      <p>
        Built with <a href="https://reactjs.org/">react</a> and{" "}
        <a href="https://vitejs.dev/">vite</a> on{" "}
        <a href="https://threed.ai/">threed.ai</a>
      </p>
    </div>
  )
}
