import { useEffect } from 'react'
import * as THREE from 'three'

const one = () => {
  useEffect(() => {
    let scene, camera, renderer, pointLight

    // シーンの追加
    scene = new THREE.Scene()

    // カメラの追加
    camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.set(0, 0, +500)

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

    // 平行光源を追加
    let directionalLight = new THREE.DirectionalLight(0xffffff, 2)
    directionalLight.position.set(1, 1, 1)
    scene.add(directionalLight)

    // ポイント光源を追加
    pointLight = new THREE.PointLight(0xffffff, 2)
    pointLight.position.set(-200, -200, -200)
    scene.add(pointLight)

    // ポイント光源の場所の特定(ヘルパー)
    let pointLightHelper = new THREE.PointLightHelper(pointLight, 50)
    scene.add(pointLightHelper)

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
