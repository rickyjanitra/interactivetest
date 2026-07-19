// ======================================================
// ELEMENT
// ======================================================

const video = document.getElementById("camera");

const canvas = document.getElementById("photo");
const ctx = canvas.getContext("2d");


const captureBtn =
document.getElementById("captureBtn");


const processingOverlay =
document.getElementById("processingOverlay");


const messageBox =
document.getElementById("messageBox");


const messageText =
document.getElementById("messageText");


const previewScreen =
document.getElementById("previewScreen");


const previewImage =
document.getElementById("previewImage");


const retakeBtn =
document.getElementById("retakeBtn");


const continueBtn =
document.getElementById("continueBtn");




// ======================================================
// GLOBAL
// ======================================================

let capturedImage = "";




// ======================================================
// START CAMERA
// ======================================================

startCamera();



async function startCamera(){


    try{


        const stream =
        await navigator.mediaDevices.getUserMedia({


            video:{


                facingMode:"user",


                width:{
                    ideal:1280
                },


                height:{
                    ideal:720
                }


            },


            audio:false


        });



        video.srcObject =
        stream;



        video.onloadedmetadata = ()=>{


            video.play();



            setInterval(()=>{

                detectMesh();

            },200);



            console.log(
                "✅ Camera Ready"
            );



            if(
                typeof startFaceDetection === "function"
            ){

                startFaceDetection();

            }


        };


    }


    catch(error){


        console.error(error);



        showMessage(
            "Camera cannot be opened"
        );


    }


}







// ======================================================
// BUTTON
// ======================================================


captureBtn.addEventListener(
    "click",
    capturePhoto
);



retakeBtn.addEventListener(
    "click",
    retakePhoto
);



continueBtn.addEventListener(
    "click",
    continueProcess
);









// ======================================================
// CAPTURE PHOTO
// ======================================================


async function capturePhoto(){



    if(video.videoWidth === 0){


        showMessage(
            "Camera not ready"
        );


        return;


    }



    showProcessing();





    // ============================
    // CAPTURE CAMERA FRAME
    // ============================


    canvas.width =
    video.videoWidth;


    canvas.height =
    video.videoHeight;





  ctx.drawImage(
    video,
    0,
    0,
    canvas.width,
    canvas.height
);








    console.log(
        "IMAGE CAPTURED"
    );





    // ============================
    // CROP SESUAI GUIDE
    // ============================


    const guideCanvas =
cropFromGuide();



const transparentImage =
await removeBackgroundMediaPipe(
    guideCanvas
);


const cleanedImage =
await edgeCleanup(
    transparentImage
);


capturedImage =
await applyOvalMask(
    cleanedImage
);



if(!transparentImage){

    hideProcessing();

    showMessage(
        "AI cut failed"
    );

    return;

}



capturedImage =
await applyOvalMask(
    transparentImage
);


hideProcessing();


showPreview(
    capturedImage
);


}

// ======================================================
// PREVIEW
// ======================================================


function showPreview(image){


    previewImage.src =
    image;



    previewScreen.classList.remove(
        "hidden"
    );


}







function hidePreview(){


    previewScreen.classList.add(
        "hidden"
    );


}







// ======================================================
// RETAKE
// ======================================================


function retakePhoto(){


    hidePreview();


}









// ======================================================
// CONTINUE
// ======================================================


async function continueProcess(){


    console.log(
        "Continue clicked"
    );


}









// ======================================================
// PROCESSING
// ======================================================


function showProcessing(){


    processingOverlay.classList.remove(
        "hidden"
    );


}






function hideProcessing(){


    processingOverlay.classList.add(
        "hidden"
    );


}









// ======================================================
// MESSAGE
// ======================================================


function showMessage(text){


    messageText.innerText =
    text;



    messageBox.classList.remove(
        "hidden"
    );





    setTimeout(()=>{


        messageBox.classList.add(
            "hidden"
        );


    },1500);



}









// ======================================================
// CROP SESUAI GUIDE OVAL
// ======================================================


