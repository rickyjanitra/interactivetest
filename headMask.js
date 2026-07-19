async function createHeadMask(imageURL){


    const img = new Image();

    img.src = imageURL;


    await new Promise(resolve=>{
        img.onload = resolve;
    });



    if(!window.faceLandmarks){

        console.log("NO MESH");

        return imageURL;

    }



    const points =
    window.faceLandmarks;



    const canvas =
    document.createElement("canvas");


    canvas.width =
    img.width;


    canvas.height =
    img.height;



    const ctx =
    canvas.getContext("2d");



    // gambar image

    ctx.drawImage(
        img,
        0,
        0
    );



    // mask

    ctx.globalCompositeOperation =
    "destination-in";



    ctx.beginPath();



    // =========================
    // FACE OVAL FROM LANDMARK
    // =========================


    const outline = [

        10,
        338,
        297,
        332,
        284,
        251,
        389,
        356,
        454,
        323,
        361,
        288,
        397,
        365,
        379,
        378,
        400,
        377,
        152,

        148,
        176,
        149,
        150,
        136,
        172,
        58,
        132,
        93,
        234,
        127,
        162,
        21,
        54,
        103,
        67

    ];



    outline.forEach((id,index)=>{


        const p =
        points[id];


        const x =
        p.x * img.width;


        const y =
        p.y * img.height;



        if(index===0){

            ctx.moveTo(x,y);

        }
        else{

            ctx.lineTo(x,y);

        }


    });



    ctx.closePath();


    ctx.fill();



    ctx.globalCompositeOperation =
    "source-over";



    console.log(
        "HEAD MASK CREATED"
    );



    return canvas.toDataURL(
        "image/png"
    );


}