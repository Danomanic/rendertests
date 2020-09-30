import * as THREE from 'three';

export class Surface {
    constructor(cubeFactory, loader) {
        this.cubeFactory = cubeFactory;
        this.loader = loader;
    }

    spawn(x, y, z, material) {
        var materials = [
            new THREE.MeshBasicMaterial({ map: this.loader.load('/textures/cube/02.png') }),
            new THREE.MeshBasicMaterial({ map: this.loader.load('/textures/cube/02.png') }),
            new THREE.MeshBasicMaterial({ map: this.loader.load('/textures/cube/01.png') }),
            new THREE.MeshBasicMaterial({ map: this.loader.load('/textures/cube/02.png') }),
            new THREE.MeshBasicMaterial({ map: this.loader.load('/textures/cube/02.png') }),
            new THREE.MeshBasicMaterial({ map: this.loader.load('/textures/cube/02.png') })
        ];

        for (let x = -25; x < 25; x++) {
            for (let z = -25; z < 25; z++) {
                this.cubeFactory.spawn(x, 0, z, materials);
            }
        }
    }
}