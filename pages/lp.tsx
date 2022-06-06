import Head from 'next/head'
import { useEffect } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import GUI from 'lil-gui'

import LpStyle from '../styles/Lp.module.css'

const lp = () => {
  useEffect(() => {
    // UIデバック
    const gui = new GUI()

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
      flatShading: false // ポリゴン化
    })

    // UIデバックを設定
    gui.addColor(material, 'color')
    gui.add(material, 'metalness').min(0).max(1).step(0.001)
    gui.add(material, 'roughness').min(0).max(1).step(0.001)

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
    const meshes = [mesh1, mesh2, mesh3, mesh4]

    // パーティクル
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 700
    const positionArray = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount * 3; i++) {
      positionArray[i] = Math.random() - 0.5
    }
    particlesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positionArray, 3)
    )

    // パーティクルマテリアル
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.025,
      color: '#fafafa'
    })

    // パーティクルのメッシュ化
    const particles = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particles)

    // ライト
    const directionalLight = new THREE.DirectionalLight('#fafafa', 3)
    directionalLight.position.set(0.5, 1, 0)
    scene.add(directionalLight)

    // リサイズ
    window.addEventListener('resize', () => {
      sizes.width = window.innerWidth
      sizes.height = window.innerHeight

      camera.aspect = sizes.width / sizes.height
      camera.updateProjectionMatrix()

      renderer.setSize(sizes.width, sizes.height)
      renderer.setPixelRatio(window.devicePixelRatio)
    })

    // ホイール動作
    let speed = 0
    let rotation = 0
    window.addEventListener('wheel', (event) => {
      speed += event.deltaY * 0.0002
      console.log(speed)
    })

    const rot = () => {
      rotation += speed
      speed *= 0.93

      // ジオメトリ全体を回転させるようにする
      mesh1.position.x = 2 + 3.8 * Math.cos(rotation)
      mesh1.position.z = -3 + 3.8 * Math.sin(rotation)
      mesh2.position.x = 2 + 3.8 * Math.cos(rotation + Math.PI / 2)
      mesh2.position.z = -3 + 3.8 * Math.sin(rotation + Math.PI / 2)
      mesh3.position.x = 2 + 3.8 * Math.cos(rotation + Math.PI)
      mesh3.position.z = -3 + 3.8 * Math.sin(rotation + Math.PI)
      mesh4.position.x = 2 + 3.8 * Math.cos(rotation + 3 * (Math.PI / 2))
      mesh4.position.z = -3 + 3.8 * Math.sin(rotation + 3 * (Math.PI / 2))

      window.requestAnimationFrame(rot)
    }
    rot()

    // カーソルの動作
    const cursor = {
      x: 0,
      y: 0
    }
    window.addEventListener('mousemove', (event) => {
      cursor.x = event.clientX / sizes.width - 0.5
      cursor.y = event.clientY / sizes.height - 0.5
    })

    // アニメーション
    const clock = new THREE.Clock()
    const animate = () => {
      renderer.render(scene, camera)

      let getDeltaTime = clock.getDelta()

      // meshを回転
      for (const mesh of meshes) {
        mesh.rotation.x += 0.1 * getDeltaTime
        mesh.rotation.y += 0.1 * getDeltaTime
      }

      // カメラを制御する
      camera.position.x += cursor.x * getDeltaTime * 2
      camera.position.y += -cursor.y * getDeltaTime * 2

      window.requestAnimationFrame(animate)
    }

    animate()
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
