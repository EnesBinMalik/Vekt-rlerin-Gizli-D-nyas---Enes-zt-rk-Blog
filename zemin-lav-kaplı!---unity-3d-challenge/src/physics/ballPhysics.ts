import * as THREE from 'three';
import { GameObjectConfig, Vector3D } from '../types';
import { soundManager } from '../audio/soundManager';

export interface PhysicsControls {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  jump: boolean;
  // Analog inputs (-1 to 1)
  inputX?: number;
  inputY?: number;
}

export class BallPhysicsSimulation {
  public position: THREE.Vector3;
  public velocity: THREE.Vector3;
  public angularVelocity: THREE.Vector3;
  public radius: number = 0.55;
  public mass: number = 1.0;
  public isGrounded: boolean = false;
  public isInLava: boolean = false;
  public isFinished: boolean = false;
  public currentCheckpoint: Vector3D | null = null;
  public lavaLevel: number = 0.35;

  private gravity: number = -19.5;
  private ballMesh: THREE.Mesh | null = null;
  private rotationMatrix: THREE.Matrix4 = new THREE.Matrix4();

  // Temporary math helpers to prevent garbage collection
  private _box = new THREE.Box3();
  private _boxCenter = new THREE.Vector3();
  private _boxHalfSize = new THREE.Vector3();
  private _tempVec = new THREE.Vector3();
  private _normal = new THREE.Vector3();
  private _rotMatrix = new THREE.Matrix4();
  private _invRotMatrix = new THREE.Matrix4();
  private _localPos = new THREE.Vector3();

  constructor(startPos: Vector3D) {
    this.position = new THREE.Vector3(startPos.x, startPos.y, startPos.z);
    this.velocity = new THREE.Vector3(0, 0, 0);
    this.angularVelocity = new THREE.Vector3(0, 0, 0);
    this.currentCheckpoint = { ...startPos };
  }

  public setMesh(mesh: THREE.Mesh) {
    this.ballMesh = mesh;
  }

  public resetTo(pos: Vector3D) {
    this.position.set(pos.x, pos.y, pos.z);
    this.velocity.set(0, 0, 0);
    this.angularVelocity.set(0, 0, 0);
    this.isGrounded = false;
    this.isInLava = false;
    this.isFinished = false;
  }

  public respawn() {
    const target = this.currentCheckpoint || { x: 0, y: 5.5, z: 0 };
    this.resetTo(target);
  }

  public update(
    delta: number,
    objects: GameObjectConfig[],
    controls: PhysicsControls,
    cameraAngleY: number
  ) {
    if (this.isInLava || this.isFinished) return;

    // Fixed time-stepping sub-steps for solid physics without tunnelling
    const steps = 3;
    const subDelta = Math.min(delta, 0.05) / steps;

    for (let s = 0; s < steps; s++) {
      this.step(subDelta, objects, controls, cameraAngleY);
    }

    // Update 3D mesh transform and rolling orientation
    if (this.ballMesh) {
      this.ballMesh.position.copy(this.position);

      // Roll rotation derived from velocity
      const speed = Math.hypot(this.velocity.x, this.velocity.z);
      if (speed > 0.01) {
        const rollAxis = new THREE.Vector3(-this.velocity.z, 0, this.velocity.x).normalize();
        const rollAngle = (speed * delta) / this.radius;
        const q = new THREE.Quaternion().setFromAxisAngle(rollAxis, rollAngle);
        this.ballMesh.quaternion.premultiply(q);
      }
    }

    // Sound feedback
    const horizSpeed = Math.hypot(this.velocity.x, this.velocity.z);
    soundManager.updateRollingSound(horizSpeed, this.isGrounded);

    // Lava plane check
    if (this.position.y - this.radius <= this.lavaLevel) {
      this.isInLava = true;
      soundManager.playLavaSizzle();
    }
  }

