import * as cg from "../render/core/cg.js";
/*
   This demo shows how to create a time-varying terrain.

   Use call clay.createGrid() to make a mesh which is a grid of custom size.
   Then we call clay.defineMesh() to give that mesh a type name.
   We then instance our mesh by calling model.add(<typename>)

   When we animate the mesh, we call obj.setVertices(), which
   lets us map (u,v) to [x,y,z].

   The computation of the correct surface normals is done automatically
   for us inside the obj.setVertices() function.
*/
export const init = async model => {


   for (let i = 0; i < 100; i++) {
      model.add('cube').color(1,1,1).move(-600 + 1200*Math.random(),-200 + 400*Math.random(),-600 + Math.random()*10).scale(0.2);
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

   let moonLanderLogo = model.add('cube').texture('../media/textures/space-y-blue.png');

   
   

   //let scaledCube2Matrix = translatedCube2
   clay.defineMesh('moonLander', clay.combineMeshes([
      [ 'cube', cube1Matrix, [0.3,0.3,0.3] ], // shape, matrix, color
      [ 'cube', cube2Matrix, [0.4,0.3,  0.8] ], // shape, matrix, color
      [ 'cube', cube3Matrix, [0.3,0.2,  0.5] ], // shape, matrix, color
      [ 'cube', cube4Matrix, [0.1,0.1,  0.1] ], // shape, matrix, color
      [ 'tubeY', tube1Matrix, [0.1,0.1,  0.1] ],
      [ 'tubeY', tube2Matrix, [0.1,0.1,  0.1] ],
      [ 'tubeY', tube3Matrix, [0.1,0.1,  0.1] ],
      [ 'tubeY', tube4Matrix, [0.1,0.1,  0.1] ],
      [ 'tubeY', antennaMatrix, [0.1,0.1,  0.1] ],
      [ 'tubeY', tube1PadMatrix, [0.3,0.3,  0.3] ],
      [ 'tubeY', tube2PadMatrix, [0.3,0.3,  0.3] ],
      [ 'tubeY', tube3PadMatrix, [0.3,0.3,  0.3] ],
      [ 'tubeY', tube4PadMatrix, [0.3,0.3,  0.3] ],
      //[ 'donut', cube3Matrix, [1,0.5,  0.8] ], // shape, matrix, color
   ]));

   let moonLander = model.add('moonLander').texture('../media/textures/old-yello-texture-metal.jpg');//.color(0,.5,1);

   clay.defineMesh('myTerrain', clay.createGrid(200, 200));
   let terrain = model.add('myTerrain');//.color(0,.5,1);


   let earth = model.add('sphere').texture('../media/textures/earthmap1k-orig-flipped.jpg');
   //let moon = model.add('sphere').texture('../media/textures/moon-16k.png');
   let moonScale = 50;
   
   clay.defineMesh('antenna', clay.createGrid(30, 30));
   let antenna = model.add('antenna');

   antenna.texture('../media/textures/wire-mesh-antenna.png');
      antenna.setVertices((u,v) => {
         // Alternate example that we built in class.
         let theta = Math.PI/4 + Math.PI * u/2;
         let phi   = Math.PI * (v - .5)/4;
         let r = 1 ;//+ .1 * cg.noise(20*u,20*v,.5 + .1 * Math.sin(10 * model.time));
               return [
            Math.cos(theta) * Math.cos(phi) * r,
            1- Math.sin(theta) * Math.cos(phi) * r,
                              Math.sin(phi) * r
         ];
      });


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

   let issBase = model.add('ISSBase').move(-2,0.8,-3).scale(0.4).texture('../media/textures/silver-foil.png');
   let issSolar = model.add('ISSSolar').move(-2,0.8,-3).scale(0.4).texture('../media/textures/solar-panel.png');

   model.animate(() => {

      //antenna.identity();
      
      // WORKING
      // terrain.identity().move( 0, -9, -2).scale(10);
      // terrain.texture('../media/textures/moon-8k.png');
      // terrain.setVertices((u,v) => {
      //    // Alternate example that we built in class.
      //    let theta = 2 * Math.PI * u;
      //    let phi   = Math.PI * (v - .5);
      //    let r = 1 ;//+ .1 * cg.noise(20*u,20*v,.5 + .1 * Math.sin(10 * model.time));
      //          return [
      //       Math.cos(theta) * Math.cos(phi) * r,
      //       Math.sin(theta) * Math.cos(phi) * r,
      //                         Math.sin(phi) * r
      //    ];
      // });

      // EXPERIMENT HALF ARC
      let moonTerrainScale = 200;
      let craterCenterU = 0.5;
      let craterCenterV = 0.5;
      terrain.identity().move( 0, -moonTerrainScale + 0.5 , -0).scale(moonTerrainScale);
      terrain.texture('../media/textures/moon-4k.png');
      terrain.setVertices((u,v) => {
         // Alternate example that we built in class.
         let theta = Math.PI/4 + Math.PI * u / 2;
         let phi   = Math.PI * (v - .5)/2;
         let r = 1 + .0085 * cg.noise(14*u,13*v,.5 + .1 * Math.sin(10));

         // let noiseZ = 0;
         
         // let  distFromCraterCenter = Math.sqrt( (u-craterCenterU)*(u-craterCenterU) + (v-craterCenterV)*(v-craterCenterV));

         // if(distFromCraterCenter < 0.01 && distFromCraterCenter > 0.009){
         //    r = r + 0.5;
         //    noiseZ = 0.1;
         // } 
         // if(distFromCraterCenter < 0.02 ){
         //    r = r - 0.01;
         // }

         return [
            Math.cos(theta) * Math.cos(phi) * r,
            Math.sin(theta) * Math.cos(phi) * r,
                              Math.sin(phi) * r  //+ noiseZ
         ];
      });

      //moonLander.identity().move(0,1.9,1).scale(0.1).turnY(model.time);
      issBase.identity().move(Math.sin(model.time/10)*10,3.8,-40).scale(1).turnX(0.1);
      issSolar.identity().move(Math.sin(model.time/10)*10,3.8,-40).scale(1).turnX(0.1);
      antenna.identity().move( 5,3.75,-5).scale(0.7).turnX(Math.PI/2).turnZ(model.time).opacity(0.7);//.turnZ(model.time);
      moonLander.identity().move(5,0.75,-5).scale(1).turnY(Math.PI/2);
      moonLanderLogo.identity().move(4.9,0.80,-4.8).scale(0.68,0.24,.9).turnY(Math.PI/2).color(0.5,.5,.5);
      earth.identity().move(0,1,-500).turnX(Math.PI/2).turnZ(-model.time/10).scale(10);//.scale(10);
      //moon.identity().move(0,-moonScale,0).scale(moonScale);
   });
}


// TODO :


// DONE:
// 1. Stars
// 3. Moon Lander Antenna
// 2. ISS/Satelite

