import { useEffect } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const geometry = () => {
  useEffect(() => {
    //シーン
    const scene = new THREE.Scene()

    //カメラ
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    )
    camera.position.set(1, 1, 2)

    //レンダラー
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    document.body.appendChild(renderer.domElement)

    // ジオメトリ

    // 直方体
    const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
    // 球体
    const sphereGeometry = new THREE.SphereGeometry(0.3, 32, 16)
    // 平面
    const planeGeometry = new THREE.PlaneGeometry()
    // 地面
    const planeGeometryGround = new THREE.PlaneGeometry(10, 10)

    //マテリアル
    const material = new THREE.MeshNormalMaterial()

    // メッシュ
    const box = new THREE.Mesh(boxGeometry, material)
    const sphere = new THREE.Mesh(sphereGeometry, material)
    const plane = new THREE.Mesh(planeGeometry, material)
    const planeGround = new THREE.Mesh(planeGeometryGround, material)
    sphere.position.x = 1
    plane.position.x = -1
    planeGround.rotation.x = -Math.PI * 0.5
    planeGround.position.y = -0.5
    scene.add(box, sphere, plane, planeGround)

    //ライト
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
    scene.add(ambientLight)

    //マウス操作
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true

    window.addEventListener('resize', onWindowResize)

    const clock = new THREE.Clock()

    function animate() {
      const elapsedTime = clock.getElapsedTime()
      // console.log(elapsedTime);

      //オブジェクトの回転
      // sphere.rotation.x = elapsedTime;
      // plane.rotation.x = elapsedTime;
      // octahedron.rotation.x = elapsedTime;
      // torus.rotation.x = elapsedTime;

      // sphere.rotation.y = elapsedTime;
      // plane.rotation.y = elapsedTime;
      // octahedron.rotation.y = elapsedTime;

      // torus.rotation.y = elapsedTime;

      controls.update()

      //レンダリング
      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }

    //ブラウザのリサイズに対応
    function onWindowResize() {
      renderer.setSize(window.innerWidth, window.innerHeight)
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
    }

    animate()
  }, [])

  return <></>
}

export default geometry
