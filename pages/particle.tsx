import { useEffect } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import GUI from 'lil-gui'

const particle = () => {
  useEffect(() => {
    // UIデバッグ
    const gui = new GUI()

    // サイズ
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    }

    // シーン
    const scene = new THREE.Scene()

    // カメラ
    const camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      100
    )
    camera.position.set(1, 1, 2)

    // レンダラー
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(window.devicePixelRatio)
    document.body.appendChild(renderer.domElement)

    // テクスチャ
    let textures = new THREE.TextureLoader().load(
      'https://source.unsplash.com/random/'
    )

    // パーティクル
    const particlesGeometry = new THREE.BufferGeometry()
    const count = 100
    // 3つの座標があるので3を掛ける
    const positionArray = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i++) {
      positionArray[i] = (Math.random() - 0.5) * 10
    }
    particlesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positionArray, 3)
    )

    // マテリアル
    const pointMaterial = new THREE.PointsMaterial({
      size: 0.5,
      sizeAttenuation: true, // cameraが近づいた時のサイズを変えるか
      transparent: true,
      alphaMap: textures,
      // alphaTest: 0.01,
      depthTest: true, // 深度のテスト
      depthWrite: false,
      color: 'red' // colorをつける
    })

    // メッシュ化
    const particles = new THREE.Points(particlesGeometry, pointMaterial)
    scene.add(particles)

    // マウス操作
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true

    window.addEventListener('resize', onWindowResize)

    const clock = new THREE.Clock()

    function animate() {
      const elapsedTime = clock.getElapsedTime()

      controls.update()

      // レンダリング
      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }

    // ブラウザのリサイズに対応
    function onWindowResize() {
      renderer.setSize(sizes.width, sizes.height)
      camera.aspect = sizes.width / sizes.height
      camera.updateProjectionMatrix()
    }

    animate()
  }, [])

  return <></>
}

export default particle
