let shapes = [];
let sounds = {};
let canvas;

function preload() {
  soundFormats('wav');
  sounds.circle = loadSound('Kick');
  sounds.rectangle = loadSound('Clap');
  sounds.triangle = loadSound('Hat');
  sounds.ellipse = loadSound('Chord'); // Example additional sound
  sounds.square = loadSound('Chord2'); // Example additional sound
  // Add more sound preloads here as needed
}

function setup() {
  canvas = createCanvas(600, 400);
  canvas.parent('container');
  noLoop(); // Prevent draw from looping
}

function mouseClicked(event) {
  // Check if the mouse click occurred inside the canvas boundaries
  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
      const shapeType = random(['circle', 'rectangle', 'triangle', 'ellipse', 'square']); // Add more shapes as needed
      const shapeColor = color(random(255), random(255), random(255), 150); // Random color with some transparency
      const size = random(10, 50); // Random size

      // Play the corresponding sound for the shape
      if (sounds[shapeType]) {
          sounds[shapeType].play();
      }

      shapes.push({ type: shapeType, x: 0, y: random(height), size: size, shapeColor: shapeColor, angle: random(TWO_PI) });

      loop(); // Start the draw loop
  }
}

function draw() {
  background(255, 255, 200, 35); // Clear the canvas with some transparency to create a trail effect

  for (let i = 0; i < shapes.length; i++) {
    let shape = shapes[i];
    fill(shape.shapeColor);
    noStroke();

    push(); // Save the current state of transformation
    translate(shape.x, shape.y); // Move to the shape's position
    rotate(shape.angle); // Rotate by the shape's angle

    if (shape.type === 'circle') {
      ellipse(0, 0, shape.size, shape.size);
    } else if (shape.type === 'rectangle') {
      rect(0, 0, shape.size, shape.size);
    } else if (shape.type === 'triangle') {
      triangle(0, -shape.size / 2, -shape.size / 2, shape.size / 2, shape.size / 2, shape.size / 2);
    } else if (shape.type === 'ellipse') {
      ellipse(0, 0, shape.size * 2, shape.size); // Ellipse with different dimensions
    } else if (shape.type === 'square') {
      rect(0, 0, shape.size, shape.size); // Square is essentially a rectangle
    }

    pop(); // Restore the previous state of transformation

    shape.x += 1; // Move the shape to the right
  }

  // Stop looping if all shapes are off the canvas
  if (shapes.every(shape => shape.x > width)) {
    noLoop();
  }
}
