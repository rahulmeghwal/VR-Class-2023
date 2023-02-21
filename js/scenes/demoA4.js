import { g2 } from "../util/g2.js";
import * as cg from "../render/core/cg.js";
import { controllerMatrix, buttonState, joyStickState, time } from "../render/core/controllerInput.js";
import { lcb, rcb } from '../handle_scenes.js';


// BALL SPECS
let allBalls = [];
let numberOfBalls = 20;
let colors = [ [1,0.5,0.5],  [0.5, 1,0.5],  [0.5,0.5, 1] ];
let sColors = [ [1,  0,  0],  [  0, 1,  0],  [  0,  0, 1] ];
let radius = 0.1;

// BULLET SPECS
let bulletSpeed = 20;
let allBullets = [];
let bulletScale = [0.01, 0.01, 0.01];
let bulletTimeInScene = 5;

// BOARDS
let  reloadBoard = null;
let scoreBoardPos = [0.6,0.4,-0.2];
let infoBoardPos = [0.6,-0.9,-0.2];
let ammoPlusBoard = null;
let ammoPlusBoardPos = [0.6,-0.9,-0.2];
let ammoPlusBoardOpacity = 1;
let ammoPlusBoardPosY = 0.01;

// GAME SPECS
let score = 0;
let bulletsRemaining = 20;

// RELOAD BOX SPECS
let reloadBoxes = [];
let numberOfReloadBox = 5;
let reloadBoxScale = 0.08;

// RANDOM BALL SPECS
let maxAxisX = 2;
let maxAxisY = 1;
let maxAxisZ = 2;

let rt = false;
let rt_prev = false;

// ROOM SPECS X, Y, Z
let roomX = 4.5;
let roomY1 = 3, roomY2 = 0.1;
let roomZ = 4.5;

let mr = [];


