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
      const material = new THREE.MeshBasicMaterial({
        color: 'red',
        map: textures
      })
      // material.wireframe = true
      // 裏側を描写する
      material.side = THREE.DoubleSide

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
      renderer.setClearColor(0x000000, 0)
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
