import * as THREE from './three.js-master/build/three.module.js'
import {GLTFLoader} from './three.js-master/examples/jsm/loaders/GLTFLoader.js'
import {OrbitControls} from './three.js-master/examples/jsm/controls/OrbitControls.js'


const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()
scene.background =new THREE.Color("rgba(128, 128, 128)");


const loader = new GLTFLoader()
loader.load('assets/base.gltf', function (gltf) {
    console.log(gltf)
    const root = gltf.scene;
    root.scale.set(100, 100, 100)
    root.position.set(1, -10, 10)
    scene.add(root)
}, function (xhr) {
    console.log((xhr.loaded/xhr.total * 100) + '% loaded')
}, function (error) {
    console.log('Error loading')
})




const light = new THREE.HemisphereLight(0xffffff, "rgba(107, 107, 107)", 1)
light.position.set(5, 5, 0);
scene.add(light)
const lamp = new THREE.AmbientLight(0xffffff, .3)
lamp.position.set(0, 2, -4);
scene.add(lamp)


const targetObject = new THREE.Object3D();
scene.add(targetObject);

light.target = targetObject;


//Boiler plate code
const sizes = {
    width:window.innerWidth,
    height:window.innerHeight
}
const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.1, 100)
// camera.position.set(.2, 5, 10)
camera.position.z = -8;
camera.position.x = 0;
camera.position.y = 1;
camera.rotation.z = .2;
scene.add(camera)

const controls = new OrbitControls(camera, canvas)
 controls.enableZoom = true;
 controls.enableDamping = false;


const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap = true
renderer.gammaOutput = true

window.addEventListener('resize', function(){
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.update()
})

function animate() {
    requestAnimationFrame(animate);
  
    camera.rotation.z += 0.01;
  
  
    renderer.render(scene, camera);
  }
  
  animate();

