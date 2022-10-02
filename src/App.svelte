<script lang="ts">
	import { Application, Sprite, ParticleContainer } from "pixi.js";
	import { tick } from "svelte";
	import { Particle, ParticleType, Rule } from "./types.js";

	const PARTICLESIZE = 5;
	let rules: Rule[] = [];
	let g = 1;
	// let particles: Particle[] = [];

	// const canvas = document.getElementById("canvas") as HTMLCanvasElement;
	// canvas.getContext("webgl")
	let canvas = document.getElementById("canvas") as HTMLCanvasElement;
	let app = new Application({
		view: canvas,
		backgroundAlpha: 0,
		resizeTo: canvas,
	});

	// if (document.getElementById("view") !== null) document.getElementById("view").remove(); //get rid of cloned view bc hmr does that
	// document.body.appendChild(app.view);
	// app.view.id = "view";

	let particleContainer = new ParticleContainer();
	app.stage.addChild(particleContainer);

	const RED = new ParticleType("#f00", PARTICLESIZE);
	rules.push(new Rule(RED, RED, -1));
	// rules.push(new Rule(RED, RED, 0.5));
	for (let i = 0; i < 1000; i++) {
		let particle = RED.createParticle();
		particleContainer.addChild(particle);
	}

	app.ticker.add((delta) => {
		// console.log("hello");
		for (let rule of rules) {
			for (let i = 0; i < particleContainer.children.length; i++) {
				let a = particleContainer.children[i] as Particle;
				if (a.color === rule.source.color) {
					for (let j = 0; j < particleContainer.children.length; j++) {
						let b = particleContainer.children[j] as Particle;
						if (b.color === rule.target.color) {
							let [dx, dy, d] = a.distance(b);
							if (d > 0 && d < 200) {
								let force = (rule.force * 1) / d;
								let fx = force * dx;
								let fy = force * dy;
								a.vx = (a.vx + fx) / 2;
								a.vy = (a.vy + fy) / 2;
							}
						}
					}
				}
			}
		}
		for (let i = 0; i < particleContainer.children.length; i++) {
			let particle = particleContainer.children[i] as Particle;
			if (particle.x > app.view.width || particle.x < 0) particle.vx *= -1;
			if (particle.y > app.view.height || particle.y < 0) particle.vy *= -1;
			particle.x += particle.vx;
			particle.y += particle.vy;
		}
	});
</script>

<main />
