import * as cg from "../render/core/cg.js";
import { controllerMatrix, buttonState, joyStickState } from "../render/core/controllerInput.js";

let viewer_matrix  = cg.mTranslate(0, 0, 0);

export const init = async model => {
   let scene = model.add();
   let floor = scene.add("cube"); //.texture('../media/textures/floor.jpeg');
   let wallright = scene.add("cube"); //.texture('../media/textures/wallsand.jpg');
   let wallleft = scene.add("cube"); //.texture('../media/textures/wallsand.jpg');
   let wallfront = scene.add("cube"); //.texture('../media/textures/wallsand.jpg');
   let wallback = scene.add("cube"); //.texture('../media/textures/wallsand.jpg');
   let plane = scene.add();
   plane.add("sphere").scale([.3,.3,1]);
   // Create the cube
   //let cube = model.add('cube');
   model.setTable(false);
   model.setRoom(false);
   model.animate(() => {
      
      wallright.identity().move(5 ,1.5,-3).scale(1,2,8);
      wallleft.identity().move(-5 ,1.5,-3).turnX(-1.55).scale(1,8,3);
      wallfront.identity().move(0 ,1.5,-5.5).scale(4,2,1);
      wallback.identity().move(-2 ,1.5,5.5).turnY(-1.55).scale(1,5,8);
      floor.identity().move(0,-.4,.5).scale(5,.5,5);
      // Get joystick movement
      const joystickX = joyStickState.left.x;
      const joystickY = joyStickState.left.y;
      const joystickZ = joyStickState.right.y;

      // Scaling factor to control speed
      const speed = 0.01;

      // Calculate movement vector
      const moveVector = [joystickX * speed, -joystickZ * speed, joystickY * speed];

      // Update world position (opposite direction)
      viewer_matrix = cg.mMultiply(cg.mTranslate(moveVector), viewer_matrix);

      // Set the cube's matrix and scale
      //scene.setMatrix(cg.mInverse(worldMatrix));

      //let viewer_matrix = cg.mTranslate(0, 0, Math.sin(model.time));
      scene.setMatrix(cg.mInverse(viewer_matrix));
   });
}