  private step(
    dt: number,
    objects: GameObjectConfig[],
    controls: PhysicsControls,
    cameraAngleY: number
  ) {
    // 1. Apply Gravity
    this.velocity.y += this.gravity * dt;

    // 2. User Input / Driving Torque relative to camera direction
    let moveX = 0;
    let moveZ = 0;

    if (controls.inputX !== undefined && controls.inputY !== undefined) {
      moveX += controls.inputX;
      moveZ += controls.inputY;
    } else {
      if (controls.forward) moveZ += 1;
      if (controls.backward) moveZ -= 1;
      if (controls.left) moveX -= 1;
      if (controls.right) moveX += 1;
    }

    const inputLen = Math.hypot(moveX, moveZ);
    if (inputLen > 0.05) {
      const normX = moveX / Math.max(1, inputLen);
      const normZ = moveZ / Math.max(1, inputLen);

      // Rotate input vector by camera orientation
      const sin = Math.sin(cameraAngleY);
      const cos = Math.cos(cameraAngleY);
      const worldInputX = normX * cos + normZ * sin;
      const worldInputZ = -normX * sin + normZ * cos;

      const driveForce = this.isGrounded ? 18.0 : 7.0;
      this.velocity.x += worldInputX * driveForce * dt;
      this.velocity.z += worldInputZ * driveForce * dt;
    }

    // 3. User Jump
    if (controls.jump && this.isGrounded) {
      this.velocity.y = 8.5;
      this.isGrounded = false;
      soundManager.playBounce(0.8);
    }

    // 4. Air / Rolling Drag
    const drag = this.isGrounded ? 0.985 : 0.994;
    this.velocity.x *= Math.pow(drag, dt * 60);
    this.velocity.z *= Math.pow(drag, dt * 60);

    // 5. Integrate Position
    this.position.x += this.velocity.x * dt;
    this.position.y += this.velocity.y * dt;
    this.position.z += this.velocity.z * dt;

    // 6. Collision Resolution Against GameObjects
    this.isGrounded = false;

    for (let i = 0; i < objects.length; i++) {
      const obj = objects[i];
      this.resolveObjectCollision(obj, dt);
    }
  }

