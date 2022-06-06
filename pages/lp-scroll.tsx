import Head from 'next/head'
import { useEffect } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import GUI from 'lil-gui'

import LpScroll from '../styles/LpScroll.module.css'

const lpScroll = () => {
  return (
    <>
      <Head>
        <title>Three.js LP Scroll Page</title>
        <meta name="description" content="Three.js LP Scroll Page" />
      </Head>

      <canvas id="canvas" className={LpScroll.canvas}></canvas>

      <main className={LpScroll.main}>
        <h1>Three.js LP Scroll Page</h1>

        <section className={LpScroll.section}>
          <h2>Lorem ipsum dolor sit amet</h2>
          <p>Lorem ipsum dolor sit amet</p>
        </section>

        <section className={LpScroll.section}>
          <h2>Lorem ipsum dolor sit amet</h2>
          <p>Lorem ipsum dolor sit amet</p>
        </section>

        <section className={LpScroll.section}>
          <h2>Lorem ipsum dolor sit amet</h2>
          <p>Lorem ipsum dolor sit amet</p>
        </section>
      </main>
    </>
  )
}

export default lpScroll
