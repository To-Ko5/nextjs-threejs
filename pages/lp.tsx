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
    const canvas = document.getElementById('webGl')

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

    // オブジェクト
    // マテリアル
    const material = new THREE.MeshPhysicalMaterial({
      color: 'red',
      metalness: 0.86,
      roughness: 0.37,
      flatShading: true
    })

    // メッシュ
    const mesh1 = new THREE.Mesh(
      new THREE.TorusGeometry(1, 0.4, 16, 60),
      material
    )
    const mesh2 = new THREE.Mesh(new THREE.OctahedronGeometry(), material)
    const mesh3 = new THREE.Mesh(
      new THREE.TorusKnotGeometry(1, 0.4, 16, 60),
      material
    )
    const mesh4 = new THREE.Mesh(new THREE.IcosahedronGeometry(), material)

    // オブジェクトを配置
    mesh1.position.set(2, 0, 0)
    mesh2.position.set(-1, 0, 0)
    mesh3.position.set(2, 0, -6)
    mesh4.position.set(5, 0, 3)

    scene.add(mesh1, mesh2, mesh3, mesh4)

    // ライト
    const directionalLight = new THREE.DirectionalLight('#fafafafa', 3)
    directionalLight.position.set(0.5, 1, 0)
    scene.add(directionalLight)

    renderer.render(scene, camera)
  }, [])

  return (
    <>
      <Head>
        <title>Three.js LP</title>
        <meta name="description" content="Three.js demo site" />
      </Head>

      <canvas id="webGl" className={LpStyle.webgl}></canvas>

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
