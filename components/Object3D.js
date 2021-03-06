import * as Three from 'three';

export default class Object3D {
  constructor(width, height, plan, ratio) {
    this.width = width;
    this.height = height;
    this.ratio = ratio;
    this.plan = plan;

    this.width *= this.ratio;
    this.height *= this.ratio;

    this.material = null;
  }

  get points() {
    let points = [];

    switch (this.plan) {
      case 'x':
        points = [
          {z: 0*this.width + this.position.z, y: 0*this.height + this.position.y, x: this.position.x}, // bottom - left
          {z: 0*this.width + this.position.z, y: 1*this.height + this.position.y, x: this.position.x}, // top - left
          {z: 1*this.width + this.position.z, y: 1*this.height + this.position.y, x: this.position.x}, // top - right
          {z: 1*this.width + this.position.z, y: 0*this.height + this.position.y, x: this.position.x}  // bottom - right
        ];
        break;
      case 'y':
        points = [
          {x: 0*this.width + this.position.x, z: 0*this.height + this.position.z, y: this.position.y}, // bottom - left
          {x: 0*this.width + this.position.x, z: 1*this.height + this.position.z, y: this.position.y}, // top - left
          {x: 1*this.width + this.position.x, z: 1*this.height + this.position.z, y: this.position.y}, // top - right
          {x: 1*this.width + this.position.x, z: 0*this.height + this.position.z, y: this.position.y}  // bottom - right
        ];
        break;
      case 'z':
        points = [
          {x: 0*this.width + this.position.x, y: 0*this.height + this.position.y, z: this.position.z}, // bottom - left
          {x: 0*this.width + this.position.x, y: 1*this.height + this.position.y, z: this.position.z}, // top - left
          {x: 1*this.width + this.position.x, y: 1*this.height + this.position.y, z: this.position.z}, // top - right
          {x: 1*this.width + this.position.x, y: 0*this.height + this.position.y, z: this.position.z}  // bottom - right
        ];
        break;
    }

    return points;
  }

  /**
   * Clipping around by wall
   * @param Wall wall
   */
  clippingByWall(wall) {
    if (!this.material.clippingPlanes) {
      this.material.clippingPlanes = [];
    }

    let localPlane = null;

    switch (this.plan) {
      case 'x':
        localPlane = new Three.Plane(new Three.Vector3(0, 0, -1), wall.width/2 + wall.position.z);
        this.material.clippingPlanes.push(localPlane);
        localPlane = new Three.Plane(new Three.Vector3(0, 0, 1), wall.width/2 - wall.position.z);
        this.material.clippingPlanes.push(localPlane);

        localPlane = new Three.Plane(new Three.Vector3(0, -1, 0), wall.height/2 + wall.position.y);
        this.material.clippingPlanes.push(localPlane);
        localPlane = new Three.Plane(new Three.Vector3(0, 1, 0), wall.height/2 - wall.position.y);
        this.material.clippingPlanes.push(localPlane);
        break;
      case 'y':
        localPlane = new Three.Plane(new Three.Vector3(1, 0, 0), wall.width/2 - wall.position.x);
        this.material.clippingPlanes.push(localPlane);
        localPlane = new Three.Plane(new Three.Vector3(-1, 0, 0), wall.width/2 + wall.position.x);
        this.material.clippingPlanes.push(localPlane);

        localPlane = new Three.Plane(new Three.Vector3(0, 0, -1), wall.height/2 + wall.position.z);
        this.material.clippingPlanes.push(localPlane);
        localPlane = new Three.Plane(new Three.Vector3(0, 0, 1), wall.height/2 - wall.position.z);
        this.material.clippingPlanes.push(localPlane);
        break;
      case 'z':
        localPlane = new Three.Plane(new Three.Vector3(1, 0, 0), wall.width/2 - wall.position.x);
        this.material.clippingPlanes.push(localPlane);
        localPlane = new Three.Plane(new Three.Vector3(-1, 0, 0), wall.width/2 + wall.position.x);
        this.material.clippingPlanes.push(localPlane);

        localPlane = new Three.Plane(new Three.Vector3(0, -1, 0), wall.height/2 + wall.position.y);
        this.material.clippingPlanes.push(localPlane);
        localPlane = new Three.Plane(new Three.Vector3(0, 1, 0), wall.height/2 - wall.position.y);
        this.material.clippingPlanes.push(localPlane);
        break;
    }
  }
}
