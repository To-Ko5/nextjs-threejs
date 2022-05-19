import Head from 'next/head'
import { useEffect } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import GUI from 'lil-gui'

import LpStyle from '../styles/Lp.module.css'

const lp = () => {
  return (
    <>
      <Head>
        <title>Three.js LP</title>
        <meta name="description" content="Three.js demo site" />
      </Head>

      <canvas className={LpStyle.webgl}></canvas>

      <main className={LpStyle.main}>
        <div className={LpStyle.content}>
          <h1>Title</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
            dolore debitis voluptas
          </p>

          <button>Button</button>
        </div>
      </main>
    </>
  )
}

export default lp
