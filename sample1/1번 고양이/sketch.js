function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}// p5.js — 창+고양이+화분 / 미니멀 재해석
function setup(){
  createCanvas(720, 900);
  noLoop();
}

function draw(){
  // ===== Palette =====
  const bg1 = color("#0a1a4a"); // 심도 있는 남색
  const bg2 = color("#08153b"); // 주변 비네트
  const frameCol = color("#ece8df"); // 창 프레임
  const sillTop = color("#b24a3f");  // 난간 상부
  const sillFront = color("#8e3a33"); // 난간 전면
  const glow1 = color("#ffd86e");   // 창 내부 밝은 노랑
  const glow2 = color("#ff9e40");   // 하단/가 쪽 오렌지
  const catCol = color("#0c0c0c");
  const eyeCol = color("#ffffff");

  background(bg2);
  // ----- Radial vignette for background depth -----
  noFill();
  for(let r=max(width,height); r>0; r-=3){
    const t = map(r, 0, max(width,height), 0, 1);
    stroke( lerpColor(bg1, bg2, t) );
    strokeWeight(3);
    circle(width*0.5, height*0.52, r);
  }

  // ===== Window group =====
  const cx = width*0.52, cy = height*0.48;
  const W = 170, H = 220;       // 창 내부 크기
  const fw = 16;                // 프레임 두께

  // Frame
  rectMode(CENTER);
  noStroke(); fill(frameCol);
  rect(cx, cy, W+fw*2, H+fw*2); // 바깥 프레임

  // Sill (난간)
  // 상판
  fill(sillTop);
  rect(cx, cy+H/2+fw*0.9, W+fw*2, fw*0.9);
  // 전면
  fill(sillFront);
  rect(cx, cy+H/2+fw*1.65, W+fw*2, fw*1.2);

  // Panes with vertical gradient (glow2 -> glow1)
  const px = W/2, py = H/2;
  const gutter = 8;
  const paneW = (W - gutter)/2, paneH = (H - gutter)/2;
  function pane(x, y){
    for(let i=0;i<paneH;i++){
      const t = i/paneH;
      stroke( lerpColor(glow2, glow1, 0.2 + 0.8*(1 - t)) );
      line(x - paneW/2, y - paneH/2 + i, x + paneW/2, y - paneH/2 + i);
    }
  }
  // 4분할 배치
  pane(cx - paneW/2 - gutter/2, cy - paneH/2 - gutter/2); // 좌상
  pane(cx + paneW/2 + gutter/2, cy - paneH/2 - gutter/2); // 우상
  pane(cx - paneW/2 - gutter/2, cy + paneH/2 + gutter/2); // 좌하
  pane(cx + paneW/2 + gutter/2, cy + paneH/2 + gutter/2); // 우하

  // 중앙 창살(선)
  stroke(frameCol); strokeWeight(6);
  line(cx, cy - H/2 - 1, cx, cy + H/2 + 1);
  line(cx - W/2 - 1, cy, cx + W/2 + 1, cy);

  // ===== Cat (rect/triangle/circle/lines only) =====
  noStroke(); fill(catCol);
  const catX = cx - paneW/2 - gutter/2 + paneW*0.28;
  const catY = cy + paneH/2 + gutter/2 - paneH*0.15 +100;
  const bodyW = 42, bodyH = 64;

  // 몸통
  rectMode(CENTER);
  rect(catX, catY - bodyH/2, bodyW, bodyH, 6);

  // 머리(정사각)
  const head = 30;
  rect(catX + bodyW*0.15, catY - bodyH - head*0.1, head, head, 4);

  // 귀(삼각형 2개)
  fill(catCol);
  triangle(catX + bodyW*0.15 - head*0.32, catY - bodyH - head*0.6,
           catX + bodyW*0.15 - head*0.05, catY - bodyH - head*0.9,
           catX + bodyW*0.15 + head*0.1,  catY - bodyH - head*0.55);
  triangle(catX + bodyW*0.15 + head*0.05, catY - bodyH - head*0.6,
           catX + bodyW*0.15 + head*0.3,  catY - bodyH - head*0.9,
           catX + bodyW*0.15 + head*0.45, catY - bodyH - head*0.55);

  // 꼬리(세운 직사각 + 살짝 기울기)
  push();
  translate(catX - bodyW*0.55, catY - bodyH*0.2);
  rotate(-PI/10);
  rect(2, -15, 12, 58, 6);
  pop();

  // 눈(원 2개 + 작은 동공)
  fill(eyeCol);
  circle(catX + bodyW*0.22, catY - bodyH - head*0.2, 8);
  circle(catX + bodyW*0.38, catY - bodyH - head*0.18, 8);
  fill("#222222");
  circle(catX + bodyW*0.24, catY - bodyH - head*0.18, 3);
  circle(catX + bodyW*0.40, catY - bodyH - head*0.17, 3);

  // 수염(선)
  stroke(eyeCol); strokeWeight(2);
  line(catX + bodyW*0.05, catY - bodyH - head*0.05, catX - 18, catY - bodyH + 4);
  line(catX + bodyW*0.05, catY - bodyH + head*0.02, catX - 20, catY - bodyH + 14);
  line(catX + bodyW*0.05, catY - bodyH + head*0.09, catX - 16, catY - bodyH + 22);

  // ===== Plant pot on sill =====
  // 화분 몸체(사다리꼴은 삼각형+사각형으로 구성)
  noStroke(); fill("#6b4b2a");
  const pX = cx + paneW*0.55, pY = cy + H/2 + fw*1.2;
  rectMode(CENTER);
  rect(pX, pY-10, 46, 26);
  fill("#4e371f");
  rect(pX, pY+8, 40, 22, 3);
  // 흙
  fill("#3a2a17"); rect(pX, pY-20, 42, 6);

  // 잎(원+삼각형)
  fill("#2aa75b");
  circle(pX, pY-42, 18);
  triangle(pX, pY-52, pX-10, pY-22, pX+10, pY-22);
  fill("#1f7f46");
  circle(pX-16, pY-36, 14);
  circle(pX+16, pY-36, 14);
  // 줄기(선)
  stroke("#1f7f46"); strokeWeight(3);
  line(pX, pY-22, pX, pY-40);

  // 메모(작게)
  noStroke(); fill(255,120);
  textFont('monospace'); textSize(12); textAlign(RIGHT,BOTTOM);
  text("night window · reinterpreted", width-14, height-12);
}

function keyPressed(){
  if(key==='S') saveCanvas('night_window_reinterpret','png');
  if(key==='R') redraw();
}
