import Head from 'next/head'
import { useEffect } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import GUI from 'lil-gui'

import LpStyle from '../styles/Lp.module.css'
import mitt from 'next/dist/shared/lib/mitt'

const lp = () => {
  useEffect(() => {
    // canvasを取得
    const canvas = document.querySelector('.webgl')

    // シーン
    const scene = new THREE.Scene()

    // サイズ
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    }

    // カメラ
    const camera = new THREE.PerspectiveCamera(
      35,
      sizes.width / sizes.height,
      0.1,
      100
    )
    camera.position.z = 7
    scene.add(camera)

    // レンダラー
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas || undefined,
      alpha: true
    })
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.render(scene, camera)
  }, [])

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