  private resolveObjectCollision(obj: GameObjectConfig, dt: number) {
    const objPos = new THREE.Vector3(obj.position.x, obj.position.y, obj.position.z);
    const objRot = new THREE.Euler(
      (obj.rotation.x * Math.PI) / 180,
      (obj.rotation.y * Math.PI) / 180,
      (obj.rotation.z * Math.PI) / 180,
      'XYZ'
    );
    const halfScale = new THREE.Vector3(obj.scale.x * 0.5, obj.scale.y * 0.5, obj.scale.z * 0.5);

    // Transform ball into object's local coordinate space
    this._rotMatrix.makeRotationFromEuler(objRot);
    this._invRotMatrix.copy(this._rotMatrix).invert();

    this._localPos.copy(this.position).sub(objPos);
    this._localPos.applyMatrix4(this._invRotMatrix);

    // Finish Ring Trigger check
    if (obj.type === 'finishRing') {
      const distToRingCenter = this._localPos.length();
      if (distToRingCenter < halfScale.x * 1.2 && Math.abs(this._localPos.z) < 1.0) {
        if (!this.isFinished) {
          this.isFinished = true;
          soundManager.playVictory();
        }
      }
      return;
    }

    // Checkpoint Trigger check
    if (obj.type === 'checkpoint') {
      if (
        Math.abs(this._localPos.x) < halfScale.x + this.radius &&
        Math.abs(this._localPos.z) < halfScale.z + this.radius &&
        this._localPos.y >= -halfScale.y &&
        this._localPos.y <= halfScale.y + this.radius * 2
      ) {
        if (
          !this.currentCheckpoint ||
          this.currentCheckpoint.x !== obj.position.x ||
          this.currentCheckpoint.z !== obj.position.z
        ) {
          this.currentCheckpoint = {
            x: obj.position.x,
            y: obj.position.y + 1.2,
            z: obj.position.z,
          };
          soundManager.playCheckpoint();
        }
      }
    }

    // Spinning obstacle kinematic motion
    if (obj.type === 'spinner' && obj.speed) {
      // Blade rotates around Y
      const distFromAxis = Math.hypot(this._localPos.x, this._localPos.z);
      if (distFromAxis <= halfScale.x + this.radius && Math.abs(this._localPos.y) <= halfScale.y + this.radius) {
        // Impact impulse
        const tangSpeed = obj.speed * distFromAxis * 1.5;
        const normLocal = new THREE.Vector3(-this._localPos.z, 0, this._localPos.x).normalize();
        normLocal.applyMatrix4(this._rotMatrix);
        this.velocity.addScaledVector(normLocal, tangSpeed);
        soundManager.playBounce(1.2);
      }
    }

    // Booster pad trigger
    if (obj.type === 'booster') {
      if (
        Math.abs(this._localPos.x) < halfScale.x &&
        Math.abs(this._localPos.z) < halfScale.z &&
        this._localPos.y > -0.2 &&
        this._localPos.y < halfScale.y + this.radius * 1.5
      ) {
        // Boost forward along local Z
        const fwd = new THREE.Vector3(0, 0, 1).applyMatrix4(this._rotMatrix).normalize();
        const boost = obj.boostPower || 12;
        this.velocity.addScaledVector(fwd, boost * dt * 8);
        soundManager.playBooster();
      }
    }

    // Trampoline high-bounce check
    const isTrampoline = obj.type === 'trampoline';

    // 1. Box / Platform / Ramp / Cylinder Closest Point on Bounds
    let closestX = Math.max(-halfScale.x, Math.min(halfScale.x, this._localPos.x));
    let closestY = Math.max(-halfScale.y, Math.min(halfScale.y, this._localPos.y));
    let closestZ = Math.max(-halfScale.z, Math.min(halfScale.z, this._localPos.z));

    if (obj.type === 'cylinder') {
      // Cylinder in local space aligned with Y axis
      const rad = halfScale.x;
      const horizDist = Math.hypot(this._localPos.x, this._localPos.z);
      if (horizDist > 0.001) {
        const clampedDist = Math.min(rad, horizDist);
        closestX = (this._localPos.x / horizDist) * clampedDist;
        closestZ = (this._localPos.z / horizDist) * clampedDist;
      }
    }

    // Distance vector from closest point on surface to ball center
    const localDiffX = this._localPos.x - closestX;
    const localDiffY = this._localPos.y - closestY;
    const localDiffZ = this._localPos.z - closestZ;
    const distSq = localDiffX * localDiffX + localDiffY * localDiffY + localDiffZ * localDiffZ;

    if (distSq < this.radius * this.radius && distSq > 0.000001) {
      const dist = Math.sqrt(distSq);
      const overlap = this.radius - dist;

      // Local collision normal
      const localNormal = new THREE.Vector3(
        localDiffX / dist,
        localDiffY / dist,
        localDiffZ / dist
      );

      // Transform normal back to world space
      const worldNormal = localNormal.clone().applyMatrix4(this._rotMatrix).normalize();

      // Push ball out of object
      this.position.addScaledVector(worldNormal, overlap);

      // Separate velocity along contact normal
      const velAlongNormal = this.velocity.dot(worldNormal);

      if (velAlongNormal < 0) {
        let bounciness = obj.bounciness ?? 0.1;
        if (isTrampoline && localNormal.y > 0.5) {
          // Launch ball upward!
          bounciness = 1.6;
          this.velocity.y = Math.max(12, Math.abs(this.velocity.y) * 1.4);
          soundManager.playBounce(1.5);
        }

        const restitution = isTrampoline ? 1.5 : Math.max(0.05, bounciness);
        const impulseMag = -(1 + restitution) * velAlongNormal;
        this.velocity.addScaledVector(worldNormal, impulseMag);

        // Apply surface friction tangential to contact
        const friction = obj.friction ?? 0.4;
        const tangentVel = this.velocity.clone().addScaledVector(worldNormal, -this.velocity.dot(worldNormal));
        this.velocity.addScaledVector(tangentVel, -friction * 0.15);

        // Check if grounded (normal points mostly upward)
        if (worldNormal.y > 0.4) {
          this.isGrounded = true;
          // Dampen tiny bounces
          if (Math.abs(this.velocity.y) < 0.6) {
            this.velocity.y = 0;
          }
        }
      }
    }
  }
}
