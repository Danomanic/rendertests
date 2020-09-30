import * as THREE from 'three';
import * as Stats from 'stats.js';
import { CameraControl } from './controls/CameraControl';
import { CubeFactory } from './geometry/CubeFactory';
import { LoadingScreen } from './elements/LoadingScreen';
import { Surface } from './geometry/Surface';

const stats = new Stats();
const loadingScreen = new LoadingScreen();

let camera, scene, renderer, cameracontrol, raycaster, mouse = { x: 0, y: 0 }, loader, cubeFactory;

const initTextureLoader = () => {
  console.log('TextureLoader Initialised.');
  THREE.DefaultLoadingManager.onLoad = function () {
    loadingScreen.hide();
  };
  loader = new THREE.TextureLoader();
}

const initScene = function () {

  console.log('Scene Initialised.');

  scene = new THREE.Scene();
  // CAMERA
  const SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
  const VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 2000;
  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  scene.add(camera);
  camera.position.set(0, 10, 40);
  camera.lookAt(0, 0, 0);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  scene.background = new THREE.Color(0x006994);

  stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
  document.body.appendChild(stats.dom);
  document.body.appendChild(renderer.domElement);

};

const onMouseClick = (e) => {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = - (e.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(scene.children);
  const intersected = intersects[0].object;
  cubeFactory.spawn(intersected.position.x, intersected.position.y + 1, intersected.position.z, cubeMaterial);

}

const initMouse = () => {
  console.log('Mouse Initialised.');
  raycaster = new THREE.Raycaster();
  renderer.domElement.addEventListener('click', onMouseClick, false);
}

const initCameraControl = () => {
  console.log('CameraControl Initialised.');
  cameracontrol = new CameraControl(camera);

  document.body.addEventListener('keydown', cameracontrol.move, false);
  document.body.addEventListener("wheel", cameracontrol.scroll, false);
}

const initFactories = () => {
  console.log('Factories Initialised')
  
  cubeFactory = new CubeFactory(scene);
}

const initWorld = () => {
  console.log('World Initialised')
  new Surface(cubeFactory, loader).spawn();

  const cubeMaterial = new THREE.MeshBasicMaterial({
    map: loader.load('/textures/cube/00.png'),
  });

  cubeFactory.spawn(0, 1, 0, cubeMaterial);

  cubeFactory.spawn(10, 1, 0, cubeMaterial);

  cubeFactory.spawn(0, 1, 10, cubeMaterial);
}

const animate = () => {
  requestAnimationFrame(animate);
  stats.update();
  renderer.render(scene, camera);
};

const init = async () => {
  await initTextureLoader();
  await initScene();
  await initMouse();
  await initCameraControl();
  await initFactories();
  await initWorld();
  await animate();
}


init();