// by 박건우 (2025)

let eyeOpen = true;
let mouthOpen = false;
let blinkTimer = 0;
let bgColor;

function setup() {
  createCanvas(400, 400);
  frameRate(30);
  bgColor = color(240, 195, 100); // 
}

function draw() {
  background(bgColor);

  // === 이름 텍스트 ===
  noStroke();
  fill(60, 40, 30);
  textAlign(CENTER, CENTER);
  textSize(28);
  textStyle(BOLD);
  text("박건우", width / 2, 40);

  // === 얼굴 ===
  stroke(0);
  strokeWeight(3);
  fill(255, 240, 210);
  ellipse(200, 230, 180, 180);

  // === 귀 ===
  fill(255, 230, 190);
  ellipse(120, 240, 35, 35);
  ellipse(280, 240, 35, 35);

  // === 눈 ===
  stroke(0);
  strokeWeight(3);
  fill(255);
  if (eyeOpen) {
    ellipse(165, 230, 40, 40);
    ellipse(235, 230, 40, 40);
    fill(0);
    ellipse(165, 230, 18, 24);
    ellipse(235, 230, 18, 24);
    fill(255);
    noStroke();
    ellipse(170, 225, 5, 5);
    ellipse(240, 225, 5, 5);
  } else {
    stroke(0);
    strokeWeight(4);
    line(145, 230, 185, 230);
    line(215, 230, 255, 230);
  }

  // === 눈썹 ===
  stroke(0);
  strokeWeight(5);
  noFill();
  arc(165, 205, 50, 20, PI, TWO_PI);
  arc(235, 205, 50, 20, PI, TWO_PI);

  // === 입 ===
  noStroke();
  if (mouthOpen) {
    fill(0);
    ellipse(200, 275, 60, 40);
    fill(255, 100, 100);
    ellipse(200, 275, 50, 30);
  } else {
    fill(0);
    arc(200, 275, 80, 40, 0, PI);
    fill(255, 100, 100);
    arc(200, 275, 70, 30, 0, PI);
  }

  // === 볼터치 ===
  fill(255, 170, 170, 120);
  ellipse(140, 250, 25, 15);
  ellipse(260, 250, 25, 15);

  // === 모자 ===
  noStroke();
  fill(190, 140, 90); // 윗면
  ellipse(200, 130, 160, 80);
  fill(120, 80, 50);  // 챙
  ellipse(200, 160, 190, 55);
  fill(80, 50, 30, 60); // 그림자
  ellipse(200, 165, 200, 50);

  // === 자동 깜박임 ===
  if (blinkTimer > 0) {
    blinkTimer--;
    if (blinkTimer === 0) eyeOpen = true;
  }
  if (frameCount % 120 === 0) {
    eyeOpen = false;
    blinkTimer = 10;
  }
}

// === 키보드 인터랙션 ===
function keyPressed() {
  mouthOpen = true;
  bgColor = color(random(230, 250), random(190, 210), random(150, 180));

  // ▶ s 키
  if (key === 's') {
    saveGif('ParkGeonwoo_Character', 10);
  }
}

function keyReleased() {
  mouthOpen = false;
  bgColor = color(240, 195, 150);
}

// === 마우스 인터랙션 ===
function mousePressed() {
  eyeOpen = false;
  blinkTimer = 10;
}
