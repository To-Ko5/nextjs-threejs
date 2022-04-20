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

    // レンダラーの追加
    renderer = new THREE.WebGLRenderer({ alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)
  }, [])

  return (
    <>
      <div></div>
    </>
  )
}

export default one