function cropFromGuide(){



    const guide =
    document.getElementById("faceGuide");



    const guideRect =
    guide.getBoundingClientRect();



    const videoRect =
    video.getBoundingClientRect();





    // skala tampilan video
    // ke resolusi kamera asli


    const videoRatio =
canvas.width / canvas.height;


const screenRatio =
videoRect.width / videoRect.height;


let renderWidth;
let renderHeight;
let offsetX = 0;
let offsetY = 0;



if(screenRatio > videoRatio){

    // video lebih tinggi, crop atas bawah

    renderWidth = canvas.width;

    renderHeight =
    canvas.width / screenRatio;


    offsetY =
    (canvas.height - renderHeight) / 2;


}
else{

    // video lebih lebar, crop kiri kanan

    renderHeight = canvas.height;

    renderWidth =
    canvas.height * screenRatio;


    offsetX =
    (canvas.width - renderWidth) / 2;

}



const scaleX =
renderWidth / videoRect.width;


const scaleY =
renderHeight / videoRect.height;




    const padding = 1.1; // tambah ruang 15%


const sw =
guideRect.width *
scaleX *
padding;


const sh =
guideRect.height *
scaleY *
1.25;


const sx =
(
((guideRect.left - videoRect.left)
* scaleX)
+ offsetX
)
-
(sw - guideRect.width * scaleX) / 2;



const extraTop = 0.18;

const cropShiftY = 71; // geser ke atas (pixel)

const sy =
(
((guideRect.top - videoRect.top)
* scaleY)
+ offsetY
)
-
(sh - guideRect.height * scaleY) / 2
-
cropShiftY;

    const out =
    document.createElement("canvas");



    out.width =
    sw;


    out.height =
    sh;





    const octx =
    out.getContext("2d");






    // ==========================
    // OVAL MASK SESUAI GUIDE
    // ==========================


    





    octx.drawImage(

        canvas,

        sx,

        sy,

        sw,

        sh,

        0,

        0,

        sw,

        sh

    );








   console.log(

    "GUIDE CROP FINAL",

    {
        width:sw,
        height:sh
    }

);


return out;


}

function applyOvalMask(imageURL){

    return new Promise(resolve=>{

        const img = new Image();

        img.onload = ()=>{

            const canvas =
            document.createElement("canvas");

            canvas.width = img.width;
            canvas.height = img.height;


            const ctx =
            canvas.getContext("2d");


            ctx.save();


            ctx.beginPath();


            ctx.ellipse(
                canvas.width/2,
                canvas.height/2,
                canvas.width/2,
                canvas.height/2,
                0,
                0,
                Math.PI*2
            );


            ctx.clip();


            ctx.drawImage(
                img,
                0,
                0
            );


            ctx.restore();


            resolve(
                canvas.toDataURL("image/png")
            );

        };


        img.src = imageURL;

    });

}

function edgeCleanup(imageURL){

    return new Promise(resolve=>{

        const img = new Image();

        img.onload = ()=>{

            const c = document.createElement("canvas");

            c.width = img.width;
            c.height = img.height;


            const ctx = c.getContext("2d");


            ctx.filter = "blur(0.8px)";

            ctx.drawImage(
                img,
                0,
                0
            );


            resolve(
                c.toDataURL("image/png")
            );

        };


        img.src = imageURL;

    });

}

async function removeBackgroundMediaPipe(canvas){

    return new Promise((resolve)=>{


        const selfieSegmentation =
        new SelfieSegmentation({

            locateFile:(file)=>{

                return `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`;

            }

        });



        selfieSegmentation.setOptions({

            modelSelection:1

        });



        selfieSegmentation.onResults((results)=>{


            const out =
            document.createElement("canvas");


            out.width = canvas.width;
            out.height = canvas.height;


            const ctx =
            out.getContext("2d");


            // gambar mask

            ctx.drawImage(

                results.segmentationMask,

                0,

                0,

                out.width,

                out.height

            );


            // ambil hanya orang

            ctx.globalCompositeOperation =
            "source-in";


            ctx.drawImage(

                canvas,

                0,

                0,

                out.width,

                out.height

            );


            resolve(
                out.toDataURL("image/png")
            );


        });



        selfieSegmentation.send({

            image:canvas

        });


    });

}

