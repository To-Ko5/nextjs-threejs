import { useEffect } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import GUI from 'lil-gui'

const meshMaterial = () => {
  useEffect(() => {
    let scene: THREE.Scene | THREE.Object3D<THREE.Event>,
      camera: THREE.PerspectiveCamera | THREE.Camera | any,
      renderer: THREE.WebGLRenderer,
      pointLight,
      controls,
      sphere:
        | THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>
        | THREE.Object3D<THREE.Event>,
      plane:
        | THREE.Object3D<THREE.Event>
        | THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>,
      octahedron:
        | THREE.Mesh<THREE.OctahedronGeometry, THREE.MeshBasicMaterial>
        | THREE.Object3D<THREE.Event>

    window.addEventListener('load', init)

    function init() {
      // シーン
      scene = new THREE.Scene()

      // カメラ
      camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        100
      )
      camera.position.set(1, 1, 2)

      // レンダラー
      renderer = new THREE.WebGLRenderer()
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      document.body.appendChild(renderer.domElement)

      /**
       * マテリアルセクション
       */

      // ジオメトリ
      const sphereGeometry = new THREE.SphereGeometry(0.5, 16, 16)
      const planeGeometry = new THREE.PlaneGeometry(1, 1)
      const octahedronGeometry = new THREE.OctahedronGeometry(0.5)

      // テクスチャ
      let textures = new THREE.TextureLoader().load(
        'https://source.unsplash.com/random/'
      )

      // マテリアル
      // const material = new THREE.MeshBasicMaterial({
      //   color: 'red',
      //   map: textures
      // })
      // // material.wireframe = true

      // // 裏側を描写する
      // material.side = THREE.DoubleSide
      // // 透過する
      // material.opacity = 0.5
      // material.transparent = true

      // マテリアル（MeshNormalMaterial）
      // const material = new THREE.MeshNormalMaterial()
      // material.flatShading = true
      // material.side = THREE.DoubleSide

      // マテリアル（MeshStandardMaterialは明かりが無いと表示されない）
      const material = new THREE.MeshStandardMaterial({ color: '#049ef4' })
      material.roughness = 0.4
      material.metalness = 0.55
      material.flatShading = true
      material.map = textures

      // 明かりを追加
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
      scene.add(ambientLight)
      const pointLight = new THREE.PointLight(0xffffff, 1)
      pointLight.position.set(1, 2, 3)
      scene.add(pointLight)
      const pointLightHelper = new THREE.PointLightHelper(pointLight, 1)
      scene.add(pointLightHelper)

      // メッシュ化
      sphere = new THREE.Mesh(sphereGeometry, material)
      plane = new THREE.Mesh(planeGeometry, material)
      octahedron = new THREE.Mesh(octahedronGeometry, material)

      sphere.position.x = -1.5
      octahedron.position.x = 1.5
      scene.add(sphere, plane, octahedron)

      // マウス操作
      const controls = new OrbitControls(camera, renderer.domElement)

      window.addEventListener('resize', onWindowResize)

      animate()
    }

    const clock = new THREE.Clock()

    function animate() {
      const elapsedTime = clock.getElapsedTime()

      // オブジェクトを回転させる
      sphere.rotation.x = elapsedTime
      plane.rotation.x = elapsedTime
      octahedron.rotation.x = elapsedTime

      sphere.rotation.y = elapsedTime
      plane.rotation.y = elapsedTime
      octahedron.rotation.y = elapsedTime

      // レンダリング
      renderer.setClearColor(0x000000, 1)
      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }

    // ブラウザのリサイズに対応
    function onWindowResize() {
      renderer.setSize(window.innerWidth, window.innerHeight)
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
    }
  })

  return <></>
}

export default meshMaterial
