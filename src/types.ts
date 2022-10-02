// import type { Sprite } from "pixi.js";
import { Sprite, Texture } from "pixi.js";
export { Particle, Rule, ParticleType };

class Particle extends Sprite {
	color: string;
	vx: number = 0;
	vy: number = 0;
	constructor(texture: Texture, color: string, x: number = 0, y: number = 0) {
		super(texture);
		this.color = color;
		this.x = x;
		this.y = y;
		this.anchor.set(0.5);
	}

	distance(particle) {
		let dx = this.x - particle.x;
		let dy = this.y - particle.y;
		return [dx, dy, Math.sqrt(dx ** 2 + dy ** 2)];
	}
}

class Rule {
	source: ParticleType;
	target: ParticleType;
	force: number;
	constructor(source: ParticleType, target: ParticleType, force: number) {
		this.source = source;
		this.target = target;
		this.force = force;
	}
}

class ParticleType {
	texture: Texture;
	color: string;
	constructor(color: string, size: number) {
		this.color = color;

		let hole = document.getElementById("hidey-hole");
		let canvas = document.createElement("canvas");
		canvas.width = size;
		canvas.height = size;

		let ctx = canvas.getContext("2d");
		ctx.fillStyle = color;
		ctx.fillRect(0, 0, size, size);

		this.texture = Texture.from(canvas);
	}
	createParticle(random = true, x = 0, y = 0) {
		if (random) {
			let canvas = document.getElementById("canvas");
			let x = Math.round(Math.random() * canvas.clientWidth);
			let y = Math.round(Math.random() * canvas.clientHeight);
			let particle = new Particle(this.texture, this.color, x, y);
			return particle;
		} else {
			let particle = new Particle(this.texture, this.color, x, y);
			return particle;
		}
	}
}
