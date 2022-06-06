import Head from 'next/head'
import { useEffect } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import GUI from 'lil-gui'

import LpScroll from '../styles/LpScroll.module.css'

const lpScroll = () => {
  useEffect(() => {
    // canvasを取得
    const canvas = document.querySelector('#canvas')

    // シーン
    const scene = new THREE.Scene()

    // 背景を設定する
    let textures = new THREE.TextureLoader().load(
      'https://source.unsplash.com/random/'
    )
    scene.background = textures

    // サイズ
    const sizes = {
      width: innerWidth,
      height: innerHeight
    }

    // カメラ
    const camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      1000
    )

    // レンダラー
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas || undefined
    })
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(window.devicePixelRatio)

    // オブジェクト
    const boxGeometry = new THREE.BoxGeometry(5, 5, 5, 10)
    const boxMaterial = new THREE.MeshNormalMaterial()
    const box = new THREE.Mesh(boxGeometry, boxMaterial)
    box.position.set(0, 0.5, -15)
    box.rotation.set(1, 1, 0)
    scene.add(box)

    // アニメーション
    const tick = () => {
      window.requestAnimationFrame(tick)
      renderer.render(scene, camera)
    }
    tick()

    // ブラウザのリサイズ処理
    window.addEventListener('resize', () => {
      sizes.width = window.innerWidth
      sizes.height = window.innerHeight

      camera.aspect = sizes.width / sizes.height
      camera.updateProjectionMatrix()

      renderer.setSize(sizes.width, sizes.height)
      renderer.setPixelRatio(window.devicePixelRatio)
    })
  }, [])

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
