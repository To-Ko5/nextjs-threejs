import Head from 'next/head'
import { useEffect } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import GUI from 'lil-gui'

const lp = () => {
  return (
    <>
      <Head>
        <title>Three.js LP</title>
        <meta name="description" content="Three.js demo site" />
      </Head>
    </>
  )
}

export default lp
