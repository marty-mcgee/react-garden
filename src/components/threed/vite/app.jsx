// ==============================================================
// RESOURCES

// ** NextJS Imports
import Image from "next/image"

// ** React Imports
import React, { useState, useEffect } from "react"

// ** Router Imports
import { Router, Link } from "wouter"

// ** CSS Imports
import styles from "~/styles/styles.css"

// Where all of our pages come from
import PageRouter from "~/components/router/router.jsx"

// The component that adds our meta tags to the page
import Seo from "~/components/seo/seo.jsx"

// ==============================================================
// REACT APP

// Home 'App' function that is reflected across the site
export default function Home() {
  return (
    <Router>
      <Seo />
      <main role="main" className={styles.wrapper}>
        <div className="content">
          {/* Router specifies which component to insert here as the main content */}
          <PageRouter />
        </div>
      </main>
      {/* Footer links to Home and About, Link elements matched in router.jsx */}
      <footer className={styles.footer}>
        <div className={styles.links}>
          <Link href="/">Home</Link>
          <span className={styles.divider}>|</span>
          <Link href="/about">About</Link>
        </div>
        <a
          className={styles["btn--remix"]}
          target="_top"
          href="https://glitch.com/edit/#!/remix/glitch-hello-react"
        >
          <Image src="https://cdn.glitch.com/605e2a51-d45f-4d87-a285-9410ad350515%2FLogo_Color.svg?v=1618199565140" alt="threed.ai on glitch" />
        </a>
      </footer>
    </Router>
  )
}
