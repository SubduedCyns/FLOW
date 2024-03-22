let cols; let rows; let size = 50;
let arrows = []; let r = size/2;
let xoff = 0; let yoff = 0; let zoff = 0; let increment = 0.1;

let particles = [];
let num = 100;

function setup() {
  var cnv = createCanvas(1100, 800);
  cnv.position((windowWidth-width)/2, 30);
  cols = width/size;
  rows = height/size;
  angleMode(DEGREES);
  for (let i=0; i<num; i++) {
    particles[i] = new Particle(random(0, width), random(0, height));
  }
  background(0);
}

function draw() {
	  background(0);

  fill(0);
  stroke(255);
  xoff = 0;
  for (let i=0; i<cols; i++) {
    arrows[i] = [];
    yoff = 0;
    for (let j=0; j<rows; j++) {
      let angle = map(noise(xoff, yoff, zoff), 0, 1, 0, 360);
       //rect(i*size, j*size, size, size);
       //text(round(angle, 2), size/2+i*size, size/2+j*size);
      arrows[i][j] = createVector(cos(angle), sin(angle));
      
       let pt0 = createVector(size/2+ i*size, size/2+j*size);
       let pt1 = createVector(r*arrows[i][j].x, r*arrows[i][j].y);
       line(pt0.x, pt0.y, pt0.x + pt1.x, pt0.y + pt1.y);
       ellipse(pt0.x , pt0.y , 5, 5);

      yoff += increment;
    }
    xoff += increment;
    zoff += 0.001; 
  }
  
  for (let i=0; i<num; i++) {
		particles[i].checkEdges();
    particles[i].direction(arrows);
    particles[i].update();
    particles[i].display();
  }
  
}

