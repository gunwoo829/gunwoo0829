// p5.js 창가 고양이 + 밤하늘 유성 + 달 애니메이션
// 이름: 박건우

let starX = [];
let starY = [];
let starPhase = [];

// 작은 유성 여러 개
let mCount = 7;
let mX = [];
let mY = [];
let mVX = [];
let mVY = [];
let mLen = [];

let skyTop, skyBottom;

// 큰 운석 타이밍 )
let bigStart = 4.0;  // 초
let bigEnd = 6.0;    // 초

function setup() {
  createCanvas(960, 540);   // 16:9 비율
  colorMode(HSB, 360, 100, 100);
  noStroke();

  skyTop = color(220, 70, 10);
  skyBottom = color(220, 80, 5);

  // 별 초기화
  for (let i = 0; i < 60; i++) {
    starX[i] = random(width);
    starY[i] = random(height * 0.6);
    starPhase[i] = random(TWO_PI);
  }

  // 작은 유성들 초기화
  for (let i = 0; i < mCount; i++) {
    resetMeteor(i);
  }
}

function draw() {
  let t = millis() / 1000.0;

  drawSky(t);
  drawMoon(t);
  drawMeteor(t);       // 작은 유성 여러 개
  drawBigMeteor(t);    // 거대한 운석
  drawWindow(t);
  drawSill();
  drawPlant();
  drawCat(t);          // 큰 운석 타이밍에 눈 커짐
  drawName();
}

// =================== 밤하늘 + 별 ===================

function drawSky(t) {
  for (let y = 0; y < height; y++) {
    let amt = y / height;
    let c = lerpColor(skyTop, skyBottom, amt);
    stroke(c);
    line(0, y, width, y);
  }
  noStroke();

  for (let i = 0; i < starX.length; i++) {
    let b = 50 + 30 * sin(t * 2.0 + starPhase[i]);
    fill(220, 10, b);
    ellipse(starX[i], starY[i], 2.5, 2.5);
  }
}

// =================== 달 ===================

function drawMoon(t) {
  let cx = width * 0.18;
  let cy = height * 0.22;

  let baseR = 40;
  let r = baseR + 5 * sin(t * 0.7);  // 크기 변화

  let phase = sin(t * 0.25); // -1 ~ 1
  let offset = map(phase, -1, 1, r * 1.4, 0);

  fill(30, 10, 100);
  ellipse(cx, cy, r * 2, r * 2);

  fill(skyTop);
  ellipse(cx + offset, cy, r * 2, r * 2);
}

// =================== 작은 유성 여러 개 ===================

function resetMeteor(i) {
  mX[i] = random(-300, -50);
  mY[i] = random(-50, height * 0.4);
  mVX[i] = random(6, 10);
  mVY[i] = mVX[i] * 0.5;
  mLen[i] = random(70, 120);
}

function drawMeteor(t) {
  stroke(50, 0, 100); // 작은 유성은 흰색 계열
  strokeWeight(1);

  for (let i = 0; i < mCount; i++) {
    mX[i] += mVX[i];
    mY[i] += mVY[i] + cos(frameCount * 0.1 + i) * 0.4;

    if (mX[i] > width + 120 || mY[i] > height + 120) {
      resetMeteor(i);
    }

    let tailLen = mLen[i] + 8 * sin(t * 3.0 + i);

    let tx = mX[i] - tailLen;
    let ty = mY[i] - tailLen * 0.5;
    line(tx, ty, mX[i], mY[i]);

    noStroke();
    fill(50, 0, 100);
    ellipse(mX[i], mY[i], 10, 10);

    stroke(50, 0, 100);
    strokeWeight(3);
  }
  noStroke();
}

// =================== 거대한 유성 (7~8초, 색 다르게) ===================

function drawBigMeteor(t) {
  if (t < bigStart || t > bigEnd) {
    return;
  }

  let u = (t - bigStart) / (bigEnd - bigStart);
  u = constrain(u, 0, 1);

  // 왼쪽 위 -> 화면 중앙 아래쪽
  let bx = lerp(-250, width + 200, u);
  let by = lerp(-100, height * 0.6, u);

  let bigLen = 260;
  let tailLen = bigLen + 20 * sin(t * 4.0);

  // 큰 운석은 주황 계열
  stroke(25, 90, 100);
  strokeWeight(20);
  let tx = bx - tailLen;
  let ty = by - tailLen * 0.5;
  line(tx, ty, bx, by);

  noStroke();
  fill(25, 90, 100);
  ellipse(bx, by, 50, 50);
}

// =================== 창 + 실내 ===================

