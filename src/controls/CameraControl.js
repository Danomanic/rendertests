const CameraControl = function(camera) {

  this.camera = camera;

  this.updateZoom = (position) => {
    const target = (this.camera.position.y + position);
    if (target >= 5 && target <= 10) {
      this.camera.position.y += position;
    }
  }

  this.updateZ = (position) => {
    const target = (this.camera.position.z + position);
    if(target >= -10 && target <= 40) {
      this.camera.position.z += position;
    }
  }


  this.updateX = (position) => {
    const target = (this.camera.position.x + position);
    if(target >= -24 && target <= 24)
      this.camera.position.x += position;
  }

  this.move = (event) => {
    switch (event.keyCode) {
      case 83: // S
        this.updateZ(1);
        break;
      case 87: // W
        this.updateZ(-1);
        break;
      case 68: // D
        this.updateX(1);
        break;
      case 65: // A
        this.updateX(-1);
        break;
      case 38: // Up
        this.updateZoom(1);
        break;
      case 40: // Up
        this.updateZoom(-1);
        break;
    }
  }

  this.scroll = (e) => {
    this.updateZoom(e.deltaY / 100);
    return false;
  }

}

export { CameraControl };