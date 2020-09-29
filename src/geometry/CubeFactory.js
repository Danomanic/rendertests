import * as THREE from 'three';

export class CubeFactory {
    constructor(scene) {
        this.scene = scene;
    }

    spawn(x, y, z, material) {
        const geo = new THREE.BoxGeometry(1, 1, 1)
        //const material = new THREE.MeshBasicMaterial({ color: colour, envMap: textureCube  });
        const cube = new THREE.Mesh(geo, material);
        cube.position.x = x;
        cube.position.y = y;
        cube.position.z = z;
        this.scene.add(cube);
    }
}