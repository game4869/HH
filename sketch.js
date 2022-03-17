let capture;
let preFrame;

let scale = 10;
let movementCountL = 0;
let movementCountR = 0;

let ellipseCol = 125;

function setup() {
  
  createCanvas(600, 450);
  
  // 600 * 300 = 180,000
  
  capture = createCapture(VIDEO);
  capture.size(width/scale,height/scale);
  
  capture.hide();
  
  console.log("Video Width  = " + capture.width);
  console.log("Video Height = " + capture.height);
  
  // 60 * 30 = 1,800
  
  preFrame = createImage(capture.width,capture.height);
  
}

function draw() {
  
  background(255);
  
  capture.loadPixels();
  preFrame.loadPixels();
  
  for(let y = 0 ; y < capture.height ; y++) {
    for(let x = 0 ; x < capture.width ; x++) {
      
      let indexR   = (y * capture.width + x) * 4  ;
      let indexG   = (y * capture.width + x) * 4 + 1  ;
      let indexB   = (y * capture.width + x) * 4 + 2  ;
      let indexA   = (y * capture.width + x) * 4 + 3  ;

      let indexPFR = (y * preFrame.width + x) * 4  ;
      let indexPFG = (y * preFrame.width + x) * 4 + 1  ;
      let indexPFB = (y * preFrame.width + x) * 4 + 2  ;
      let indexPFA = (y * preFrame.width + x) * 4 + 3  ;

      let r = capture.pixels[indexR];
      let g = capture.pixels[indexG];
      let b = capture.pixels[indexB];
      let a = capture.pixels[indexA];

      let pfr = preFrame.pixels[indexPFR];
      let pfg = preFrame.pixels[indexPFG];
      let pfb = preFrame.pixels[indexPFB];
      let pfa = preFrame.pixels[indexPFA];
      
      stroke(r,g,b,a);
      strokeWeight(10);
      point((capture.width - x) * scale - (scale / 2)  , y * scale + (scale / 2));
      
      //เทียบ ความต่างระหว่างframe ปัจจุบันกับ frame ในอดีต
      let diff = dist(r,g,b,pfr,pfg,pfb);

      if(diff < 55) {
        fill(255,0,0,0);
      } else {
        fill(0,255,0);
        if(x < capture.width/2){
          movementCountR++; 
        } else if (x > capture.width/2){
          movementCountL++; 
        }
        
      }

      noStroke();
      ellipse((capture.width - x) * scale - (scale / 2) ,y * scale + (scale / 2),10,10);

    }
  }
  
  console.log("Left side = " + movementCountL); 
  console.log("Right side = " + movementCountR); 
  
  if(movementCountL > 100) {
    ellipseCol-=10;
    if(ellipseCol<0){
      ellipseCol=0;
    }
    
  } else if (movementCountR > 100) {
    ellipseCol+=10;
    
  }
  console.log(ellipseCol); 
  
  
  
  // update preFrame
  preFrame.copy(capture,0,0,capture.width,capture.height,0,0,capture.width,capture.height);
  
  movementCountL = 0;
  movementCountR = 0;
  push();
  textSize(30);
      textStyle(BOLD);
      fill(200,0,0);
      textAlign(CENTER);
      strokeWeight(3);
      stroke(200,200,130);
      text("Hell",width/4, height/4);
  fill(0,0,200);
  textSize(30);
    text("Heaven",width/1.5, height/4);
  pop();
  background(255,ellipseCol);
  if(ellipseCol>255){
    textSize(60);
      ellipseCol=255;
      textStyle(BOLD);
      fill(0,0,250);
      textAlign(CENTER);
      strokeWeight(3);
      stroke(200,200,130);
      text("Good Bye Son",width/2, height/2);
    }
}
