// =====================================
// CREATE RAISE PERSON
// =====================================

function createShoulderPerson(app, dna){

    

// =====================================
// CHARACTER CONTAINER
// =====================================

const character = new PIXI.Container();

character.sortableChildren = true;

//app.stage.addChild(character);

// Posisi karakter (diatur oleh display.js)
character.x = 0;
character.y = 0;

// =====================================
// CHARACTER SCALE
// =====================================

const CHARACTER_SCALE = 0.20;

character.scale.set(CHARACTER_SCALE);

// =====================================
// TORSO
// =====================================

const torso = PIXI.Sprite.from(
    `assets/characters/torso/${dna.torso}/torso.png`
);

torso.anchor.set(0.5);

// POSITION
torso.x = 0;
torso.y = 20;

// SCALE
torso.scale.set(1);

torso.zIndex = 20;

character.addChild(torso);


// =====================================
// RIGHT ARM GROUP
// =====================================

const rightArmGroup = new PIXI.Container();

rightArmGroup.zIndex = 40;
rightArmGroup.sortableChildren = true;

character.addChild(rightArmGroup);


// =====================================
// RIGHT SHOULDER PIVOT
// =====================================

const rightShoulderPivot = new PIXI.Container();

rightShoulderPivot.x = -55;
rightShoulderPivot.y = -55;

rightShoulderPivot.rotation = - 0.2;

rightShoulderPivot.zIndex = 10;

rightShoulderPivot.sortableChildren = true;

rightArmGroup.addChild(rightShoulderPivot);


// =====================================
// RIGHT UPPER ARM
// =====================================

const rightUpperArm = PIXI.Sprite.from(
    `assets/characters/arms/${dna.arms}/arm_right_upper.png`
);

rightUpperArm.x = -55;
rightUpperArm.y = -20;

rightUpperArm.scale.set(1);

rightUpperArm.zIndex = 10;

rightShoulderPivot.addChild(rightUpperArm);


// =====================================
// SHOULDER DEBUG DOT
// =====================================

const shoulderDot = new PIXI.Graphics();

shoulderDot.beginFill(0xff0000);
shoulderDot.drawCircle(0,0,6);
shoulderDot.endFill();

shoulderDot.zIndex = 999;

rightShoulderPivot.addChild(shoulderDot);
shoulderDot.visible = false;


// =====================================
// RIGHT ELBOW PIVOT
// =====================================

const rightElbowPivot = new PIXI.Container();

rightElbowPivot.x = -10;
rightElbowPivot.y = 125;

rightElbowPivot.rotation = -2;

rightElbowPivot.zIndex = 20;

rightElbowPivot.sortableChildren = true;

rightShoulderPivot.addChild(rightElbowPivot);


// =====================================
// RIGHT LOWER ARM
// =====================================

const rightLowerArm = PIXI.Sprite.from(
    `assets/characters/arms/${dna.arms}/arm_right_lower.png`
);

rightLowerArm.x = -25;
rightLowerArm.y = -12;

rightLowerArm.scale.set(1);

rightLowerArm.zIndex = 10;

rightElbowPivot.addChild(rightLowerArm);


// =====================================
// ELBOW DEBUG DOT
// =====================================

const elbowDot = new PIXI.Graphics();

elbowDot.beginFill(0x00ff00);
elbowDot.drawCircle(0,0,5);
elbowDot.endFill();

elbowDot.zIndex = 999;

rightElbowPivot.addChild(elbowDot);
elbowDot.visible = false;


// =====================================
// RIGHT WRIST PIVOT
// =====================================

const rightWristPivot = new PIXI.Container();

rightWristPivot.x = -5;
rightWristPivot.y = 85;

rightWristPivot.rotation = - -0.1;

rightWristPivot.zIndex = 30;

rightWristPivot.sortableChildren = true;

rightElbowPivot.addChild(rightWristPivot);


// =====================================
// RIGHT HAND
// =====================================

const rightHand = PIXI.Sprite.from(
    `assets/characters/hands/${dna.hands}/hand_right.png`
);

rightHand.x = -20;
rightHand.y = -10;

rightHand.scale.set(1);

rightHand.zIndex = 10;

rightWristPivot.addChild(rightHand);


// =====================================
// GRIP PIVOT
// =====================================

const gripPivot = new PIXI.Container();

gripPivot.x = 30;
gripPivot.y = 70;

gripPivot.rotation = 2.3;

gripPivot.zIndex = 5;

rightWristPivot.addChild(gripPivot);


// =====================================
// WRIST DEBUG DOT
// =====================================

const wristDot = new PIXI.Graphics();

wristDot.beginFill(0x0000ff);
wristDot.drawCircle(0,0,5);
wristDot.endFill();

wristDot.zIndex = 999;

rightWristPivot.addChild(wristDot);
wristDot.visible = false;



// =====================================
// POLE GROUP
// =====================================

const poleGroup = new PIXI.Container();



poleGroup.zIndex = 15;

poleGroup.sortableChildren = true;

gripPivot.addChild(poleGroup);


// =====================================
// POLE PIVOT
// =====================================

const polePivot = new PIXI.Container();

polePivot.x = 0;
polePivot.y = 0;

polePivot.rotation = 0;

polePivot.zIndex = 10;

polePivot.sortableChildren = true;

poleGroup.addChild(polePivot);


const protestBoard = createBoard(dna.protest);



// =====================================
// POLE
// =====================================

const pole = PIXI.Sprite.from(
    `assets/characters/protest/${dna.protest}/pole.png`
);

pole.x = -14;
pole.y = -400;

pole.rotation = 0;

pole.scale.set(1);

pole.zIndex = 10;

polePivot.addChild(pole);
polePivot.addChild(protestBoard.container);



// =====================================
// POLE DEBUG DOT
// =====================================

const poleDot = new PIXI.Graphics();

poleDot.beginFill(0xff0000);
poleDot.drawCircle(0,0,6);
poleDot.endFill();

poleDot.zIndex = 999;

polePivot.addChild(poleDot);
poleDot.visible = false;


// =====================================
// SET PROTEST TEXT
// =====================================

function setProtestText(message){

    protestBoard.setText(message);

}





// =====================================
// LEFT ARM GROUP
// =====================================

const leftArmGroup = new PIXI.Container();

leftArmGroup.zIndex = 10;
leftArmGroup.sortableChildren = true;

character.addChild(leftArmGroup);


// =====================================
// LEFT SHOULDER PIVOT
// =====================================

const leftShoulderPivot = new PIXI.Container();

leftShoulderPivot.x = 30;
leftShoulderPivot.y = -60;

leftShoulderPivot.rotation = -0.2;

leftShoulderPivot.zIndex = 10;

leftShoulderPivot.sortableChildren = true;

leftArmGroup.addChild(leftShoulderPivot);


// =====================================
// LEFT UPPER ARM
// =====================================

const leftUpperArm = PIXI.Sprite.from(
    `assets/characters/arms/${dna.arms}/arm_left_upper.png`
);

leftUpperArm.x = -50;
leftUpperArm.y = -20;

leftUpperArm.scale.set(1);

leftUpperArm.zIndex = 10;

leftShoulderPivot.addChild(leftUpperArm);


// =====================================
// SHOULDER DEBUG DOT
// =====================================

const leftShoulderDot = new PIXI.Graphics();

leftShoulderDot.beginFill(0xff0000);
leftShoulderDot.drawCircle(0,0,6);
leftShoulderDot.endFill();

leftShoulderDot.zIndex = 999;

leftShoulderPivot.addChild(leftShoulderDot);
leftShoulderDot.visible = false;


// =====================================
// LEFT ELBOW PIVOT
// =====================================

const leftElbowPivot = new PIXI.Container();

leftElbowPivot.x = 10;
leftElbowPivot.y = 130;

leftElbowPivot.rotation = -2.6;

leftElbowPivot.zIndex = 20;

leftElbowPivot.sortableChildren = true;

leftShoulderPivot.addChild(leftElbowPivot);





// =====================================
// LEFT LOWER ARM
// =====================================

const leftLowerArm = PIXI.Sprite.from(
    `assets/characters/arms/${dna.arms}/arm_left_lower.png`
);

leftLowerArm.x = -20;
leftLowerArm.y = -20;

leftLowerArm.scale.set(1);

leftLowerArm.zIndex = 10;

leftElbowPivot.addChild(leftLowerArm);


// =====================================
// ELBOW DEBUG DOT
// =====================================

const leftElbowDot = new PIXI.Graphics();

leftElbowDot.beginFill(0x00ff00);
leftElbowDot.drawCircle(0,0,5);
leftElbowDot.endFill();

leftElbowDot.zIndex = 999;

leftElbowPivot.addChild(leftElbowDot);
leftElbowDot.visible = false;

// =====================================
// LEFT WRIST PIVOT
// =====================================

const leftWristPivot = new PIXI.Container();

leftWristPivot.x = 2;
leftWristPivot.y = 80;

leftWristPivot.rotation = 0;

leftWristPivot.zIndex = 30;

leftWristPivot.sortableChildren = true;

leftElbowPivot.addChild(leftWristPivot);


// =====================================
// LEFT HAND
// =====================================

const leftHand = PIXI.Sprite.from(
    `assets/characters/hands/${dna.hands}/hand_left.png`
);

leftHand.x = -20;
leftHand.y = -13;

leftHand.scale.set(1);

leftHand.zIndex = 10;

leftWristPivot.addChild(leftHand);


// =====================================
// WRIST DEBUG DOT
// =====================================

const leftWristDot = new PIXI.Graphics();

leftWristDot.beginFill(0x0000ff);
leftWristDot.drawCircle(0,0,5);
leftWristDot.endFill();

leftWristDot.zIndex = 999;

leftWristPivot.addChild(leftWristDot);
leftWristDot.visible = false;




// =====================================
// RIGHT LEG GROUP
// =====================================

const rightLegGroup = new PIXI.Container();

rightLegGroup.zIndex = 15;

rightLegGroup.sortableChildren = true;

character.addChild(rightLegGroup);


// =====================================
// RIGHT HIP PIVOT
// =====================================

const rightHipPivot = new PIXI.Container();

rightHipPivot.x = -10;
rightHipPivot.y = 50;

rightHipPivot.rotation = -0.5;

rightHipPivot.zIndex = 10;

rightHipPivot.sortableChildren = true;

rightLegGroup.addChild(rightHipPivot);


// =====================================
// RIGHT UPPER LEG
// =====================================

const rightUpperLeg = PIXI.Sprite.from(
    `assets/characters/legs/${dna.legs}/leg_right_upper.png`
);

rightUpperLeg.x = -60;
rightUpperLeg.y = -50;

rightUpperLeg.scale.set(1);

rightUpperLeg.zIndex = 10;

rightHipPivot.addChild(rightUpperLeg);


// =====================================
// HIP DEBUG DOT
// =====================================

const hipDot = new PIXI.Graphics();

hipDot.beginFill(0xff0000);
hipDot.drawCircle(0,0,6);
hipDot.endFill();

hipDot.zIndex = 999;

rightHipPivot.addChild(hipDot);
hipDot.visible = false;

// =====================================
// RIGHT KNEE PIVOT
// =====================================

const rightKneePivot = new PIXI.Container();

rightKneePivot.x = -15;
rightKneePivot.y = 220;

rightKneePivot.rotation = 0;

rightKneePivot.zIndex = 20;

rightKneePivot.sortableChildren = true;

rightHipPivot.addChild(rightKneePivot);


// =====================================
// RIGHT LOWER LEG
// =====================================

const rightLowerLeg = PIXI.Sprite.from(
    `assets/characters/legs/${dna.legs}/leg_right_lower.png`
);

rightLowerLeg.x = -44;
rightLowerLeg.y = -30;

rightLowerLeg.scale.set(1);

rightLowerLeg.zIndex = 10;

rightKneePivot.addChild(rightLowerLeg);


// =====================================
// KNEE DEBUG DOT
// =====================================

const kneeDot = new PIXI.Graphics();

kneeDot.beginFill(0x00ff00);
kneeDot.drawCircle(0,0,5);
kneeDot.endFill();

kneeDot.zIndex = 999;

rightKneePivot.addChild(kneeDot);
kneeDot.visible = false;


// =====================================
// RIGHT ANKLE PIVOT
// =====================================

const rightAnklePivot = new PIXI.Container();

rightAnklePivot.x = 13;
rightAnklePivot.y = 270;

rightAnklePivot.rotation = 0;

rightAnklePivot.zIndex = 30;

rightAnklePivot.sortableChildren = true;

rightKneePivot.addChild(rightAnklePivot);


// =====================================
// RIGHT FOOT
// =====================================

const rightFoot = PIXI.Sprite.from(
    `assets/characters/feet/${dna.feet}/foot_right.png`
);

rightFoot.x = -20;
rightFoot.y = -10;

rightFoot.scale.set(1);

rightFoot.zIndex = 10;

rightAnklePivot.addChild(rightFoot);


// =====================================
// ANKLE DEBUG DOT
// =====================================

const ankleDot = new PIXI.Graphics();

ankleDot.beginFill(0x0000ff);
ankleDot.drawCircle(0,0,5);
ankleDot.endFill();

ankleDot.zIndex = 999;

rightAnklePivot.addChild(ankleDot);
ankleDot.visible = false;



// =====================================
// LEFT LEG GROUP
// =====================================

const leftLegGroup = new PIXI.Container();

leftLegGroup.zIndex = 10;

leftLegGroup.sortableChildren = true;

character.addChild(leftLegGroup);


// =====================================
// LEFT HIP PIVOT
// =====================================

const leftHipPivot = new PIXI.Container();

leftHipPivot.x = -13;
leftHipPivot.y = 50;

leftHipPivot.rotation = 0;

leftHipPivot.zIndex = 10;

leftHipPivot.sortableChildren = true;

leftLegGroup.addChild(leftHipPivot);


// =====================================
// LEFT UPPER LEG
// =====================================

const leftUpperLeg = PIXI.Sprite.from(
    `assets/characters/legs/${dna.legs}/leg_left_upper.png`
);

leftUpperLeg.x = -45;
leftUpperLeg.y = -50;

leftUpperLeg.scale.set(1);

leftUpperLeg.zIndex = 10;

leftHipPivot.addChild(leftUpperLeg);


// =====================================
// HIP DEBUG DOT
// =====================================

const leftHipDot = new PIXI.Graphics();

leftHipDot.beginFill(0xff0000);
leftHipDot.drawCircle(0,0,6);
leftHipDot.endFill();

leftHipDot.zIndex = 999;

leftHipPivot.addChild(leftHipDot);
leftHipDot.visible = false;


// =====================================
// LEFT KNEE PIVOT
// =====================================

const leftKneePivot = new PIXI.Container();

leftKneePivot.x = 40;
leftKneePivot.y = 210;

leftKneePivot.rotation = 0;

leftKneePivot.zIndex = 20;

leftKneePivot.sortableChildren = true;

leftHipPivot.addChild(leftKneePivot);


// =====================================
// LEFT LOWER LEG
// =====================================

const leftLowerLeg = PIXI.Sprite.from(
    `assets/characters/legs/${dna.legs}/leg_left_lower.png`
);

leftLowerLeg.x = -83;
leftLowerLeg.y = -30;

leftLowerLeg.scale.set(1);

leftLowerLeg.zIndex = 10;

leftKneePivot.addChild(leftLowerLeg);


// =====================================
// KNEE DEBUG DOT
// =====================================

const leftKneeDot = new PIXI.Graphics();

leftKneeDot.beginFill(0x00ff00);
leftKneeDot.drawCircle(0,0,5);
leftKneeDot.endFill();

leftKneeDot.zIndex = 999;

leftKneePivot.addChild(leftKneeDot);
leftKneeDot.visible = false;


// =====================================
// LEFT ANKLE PIVOT
// =====================================

const leftAnklePivot = new PIXI.Container();

leftAnklePivot.x = -16;
leftAnklePivot.y = 270;

leftAnklePivot.rotation = 0;

leftAnklePivot.zIndex = 30;

leftAnklePivot.sortableChildren = true;

leftKneePivot.addChild(leftAnklePivot);


// =====================================
// LEFT FOOT
// =====================================

const leftFoot = PIXI.Sprite.from(
    `assets/characters/feet/${dna.feet}/foot_left.png`
);

leftFoot.x = -28;
leftFoot.y = -20;

leftFoot.scale.set(1);

leftFoot.zIndex = 10;

leftAnklePivot.addChild(leftFoot);


// =====================================
// ANKLE DEBUG DOT
// =====================================

const leftAnkleDot = new PIXI.Graphics();

leftAnkleDot.beginFill(0x0000ff);
leftAnkleDot.drawCircle(0,0,5);
leftAnkleDot.endFill();

leftAnkleDot.zIndex = 999;

leftAnklePivot.addChild(leftAnkleDot);
leftAnkleDot.visible = false;


// =====================================
// HEAD GROUP
// =====================================

const headGroup = new PIXI.Container();

headGroup.zIndex = 50;

headGroup.sortableChildren = true;

character.addChild(headGroup);


// =====================================
// HEAD PIVOT
// =====================================

const headPivot = new PIXI.Container();

headPivot.x = 0;
headPivot.y = -165;

headPivot.rotation = 0;

headPivot.zIndex = 10;

headPivot.sortableChildren = true;

headGroup.addChild(headPivot);

// =====================================
// SELFIE CONTAINER
// =====================================

const selfieContainer = new PIXI.Container();

selfieContainer.x = 0;
selfieContainer.y = 0;

selfieContainer.zIndex = 10;

headPivot.addChild(selfieContainer);

// =====================================
// HEAD DEBUG DOT
// =====================================

const headDot = new PIXI.Graphics();

headDot.beginFill(0xff0000);
headDot.drawCircle(0, 0, 6);
headDot.endFill();

headDot.zIndex = 999;

headPivot.addChild(headDot);
headDot.visible = false;
// =====================================
// TEST SELFIE
// =====================================

// =====================================
// SELFIE SPRITE
// =====================================

const selfie = new PIXI.Sprite();

selfie.anchor.set(0.5);

selfie.x = 0;
selfie.y = -30;

selfie.scale.set(0.60);

selfieContainer.addChild(selfie);



// =====================================
// LOAD LATEST SELFIE
// =====================================

async function loadPerson(id){

    const texture = PIXI.Texture.from(
        "uploaded/" + id + ".png?" + Date.now()
    );

    selfie.texture = texture;

    const messageResponse = await fetch(
        "uploaded/" + id + ".json?" + Date.now()
    );

    const messageData = await messageResponse.json();

    setProtestText(messageData.message);

}


let latestID = 0;

async function loadLatestSelfie(){

    try{

        const response = await fetch(
            "uploaded/latest.json?" + Date.now()
        );

        const data = await response.json();

        if(data.latest === latestID){

            return;

        }

        latestID = data.latest;

        console.log("NEW SELFIE :", latestID);

        const id = String(latestID).padStart(6,"0");

      await loadPerson(id);

    }
    catch(err){

        console.log(err);

    }

}

//setInterval(loadLatestSelfie,1000);





// =====================================
// POSE DATA
// =====================================

const POSE = {

    NORMAL:{

        rightShoulder:-0.30,
        rightElbow:-2.00,
        rightWrist:0.10,

        leftShoulder:-0.30,
        leftElbow:-2.60,
        leftWrist:0.00

    },

    RAISE:{

        rightShoulder:-0.90,
        rightElbow:0.65,
        rightWrist:0.35,

        leftShoulder:-0.60,
        leftElbow:0.40,
        leftWrist:0.30

    }

};


// =====================================
// WALK CYCLE
// =====================================

let walkCycle = 0;

const baseCharacterY = character.y;


// =====================================
// WALK SETTINGS
// =====================================

const WALK_SPEED = 0.045;

const BODY_BOUNCE = 1;

const HEAD_SWAY = 0.025;

const ARM_SWING = 0.01;

const HIP_SWING = 0.1;

const POLE_SWAY = 0.015;

// =====================================



app.ticker.add(() => {

    // =====================================
    // WALK
    // =====================================

    walkCycle += WALK_SPEED;



    // =====================================
    // BODY
    // =====================================

    //character.y =
        //baseCharacterY +
        //Math.sin(walkCycle) * BODY_BOUNCE;


    // =====================================
    // HEAD
    // =====================================

  headPivot.rotation =
    Math.sin(walkCycle) * HEAD_SWAY;

   headPivot.y = -165;


    // =====================================
// SHOULDER
// =====================================

rightShoulderPivot.rotation =
    POSE.NORMAL.rightShoulder +
    Math.sin(walkCycle) * ARM_SWING;


leftShoulderPivot.rotation =
    POSE.NORMAL.leftShoulder +
    Math.sin(walkCycle + Math.PI) * ARM_SWING;

    // =====================================
// RIGHT ELBOW
// =====================================

rightElbowPivot.rotation =
    POSE.NORMAL.rightElbow;


    // =====================================
// RIGHT WRIST
// =====================================
rightWristPivot.rotation =
    POSE.NORMAL.rightWrist;


    // =====================================
// LEFT ELBOW
// =====================================

leftElbowPivot.rotation =
    POSE.NORMAL.leftElbow;

    // =====================================
// LEFT WRIST
// =====================================

leftWristPivot.rotation =
    POSE.NORMAL.leftWrist;



// =====================================
// POLE
// =====================================

polePivot.rotation = -1.35;



    // HIP

rightHipPivot.rotation =
    Math.sin(walkCycle + Math.PI) * HIP_SWING - 0.05;

leftHipPivot.rotation =
    Math.sin(walkCycle) * HIP_SWING + 0.05;


    // =====================================
    // KNEE
    // =====================================

    rightKneePivot.rotation =
        Math.max(
            0,
            Math.sin(walkCycle + Math.PI * 0.5)
        ) * 0.30;

    leftKneePivot.rotation =
        Math.max(
            0,
            Math.sin(walkCycle + Math.PI * 1.5)
        ) * 0.30;


            // =====================================
   // =====================================
// ANKLE
// =====================================

rightAnklePivot.rotation =
    Math.sin(walkCycle + Math.PI) * 0.15;

leftAnklePivot.rotation =
    Math.sin(walkCycle) * 0.15;


            // =====================================
    // FOOT ROLL
    // =====================================

    rightFoot.rotation =
        -Math.sin(walkCycle + Math.PI) * 0.05;

    leftFoot.rotation =
        -Math.sin(walkCycle) * 0.05;

});



// =====================================
// ACTION
// =====================================

const ACTION = {

    NORMAL : 0,

    RAISE : 1,

    SHAKE : 2,

    WAVE : 3,

    LOW : 4

};

// sementara kita pakai Raise
let currentAction = ACTION.NORMAL;


// =====================================
// RETURN PERSON
// =====================================

function faceRight(){

}

function faceLeft(){

}

return{

    container: character,

    board: protestBoard,

    loadPerson,

    faceRight,

    faceLeft

};

}