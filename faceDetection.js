// ========================================
// ELEMENT
// ========================================

const faceGuide = document.getElementById("faceGuide");
const guideText = document.getElementById("guideText");
const captureButton = document.getElementById("captureBtn");

captureButton.disabled = true;
let autoCaptureLock = false;
let readyTimer = null;

const countdown =
document.getElementById("countdown");


// ========================================
// LAST FACE DATA
// untuk crop nanti
// ========================================

window.lastFaceBox = null;



// ========================================
// MEDIAPIPE FACE DETECTION
// ========================================

const faceDetection = new FaceDetection({

    locateFile: (file) => {

        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`;

    }

});


faceDetection.setOptions({

    model:"short",

    minDetectionConfidence:0.65

});



// ========================================
// CHECK FACE INSIDE GUIDE
// ========================================

function isFaceInsideGuide(detection){


    const guideRect =
    faceGuide.getBoundingClientRect();



    const videoRect =
    video.getBoundingClientRect();



    const box =
    detection.boundingBox;



    // posisi wajah di layar

    const faceX =
    videoRect.left +
    (box.xCenter * videoRect.width);


    const faceY =
    videoRect.top +
    (box.yCenter * videoRect.height);



    const faceW =
    box.width *
    videoRect.width;


    const faceH =
    box.height *
    videoRect.height;

    // ==============================
// CHECK SIZE
// ==============================

const guideSize =
Math.min(
    guideRect.width,
    guideRect.height
);


// wajah harus sekitar 65-90% tinggi guide

const sizeRatio =
faceH / guideSize;


const sizeOK =
sizeRatio > 0.55 &&
sizeRatio < 1.15;



    const faceLeft =
    faceX - faceW / 2;


    const faceRight =
    faceX + faceW / 2;


    const faceTop =
    faceY - faceH / 2;


    const faceBottom =
    faceY + faceH / 2;



    const inside =

        faceLeft > guideRect.left - 20 &&
faceRight < guideRect.right + 20 &&
faceTop > guideRect.top - 20 &&
faceBottom < guideRect.bottom + 20
        sizeOK;


    return inside;

}



// ========================================
// RESULT
// ========================================

faceDetection.onResults((results)=>{


    let ready = false;



    if(
        results.detections &&
        results.detections.length === 1
    ){


        const face =
        results.detections[0];



        // simpan posisi wajah
        // untuk crop nanti

        window.lastFaceBox =
face.boundingBox;


       ready =
checkHeadInsideGuide();


    }



  if(ready){


    faceGuide.classList.add("ready");

guideText.innerText =
"Align your face";


    captureButton.disabled =
    false;



    if(!autoCaptureLock){


        autoCaptureLock = true;


        let count = 3;


        countdown.innerText = count;



        readyTimer = setInterval(()=>{


            count--;


            if(count > 0){


                countdown.innerText = count;


            }
            else{


                clearInterval(readyTimer);


                countdown.innerText = "";


                capturePhoto();


            }


        },1000);


    }


}

    else{


    faceGuide.classList.remove("ready");

guideText.innerHTML =
"Closer<br><small>Align your face</small><br><small>Auto Capture</small>";

    captureButton.disabled =
    true;



    if(readyTimer){

        clearInterval(readyTimer);

        readyTimer = null;

    }


    countdown.innerText = "";


    autoCaptureLock = false;


}

});



// ========================================
// LOOP
// ========================================

let detecting = false;


// ========================================
// LOOP
// ========================================

async function detectFace(){


    if(
        detecting
    ){

        return;

    }



    if(
        video.readyState < 2
    ){

        return;

    }



    detecting = true;



    try{


        await faceDetection.send({

            image:video

        });


    }


    catch(error){


        console.log(
            "FACE ERROR",
            error
        );


    }



    detecting = false;


}




// ========================================
// START
// ========================================

function startFaceDetection(){


    console.log(
        "Face Detection Started"
    );



    setTimeout(()=>{


        setInterval(()=>{


            detectFace();


        },300);



    },500);



}