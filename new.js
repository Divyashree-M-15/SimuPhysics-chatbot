let Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;

let engine;
let world;
let ground;
let ball;

function setup() {
  // Create canvas
  let canvas = createCanvas(600, 400);

  // Attach it to your simulation-placeholder div
  const container = document.querySelector('.simulation-container');
  container.appendChild(canvas.elt);
  

  engine = Engine.create();
  world = engine.world;
  Engine.run(engine);

  let groundOptions = {
    isStatic: true
  };
  ground = Bodies.rectangle(100, 380, 6000, 20, groundOptions);
  World.add(world, ground);

  let ballOptions = {
    restitution: 0.8
  };
  ball = Bodies.circle(200, 50, 20, ballOptions);
  World.add(world, ball);
}

  ground = Bodies.rectangle(200, 380, 400, 20, groundOptions);
  World.add(world, ground);


  let ballOptions = {
    restitution: 0.8 // Adjust bounciness
  };
  ball = Bodies.circle(200, 50, 20, ballOptions);
  World.add(world, ball);


function draw() {
  background(51);

  fill(255);
  noStroke();
  rectMode(CENTER);
  rect(ground.position.x, ground.position.y, 400, 20);

  ellipseMode(CENTER);
  ellipse(ball.position.x, ball.position.y, 40, 40);


