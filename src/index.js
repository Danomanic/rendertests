import * as THREE from 'three';
import * as Stats from 'stats.js';
import { CameraControl } from './controls/CameraControl';
import { CubeFactory } from './geometry/CubeFactory';

var stats = new Stats();

var camera, scene, renderer, cameracontrol, raycaster, mouse = { x: 0, y: 0 }, INTERSECTED, loader, cubeMaterial, cubeFactory;

const initScene = function () {

  THREE.DefaultLoadingManager.onLoad = function () {
    hideLoading();
  };

  console.log('Scene Init()');

  loader = new THREE.TextureLoader();

  // SCENE
  scene = new THREE.Scene();
  // CAMERA
  var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
  var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 2000;
  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  scene.add(camera);
  camera.position.set(0, 10, 40);
  camera.lookAt(0, 0, 0);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  scene.background = new THREE.Color(0x006994);
  //scene.add(new THREE.GridHelper(100, 100));

  cubeFactory = new CubeFactory(scene);

  var materials = [
    new THREE.MeshBasicMaterial({ map: loader.load('/textures/cube/02.png') }),
    new THREE.MeshBasicMaterial({ map: loader.load('/textures/cube/02.png') }),
    new THREE.MeshBasicMaterial({ map: loader.load('/textures/cube/01.png') }),
    new THREE.MeshBasicMaterial({ map: loader.load('/textures/cube/02.png') }),
    new THREE.MeshBasicMaterial({ map: loader.load('/textures/cube/02.png') }),
    new THREE.MeshBasicMaterial({ map: loader.load('/textures/cube/02.png') })
  ];

  for (let x = -25; x < 25; x++) {
    for (let z = -25; z < 25; z++) {
      cubeFactory.spawn(x, 0, z, materials);
    }
  }

  cubeMaterial = new THREE.MeshBasicMaterial({
    map: loader.load('/textures/cube/00.png'),
  });

  cubeFactory.spawn(0, 1, 0, cubeMaterial);

  cubeFactory.spawn(10, 1, 0, cubeMaterial);

  cubeFactory.spawn(0, 1, 10, cubeMaterial);

  stats.showPanel(1); // 0: fps, 1: ms, 2: mb, 3+: custom
  document.body.appendChild(stats.dom);

  cameracontrol = new CameraControl(camera);

  document.body.addEventListener('keydown', cameracontrol.move, false);
  document.body.addEventListener("wheel", cameracontrol.scroll, false);
  document.body.appendChild(renderer.domElement);

};

function onMouseClick(e) {

  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = - (e.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(scene.children);

  INTERSECTED = intersects[0].object;
  cubeFactory.spawn(INTERSECTED.position.x, INTERSECTED.position.y + 1, INTERSECTED.position.z, cubeMaterial);

}

const initMouse = () => {
  raycaster = new THREE.Raycaster();
  renderer.domElement.addEventListener('click', onMouseClick, false);
}

var animate = () => {

  requestAnimationFrame(animate);

  stats.update();

  renderer.render(scene, camera);
};

const hideLoading = () => {
  var loadingScreen = document.getElementById("loading-screen");
  loadingScreen.remove();
}

const init = async () => {
  await initScene();
  await initMouse();
  await animate();
}


init();