export const init = async model => {

   model.setTable(false);

   let getRandomXYX = (maxAxisX, maxAxisY, maxAxisZ) => {
      let randX = Math.random() * maxAxisX - 1;
      let randY = Math.random() * maxAxisY + 0.1;
      let randZ = Math.random() * maxAxisZ - 1;

      return [randX, randY, randZ];
   }
   for (let i = 0; i < numberOfBalls; i++) {
      
      let randXYZ = getRandomXYX(maxAxisX, maxAxisY, maxAxisZ);
      let pos = cg.mTranslate(randXYZ);
      let colorIndex = Math.floor(Math.random() * sColors.length);
      let ball = model.add('sphere').move(randXYZ).color(colors[colorIndex]).scale(radius);
      allBalls.push({
         ball: ball,
         inMotion: true,
         lockVelocity: [0,0,0,0,0,0,0,0,0,0,0,0, randXYZ[0]/40, randXYZ[1]/40, randXYZ[2]/40,0],
         scolor: sColors[colorIndex],
         color: colors[colorIndex],
         pos: pos,
         hit:false
      });

      if(i < numberOfReloadBox){
         randXYZ = getRandomXYX(maxAxisX, maxAxisY, maxAxisZ);
         let reloadBox = model.add('cube').move(1+randXYZ[0]*3, 1+ randXYZ[1], 1 + randXYZ[2]*2).color([0.8,0.54,0]).scale(reloadBoxScale);
         // .texture(() => {
         //    g2.fillRect([0.8,0.54,0]);
         //    g2.setColor([0,0,0]);
         //    g2.textHeight(.17);
         //    g2.fillText('+5', .5, .85, 'center');
         // });
         reloadBoxes.push({
            reloadBox: reloadBox,
            hit:false
         });
      }
   }
   
   // SCORE BOARD
   let scoreBoard = model.add('cube').texture(() => {
      g2.setColor('#111111');
      g2.fillRect(.1,0,.8,1);
      g2.setColor([1,0,0]);
      g2.textHeight(.17);
      g2.fillText('SCORE', .5, .85, 'center');
      g2.textHeight(.7);
      g2.setColor('#FF6600');
      g2.fillText(score + '', .5, .4, 'center');
   });

   
   let infoBoard = model.add('cube').texture(() => {
      g2.setColor('#111111');
      g2.fillRect(.1,0,.8,1);
      g2.setColor([1,0,0]);
      g2.textHeight(.17);
      g2.fillText('AMMO', .5, .85, 'center');
      g2.textHeight(.7);
      g2.setColor('#FF6600');
      g2.fillText(bulletsRemaining + '', .5, .4, 'center');
   });

   
   let roundCM = (m) => {
      let len = m.length;
      let controllerM = new Array(len);
      while(len--){ 
         controllerM[len] = m[len].toFixed(2); 
      }
      return controllerM;
   }

   // let textDisplay = model.add('cube').move(2,0.93,-3).scale(1,1,0.0001).texture(() => {
   //    g2.setColor('black');
   //    g2.textHeight(.08);
   //    if(mr.length > 1){
   //       let matrix = roundCM(mr);
   //       // g2.fillText(matrix[0] + ' ' + matrix[4] + ' ' + matrix[8] , .5, .7, 'center');
   //       // g2.fillText(matrix[1] + ' ' + matrix[5] + ' ' + matrix[9] , .5, .6, 'center');
   //       //g2.fillText(matrix[8] + ' ' + matrix[9] + ' ' + matrix[10] , .5, .5, 'center');
   //       g2.fillText(roundCM(rcb.beamMatrix().slice( 8, 11)) + ' ', .5, .4, 'center');
   //    }
   // });

   let fireBullet = (position, direction) => {
      let newBullet = model.add('sphere').color(0.965,0.745,0).setMatrix(position).scale(bulletScale);
      allBullets.push({
         bullet : newBullet,
         direction : direction,
         position : position,
         timeSpawned : model.time,
         hit : false
      });
      bulletsRemaining--;
   }

   model.animate(() => {

      mr = controllerMatrix.right;

      // HUD Score board and Info
      scoreBoard.hud().turnY(-0.10*Math.PI).turnX(0.07*Math.PI).move(scoreBoardPos).scale(.22,.22,.0001);
      infoBoard.hud().turnY(-0.10*Math.PI).turnX(-0.08*Math.PI).move(infoBoardPos).scale(.22,.22,.0001);
      
      
      // TODO : BULLETS in MOTION
      for (let i = 0; i < allBullets.length; i++) {
         allBullets[i].position = cg.add( allBullets[i].position, cg.scale(allBullets[i].direction,bulletSpeed));//cg.scale(allBalls[i].direction,bulletSpeed));
         allBullets[i].bullet.setMatrix(allBullets[i].position).scale(bulletScale);
      }

      for (let i = 0; i < allBalls.length; i++) {
         for (let j = 0; j < allBullets.length; j++) {
            if(cg.distance(allBalls[i].pos.slice(12,15), allBullets[j].position.slice(12,15)) < radius){
               allBalls[i].hit = true;
               allBullets[j].hit = true;
               score++;
            } 
         }
      }

      // REMOVE bullets that are in the model for a long time or have been hit
      let firedBulletsRemaining = [];
      for (let i = 0; i < allBullets.length; i++) {
         if((model.time - allBullets[i].timeSpawned > bulletTimeInScene) || allBullets[i].hit){
            model.remove(allBullets[i].bullet);
         } else {
            firedBulletsRemaining.push(allBullets[i]);
         }
      }
      allBullets = firedBulletsRemaining;

      // REMOVE balls that have been hit
      let ballsRemaining = [];
      for (let i = 0; i < allBalls.length; i++) {
         if(allBalls[i].hit){
            model.remove(allBalls[i].ball);
         } else {
            ballsRemaining.push(allBalls[i]);
         }
      }
      allBalls = ballsRemaining;

      if(bulletsRemaining === 0 && reloadBoard === null){
         reloadBoard = model.add('cube').texture(() => {
            g2.setColor([1,0,0]);
            g2.textHeight(.1);
            g2.fillText('RELOAD', .5, .8, 'center');
         });
      }
      if(reloadBoard !== null){
         reloadBoard.hud().move(0,-1,-1).opacity(.5 + .5 * Math.sin(6 * model.time));

         if(bulletsRemaining > 0){
            model.remove(reloadBoard);
            reloadBoard = null;
         }
      }
      // BALL IN MOTION 
      for (let i = 0; i < allBalls.length; i++) {
         if(allBalls[i].inMotion){
            // BOUNCING
            // Check if ball it hits the wall in X - Index 12
            if(allBalls[i].pos[12] > roomX || allBalls[i].pos[12] < -roomX){
               allBalls[i].lockVelocity[12] = -allBalls[i].lockVelocity[12];
            }
            // Check if ball it hits the wall in Y - Index 13
            if(allBalls[i].pos[13] > roomY1 || allBalls[i].pos[13] < roomY2){
               allBalls[i].lockVelocity[13] = -allBalls[i].lockVelocity[13];
            }
            // Check if ball it hits the wall in Z - Index 14
            if(allBalls[i].pos[14] > roomZ || allBalls[i].pos[14] < -roomZ){
               allBalls[i].lockVelocity[14] = -allBalls[i].lockVelocity[14];
            }

            // Add gravity
            allBalls[i].lockVelocity[13] -= 0.0001
            allBalls[i].pos = cg.add( allBalls[i].pos, allBalls[i].lockVelocity)
         }
         allBalls[i].ball.setMatrix(allBalls[i].pos).scale(radius);
      }
      
      rt = buttonState.right[0].pressed;

      // BEAM INTERSECTION and HIT CODE - FOR BALLS
      for(let i=0;i<allBalls.length;i++){
         let center = allBalls[i].ball.getGlobalMatrix().slice(12,15);
         let point = rcb.projectOntoBeam(center);
         let diff = cg.subtract(point, center);
         let hit = cg.norm(diff) < radius;
         
   
         if(hit){
            allBalls[i].ball.color(allBalls[i].scolor);
         } else {
            allBalls[i].ball.color(allBalls[i].color);
         }
         // Kill the ball if hit and trigger pressed - to be used without bullets
         // if (hit && rt && !rt_prev && !allBalls[i].hit){
         //    allBalls[i].ball.opacity(0.00001);
         //    score++;
         //    allBalls[i].hit = true;
            
         // }
      }

      
      if(rt && !rt_prev && bulletsRemaining > 0){
         let currentPosition = mr.slice(12,15);
         let position = cg.mMultiply(cg.mTranslate([0,0,0]), cg.mTranslate(currentPosition));
         let beamDir = rcb.beamMatrix().slice( 8, 11)
         let direction = [0,0,0,0,0,0,0,0,0,0,0,0, -beamDir[0]/100, -beamDir[1]/100, -beamDir[2]/100,0];
         fireBullet(position, direction);
      }

      // BEAM INTERSECTION and HIT CODE - FOR RELOAD BOX
      for(let i=0;i<reloadBoxes.length;i++){
         let center = reloadBoxes[i].reloadBox.getGlobalMatrix().slice(12,15);
         let point = rcb.projectOntoBeam(center);
         let diff = cg.subtract(point, center);
         let hit = cg.norm(diff) < reloadBoxScale;
         
         if(hit){
            reloadBoxes[i].reloadBox.color([1,0.64,0]);
            // texture(() => {
            //    g2.fillRect([1,0.64,0]);
            //    g2.setColor([0,0,0]);
            //    g2.textHeight(.17);
            //    g2.fillText('+5', .5, .85, 'center');
            // });
         } else {
            reloadBoxes[i].reloadBox.color([0.8,0.54,0]);
            // .texture(() => {
            //    g2.fillRect([0.8,0.54,0]);
            //    g2.setColor([0,0,0]);
            //    g2.textHeight(.17);
            //    g2.fillText('+5', .5, .85, 'center');
            // });
         }

         // Remove the box and set Hit 
         if (hit && rt && !rt_prev && !reloadBoxes[i].hit ){ //&& ammoPlusBoard !== null){
            reloadBoxes[i].hit = true;
         }
      }


      let reloadBoxesRemaining = [];
      for(let i=0;i<reloadBoxes.length;i++){
         // Increase bullets remaining and remove the box
         if(reloadBoxes[i].hit){
            model.remove(reloadBoxes[i].reloadBox);
            bulletsRemaining += 5;
            // Add animation for AMMO + 
            ammoPlusBoard = model.add('cube').texture(() => {
               g2.setColor([0,1,0]);
               g2.textHeight(.4);
               g2.fillText("+5" , .5, .8, 'center');
            });
            
            ammoPlusBoard.hud().turnY(-0.10*Math.PI).move(ammoPlusBoardPos).scale(.22,.22,.0001);
         } else {
            reloadBoxesRemaining.push(reloadBoxes[i]);
         }
      }
      if(ammoPlusBoard !== null){
         ammoPlusBoardOpacity -= 0.02; 
         ammoPlusBoard.hud().turnY(-0.10*Math.PI).move(ammoPlusBoardPos[0], ammoPlusBoardPos[1] + ammoPlusBoardPosY, ammoPlusBoardPos[2]).opacity(ammoPlusBoardOpacity).scale(.3,.3,.0001);
         ammoPlusBoardPosY += 0.01;

         if(ammoPlusBoardOpacity < 0.01){
            model.remove(ammoPlusBoard);
            ammoPlusBoard = null;
            ammoPlusBoardOpacity = 1;
            ammoPlusBoardPosY = 0.01;
         }
      }
      reloadBoxes = reloadBoxesRemaining;

      rt_prev = rt;
   });

}
