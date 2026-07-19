// ========================================
// AUTO HEAD CROP FROM FACE DETECTION
// ========================================


function cropFromGuide(){


    if(!window.lastFaceBox){

        console.log(
            "NO FACE DATA"
        );

        return null;

    }



    const box =
    window.lastFaceBox;



    const videoW =
    video.videoWidth;


    const videoH =
    video.videoHeight;



    // ==============================
    // FACE POSITION
    // ==============================


    const faceX =
    box.xCenter * videoW;


    const faceY =
    box.yCenter * videoH;


    const faceW =
    box.width * videoW;


    const faceH =
    box.height * videoH;




    // ==============================
    // HEAD AREA
    // ==============================


const cropW =
faceW * 1.9;


const cropH =
faceH * 1.85;



const sx =
faceX - cropW / 2;


const sy =
faceY - cropH * 0.65;


    console.log(
        "AUTO HEAD CROP",
        {
            sx,
            sy,
            cropW,
            cropH
        }
    );





    // ==============================
    // OUTPUT 450x490
    // NO MASK
    // ==============================


    const canvasOut =
    document.createElement(
        "canvas"
    );


    canvasOut.width = 450;

    canvasOut.height = 490;



    const ctx =
    canvasOut.getContext(
        "2d"
    );



    ctx.clearRect(
        0,
        0,
        450,
        490
    );




    // langsung gambar kotak
ctx.drawImage(
    canvas,
    sx,
    sy,
    cropW,
    cropH,
    60,
    20,
    330,
    430
);



    console.log(
        "HEAD CROP READY"
    );



    return canvasOut.toDataURL(
        "image/png"
    );


}