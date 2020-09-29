import * as THREE from 'three';

const Player = function() {

    this.get = function() {
        var geometry = new THREE.BoxGeometry(1, 1, 1);
        var material = new THREE.MeshBasicMaterial({ color: 0xf4a261 });
        var player = new THREE.Mesh(geometry, material);
        return player;
    }
}

export { Player };