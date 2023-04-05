import * as cg from "../render/core/cg.js";
import { g2 } from "../util/g2.js";
import { controllerMatrix, buttonState, joyStickState } from "../render/core/controllerInput.js";

let viewer_matrix  = cg.mTranslate(0, 0, 0);
let velX = 0;
let velY = 0;
let velZ = 0;
let fuel = 100;
let fuelBoardPos = [0.7,0.35,-0.2];
let velocityBoardPos = [-0.7,0.35,-0.2];


export const init = async model => {

   let scene = model.add();

   let randomSpherePoint = (x0,y0,z0,radius) => {
      var u = Math.random();
      var v = Math.random();
      var theta = 2 * Math.PI * u;
      var phi = Math.acos(2 * v - 1);
      var x = x0 + (radius * Math.sin(phi) * Math.cos(theta));
      var y = y0 + (radius * Math.sin(phi) * Math.sin(theta));
      var z = z0 + (radius * Math.cos(phi));
      return [x,y,z];
   }

   for (let i = 0; i < 500; i++) {
      let pos = randomSpherePoint(0,0,0,600)
      scene.add('cube').color(1,1,1).move(pos).scale(0.2);
    }
   

   model.setTable(false);
   model.setRoom(false);
   
   let cube1Matrix = cg.scaleO(cg.mTranslate(0,0,0),1,0.4,1);
   let cube2Matrix = cg.scaleO(cg.mTranslate(0,0.4,0),0.9,0.05,0.9);
   let cube3Matrix = cg.scaleO(cg.mTranslate(0,0.9,0),0.7,0.6,0.7);
   let cube4Matrix = cg.scaleO(cg.mTranslate(0,1.2,0),0.3,0.7,0.3);

   let tube1Matrix = cg.scaleO(cg.mTranslate(-0.9,-0.5,-0.9),0.03,0.7,0.03);
   let tube2Matrix = cg.scaleO(cg.mTranslate(-0.9,-0.5, 0.9),0.03,0.7,0.03);
   let tube3Matrix = cg.scaleO(cg.mTranslate( 0.9,-0.5,-0.9),0.03,0.7,0.03);
   let tube4Matrix = cg.scaleO(cg.mTranslate( 0.9,-0.5, 0.9),0.03,0.7,0.03);

   let antennaMatrix = cg.scaleO(cg.mTranslate( 0,2,0),0.01,0.9,0.01);

   let tube1PadMatrix = cg.scaleO(cg.mTranslate(-0.9,-1.2,-0.9),0.2,0.03,0.2);
   let tube2PadMatrix = cg.scaleO(cg.mTranslate(-0.9,-1.2, 0.9),0.2,0.03,0.2);
   let tube3PadMatrix = cg.scaleO(cg.mTranslate( 0.9,-1.2,-0.9),0.2,0.03,0.2);
   let tube4PadMatrix = cg.scaleO(cg.mTranslate( 0.9,-1.2, 0.9),0.2,0.03,0.2);

   
   let earth = scene.add('sphere').texture('../media/textures/earthmap1k-orig-flipped.jpg');
   let moon = scene.add('sphere').texture('../media/textures/moon.jpeg');
   
   

   let cubeIssMatrix = cg.scaleO(cg.mTranslate(0,2,-2),0.3,0.3,0.3);
   let issTubeMatrix = cg.scaleO(cg.mTranslate(0,2,-2),2,0.15,0.15);

   let issTubeMatrix1 = cg.scaleO(cg.mTranslate(-1.3,2,-2),0.01,1,0.01);
   let issTubeMatrix2 = cg.scaleO(cg.mTranslate(-0.8,2,-2),0.01,1,0.01);
   let issTubeMatrix3 = cg.scaleO(cg.mTranslate(0.8,2,-2),0.01,1,0.01);
   let issTubeMatrix4 = cg.scaleO(cg.mTranslate(1.3,2,-2),0.01,1,0.01);
   let issTubeMatrix5 = cg.scaleO(cg.mTranslate(-1.8,2,-2),0.01,1,0.01);
   let issTubeMatrix6 = cg.scaleO(cg.mTranslate(1.8,2,-2),0.01,1,0.01);



   clay.defineMesh('ISSBase', clay.combineMeshes([
      [ 'tubeX', issTubeMatrix, [ 0.07, 0.07, 0.07]],
      [ 'tubeY', issTubeMatrix1, [ 0.07, 0.07, 0.07]],
      [ 'tubeY', issTubeMatrix2, [ 0.07, 0.07, 0.07]],
      [ 'tubeY', issTubeMatrix3, [ 0.07, 0.07, 0.07]],
      [ 'tubeY', issTubeMatrix4, [ 0.07, 0.07, 0.07]],
      [ 'tubeY', issTubeMatrix5, [ 0.07, 0.07, 0.07]],
      [ 'tubeY', issTubeMatrix6, [ 0.07, 0.07, 0.07]],
      [ 'cube' , cubeIssMatrix, [ 0.07, 0.07, 0.07]],
   ]));

   let panel1Matrix =  cg.scaleO(cg.mTranslate(-1.8,3,-2),0.2,0.5,0.001);
   let panel2Matrix =  cg.scaleO(cg.mTranslate(-1.3,3,-2),0.2,0.5,0.001);
   let panel3Matrix =  cg.scaleO(cg.mTranslate(-0.8,3,-2),0.2,0.5,0.001);
   let panel4Matrix =  cg.scaleO(cg.mTranslate(0.8,3,-2),0.2,0.5,0.001);
   let panel5Matrix =  cg.scaleO(cg.mTranslate(1.3,3,-2),0.2,0.5,0.001);
   let panel6Matrix =  cg.scaleO(cg.mTranslate(1.8,3,-2),0.2,0.5,0.001);

   let panel1Matrixd =  cg.scaleO(cg.mTranslate(-1.8,1,-2),0.2,0.5,0.001);
   let panel2Matrixd =  cg.scaleO(cg.mTranslate(-1.3,1,-2),0.2,0.5,0.001);
   let panel3Matrixd =  cg.scaleO(cg.mTranslate(-0.8,1,-2),0.2,0.5,0.001);
   let panel4Matrixd =  cg.scaleO(cg.mTranslate(0.8,1,-2),0.2,0.5,0.001);
   let panel5Matrixd =  cg.scaleO(cg.mTranslate(1.3,1,-2),0.2,0.5,0.001);
   let panel6Matrixd =  cg.scaleO(cg.mTranslate(1.8,1,-2),0.2,0.5,0.001);

   

   clay.defineMesh('ISSSolar', clay.combineMeshes([
      [ 'cube' , panel1Matrix, [ 0.07, 0.07, 0.07]],
      [ 'cube' , panel2Matrix, [ 0.07, 0.07, 0.07]],
      [ 'cube' , panel3Matrix, [ 0.07, 0.07, 0.07]],
      [ 'cube' , panel4Matrix, [ 0.07, 0.07, 0.07]],
      [ 'cube' , panel5Matrix, [ 0.07, 0.07, 0.07]],
      [ 'cube' , panel6Matrix, [ 0.07, 0.07, 0.07]],
      [ 'cube' , panel1Matrixd, [ 0.07, 0.07, 0.07]],
      [ 'cube' , panel2Matrixd, [ 0.07, 0.07, 0.07]],
      [ 'cube' , panel3Matrixd, [ 0.07, 0.07, 0.07]],
      [ 'cube' , panel4Matrixd, [ 0.07, 0.07, 0.07]],
      [ 'cube' , panel5Matrixd, [ 0.07, 0.07, 0.07]],
      [ 'cube' , panel6Matrixd, [ 0.07, 0.07, 0.07]],
      
   ]));
   let fcolor = '#FF6600';
   if(fuel == 0){
      fcolor =  '#FF0000'
   }
   // HUDs
   let fuelBoard = model.add('cube').scale(.32,.22,.0001).texture(() => {
      g2.setColor('#111111');
      g2.fillRect(.1,0,.8,1);
      g2.setColor([1,0,0]);
      g2.textHeight(.1);
      g2.fillText('FUEL', .5, .85, 'center');
      g2.textHeight(.08);
      g2.setColor(fcolor);
      g2.fillText(fuel.toFixed(3) + '', .5, .4, 'center');
   });

   
   let velocityBoard = model.add('cube').scale(.22,.42,.0001).texture(() => {
      g2.setColor('#111111');
      g2.fillRect(.1,0,.8,1);
      g2.setColor([1,0,0]);
      g2.textHeight(.1);
      g2.fillText('VELOCITY', .5, .85, 'center');
      g2.textHeight(.09);
      g2.setColor('#FF6600');
      g2.fillText(' X [ ' + velX.toFixed(2) + ' ]' , .5, .5, 'center');
      g2.fillText(' Y [ ' + velY.toFixed(2) + ' ]' , .5, .4, 'center');
      g2.fillText(' Z [ ' + velZ.toFixed(2) + ' ]' , .5, .3, 'center');
   });

   let issBase = scene.add('ISSBase');
   let issSolar = scene.add('ISSSolar');
   
   let throttle = 0.01;
   let rotateYDegree = 0;
   let rotateThrottle = 0.001;

   

   model.animate(() => {

      issBase.identity().move(1,-85, -2).scale(40).turnX(0.1).texture('../media/textures/silver-foil.png');;
      issSolar.identity().move(1,-85, -2).scale(40).turnX(0.1).texture('../media/textures/solar-panel.png');
      earth.identity().move(0,1,-1000).turnX(Math.PI/2).turnZ(-model.time/100).scale(30);
      moon.identity().move(0,1,1000).scale(50);

      // HUDs
      fuelBoard.hud().turnY(-0.10*Math.PI).turnX(0.07*Math.PI).move(fuelBoardPos).scale(.32,.22,.0001);
      velocityBoard.hud().turnY(0.10*Math.PI).turnX(0.07*Math.PI).move(velocityBoardPos).scale(.22,.42,.0001);
      
      let jrx = 0;
      let jry = 0;
      let jly = 0;
      let jlx = 0;
      
      if(fuel > 0){
         jrx = joyStickState.right.x;
         jry = joyStickState.right.y;
         jly = joyStickState.left.y;
         jlx = joyStickState.left.x;

         if(buttonState.left[0].pressed){
            if(jrx != 0){
               fuel = fuel - 0.001;
            }
            rotateYDegree = rotateYDegree - rotateThrottle*jrx;
         } else {
            
   
            if(jrx != 0){
               fuel = fuel - 0.001;
            }
            if(jry != 0){
               fuel = fuel - 0.001;
            }
            if(jly != 0){
               fuel = fuel - 0.001;
            }
            velX = velX + throttle*jrx;
            velY = velY - throttle*jry;
            velZ = velZ + throttle*jly;
            velX = velX + throttle*jlx;
            
         }
      } else {
         fuel = 0;
      }
      
      viewer_matrix = cg.mMultiply(cg.mRotateY(rotateYDegree),cg.mMultiply(cg.mTranslate([velX, velY, velZ]), viewer_matrix));

      scene.setMatrix(cg.mInverse(viewer_matrix));

   });
}


// TODO
//  Controller movement - Space Walk
//  Check if rotate view ?
//  Add burner sound


