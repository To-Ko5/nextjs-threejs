import * as THREE from 'three'
const one = () => {
  let scene, camera

  // シーンの追加
  scene = new THREE.Scene()

  // カメラの追加
  camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )

  return (
    <>
      <div></div>
    </>
  )
}

export default one
