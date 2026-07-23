console.log("FACE MESH LOADED");


window.faceLandmarks = null;



const faceMesh = new FaceMesh({

    locateFile:(file)=>{

        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;

    }

});



faceMesh.setOptions({

    maxNumFaces:1,

    refineLandmarks:true,

    minDetectionConfidence:0.5,

    minTrackingConfidence:0.5

});



faceMesh.onResults(results=>{


    if(
        results.multiFaceLandmarks &&
        results.multiFaceLandmarks.length > 0
    ){

        window.faceLandmarks =
        results.multiFaceLandmarks[0];


        console.log(
            "FACE POINTS:",
            window.faceLandmarks.length
        );

    }


});



async function detectMesh(){


    if(video.readyState < 2)
        return;


    await faceMesh.send({

        image:video

    });


}

function checkHeadInsideGuide(){


    if(!window.faceLandmarks){

        return false;

    }



    const guideRect =
    faceGuide.getBoundingClientRect();



    const videoRect =
    video.getBoundingClientRect();



    const points =
    window.faceLandmarks;



    // titik dagu

    const chin =
    points[152];



    const chinX =
    videoRect.left +
    chin.x * videoRect.width;



    const chinY =
    videoRect.top +
    chin.y * videoRect.height;



    // titik atas kepala

    const top =
    points[10];


    const topY =
    videoRect.top +
    top.y * videoRect.height;



    // tinggi kepala

    const headHeight =
    chinY - topY;



    const guideHeight =
    guideRect.height;



    const headRatio =
    headHeight / guideHeight;



    // jarak dagu ke garis bawah

    const chinDistance =
    guideRect.bottom - chinY;



    const sizeOK =
    headRatio > 0.45 &&
    headRatio < 0.80;



    const chinOK =
    Math.abs(chinDistance) < 40;



    return (
        sizeOK &&
        chinOK
    );


}