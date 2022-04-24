import { useEffect } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const one = () => {
  useEffect(() => {
    let scene: THREE.Object3D<THREE.Event> | THREE.Scene,
      camera: THREE.PerspectiveCamera | THREE.Camera | THREE.CubeCamera,
      renderer: THREE.WebGLRenderer,
      pointLight: THREE.Object3D<THREE.Event> | THREE.PointLight,
      controls

    window.addEventListener('load', init)

    function init() {
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
      renderer.setPixelRatio(window.devicePixelRatio)
      document.body.appendChild(renderer.domElement)

      // テクスチャーを追加
      let textures = new THREE.TextureLoader().load(
        'https://source.unsplash.com/random/'
      )

      // ジオメトリを追加
      let ballGeometry = new THREE.SphereGeometry(100, 64, 32)

      // マテリアルを追加
      let ballMaterial = new THREE.MeshPhysicalMaterial({ map: textures })

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

      // マウス操作を追加
      controls = new OrbitControls(camera, renderer.domElement)

      window.addEventListener('resize', onWindowResize)
      animate()
    }

    // ブラウザのリサイズに対応
    function onWindowResize() {
      // サイズを随時更新する
      renderer.setSize(window.innerWidth, window.innerHeight)

      // カメラのアスペクト比を随時合わせる
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
    }

    // ポイント光源を周回させる動きを付ける
    function animate() {
      pointLight.position.set(
        200 * Math.sin(Date.now() / 500),
        200 * Math.sin(Date.now() / 1000),
        200 * Math.cos(Date.now() / 500)
      )

      // レンダリング
      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }
  }, [])

  return (
    <>
      <div></div>
    </>
  )
}

export default one
