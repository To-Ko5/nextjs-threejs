import { useEffect } from 'react'
import * as THREE from 'three'

const one = () => {
  useEffect(() => {
    let scene, camera, renderer

    // シーンの追加
    scene = new THREE.Scene()

    // カメラの追加
    camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.set(0, 0, 500)

    // レンダラーの追加
    renderer = new THREE.WebGLRenderer({ alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    // ジオメトリを追加
    let ballGeometry = new THREE.SphereGeometry(100, 64, 32)

    // マテリアルを追加
    let ballMaterial = new THREE.MeshPhysicalMaterial()

    // メッシュ化
    let ballMesh = new THREE.Mesh(ballGeometry, ballMaterial)
    scene.add(ballMesh)

    // レンダリング
    renderer.render(scene, camera)
  }, [])

  return (
    <>
      <div></div>
    </>
  )
}

export default one