function drawWindow(t) {
  let w = 360;
  let h = 420;
  let x = width / 2;
  let y = height / 2;

  fill(50, 10, 95);
  rectMode(CENTER);
  rect(x, y, w + 40, h + 40, 8);

  let paneW = (w - 30) / 2;
  let paneH = (h - 30) / 2;

  let topCol = color(40, 80, 95);
  let midCol = color(45, 90, 100);
  let bottomCol = lerpColor(midCol, color(40, 80, 90), (sin(t * 0.5) + 1) / 2);

  drawPaneGradient(x - paneW / 2 - 7, y - paneH / 2 - 7, paneW, paneH, topCol, midCol);
  drawPaneGradient(x + paneW / 2 + 7, y - paneH / 2 - 7, paneW, paneH, topCol, midCol);
  drawPaneGradient(x - paneW / 2 - 7, y + paneH / 2 + 7, paneW, paneH, midCol, bottomCol);
  drawPaneGradient(x + paneW / 2 + 7, y + paneH / 2 + 7, paneW, paneH, midCol, bottomCol);
}

function drawPaneGradient(cx, cy, w, h, c1, c2) {
  let left = cx - w / 2;
  let top = cy - h / 2;
  for (let i = 0; i < h; i++) {
    let amt = i / h;
    let c = lerpColor(c1, c2, amt);
    stroke(c);
    line(left, top + i, left + w, top + i);
  }
  noStroke();
}

function drawSill() {
  let w = 360;
  let x = width / 2;
  let y = height / 2 + 230;

  fill(15, 70, 60);
  rectMode(CENTER);
  rect(x, y - 8, w + 40, 20);

  fill(15, 80, 45);
  rect(x, y + 12, w + 40, 35);
}

// =================== 화분 ===================

function drawPlant() {
  let baseX = width / 2 + 90;
  let baseY = height / 2 + 190;

  rectMode(CENTER);

  fill(25, 70, 35);
  rect(baseX, baseY, 70, 50, 6);

  fill(25, 60, 45);
  rect(baseX, baseY - 35, 80, 30, 6);

  stroke(130, 50, 70);
  strokeWeight(6);
  line(baseX, baseY - 50, baseX, baseY - 90);
  noStroke();

  fill(140, 50, 80);
  ellipse(baseX, baseY - 105, 30, 30);
  ellipse(baseX - 25, baseY - 95, 26, 26);
  ellipse(baseX + 25, baseY - 95, 26, 26);
}

// =================== 고양이 ===================

function drawCat(t) {
  let baseX = width / 2 - 90;
  let baseY = height / 2 + 220;

  rectMode(CORNER);
  fill(0, 0, 5);

  let bodyW = 70;
  let bodyH = 110;
  let bodyX = baseX - bodyW / 2;
  let bodyY = baseY - bodyH;
  rect(bodyX, bodyY, bodyW, bodyH, 12);

  // 꼬리 
  push();
  translate(bodyX - 18 + 9, bodyY + 40 + 35);
  rectMode(CENTER);
  rotate(radians(-15));
  rect(5, -15, 15, 80, 40);
  pop();
  rectMode(CORNER);

  rect(bodyX + 25, bodyY - 45, 50, 50, 8);

  triangle(bodyX + 28, bodyY - 41, bodyX + 30, bodyY - 70, bodyX + 50, bodyY - 40);
  triangle(bodyX + 55, bodyY - 41, bodyX + 75, bodyY - 70, bodyX + 75, bodyY - 40);

  // 큰 운석 구간인지
  let inShock = (t >= bigStart && t <= bigEnd);
  let eyeWhiteR = inShock ? 24 : 16;
  let eyeBlackR = inShock ? 10 : 6;

  // 흰자
  fill(0, 0, 100);
  ellipse(bodyX + 50, bodyY - 20, eyeWhiteR, eyeWhiteR);
  ellipse(bodyX + 70, bodyY - 20, eyeWhiteR, eyeWhiteR);

  // 검은자
  fill(0, 0, 0);
  ellipse(bodyX + 53, bodyY - 20, eyeBlackR, eyeBlackR);
  ellipse(bodyX + 73, bodyY - 20, eyeBlackR, eyeBlackR);

  // 코
  fill(0, 0, 95);
  ellipse(bodyX + 60, bodyY - 12, 6, 6);

  // 수염
  stroke(0, 0, 100);
  strokeWeight(1);
  // 오른쪽
  line(bodyX + 60, bodyY - 12, bodyX + 90, bodyY - 5);
  line(bodyX + 60, bodyY - 12, bodyX + 90, bodyY - 15);
  line(bodyX + 60, bodyY - 12, bodyX + 90, bodyY - 25);
  // 왼쪽
  line(bodyX + 60, bodyY - 12, bodyX + 30, bodyY - 5);
  line(bodyX + 60, bodyY - 12, bodyX + 30, bodyY - 15);
  line(bodyX + 60, bodyY - 12, bodyX + 30, bodyY - 25);

  noStroke();
}

//

function drawName() {
  fill(0, 0, 100);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(28);
  text("박건우", 20, 20);
}

// 

function keyPressed() {
  if (key === 's' || key === 'S') {
    saveGif('cat_window_meteor_moon', 10);
  }
}
