console.log("HEAD CROP LOADED");


async function cropHead(imageURL){


    const img = new Image();

    img.src = imageURL;


    await new Promise(resolve=>{
        img.onload = resolve;
    });



    const canvas =
    document.createElement("canvas");


    canvas.width = img.width;
    canvas.height = img.height;


    const ctx =
    canvas.getContext("2d");


    ctx.drawImage(
        img,
        0,
        0
    );



    const data =
    ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
    );


    const pixels=data.data;



    let minX=canvas.width;
    let minY=canvas.height;
    let maxX=0;
    let maxY=0;



    // cari area transparan
    for(let y=0;y<canvas.height;y++){

        for(let x=0;x<canvas.width;x++){


            const alpha =
            pixels[(y*canvas.width+x)*4+3];


            if(alpha>20){

                minX=Math.min(minX,x);
                minY=Math.min(minY,y);

                maxX=Math.max(maxX,x);
                maxY=Math.max(maxY,y);

            }

        }

    }



    let w=maxX-minX;
    let h=maxY-minY;



    // ==============================
    // ADJUST HEAD AREA
    // ==============================


    const paddingX = w * 0.18;

    const paddingTop = h * 0.15;


    const cutNeck = h * 0.18;



    minX -= paddingX;

    minY -= paddingTop;


    w += paddingX*2;

    h -= cutNeck;



    // batas canvas

    minX=Math.max(
        0,
        minX
    );


    minY=Math.max(
        0,
        minY
    );


    w=Math.min(
        canvas.width-minX,
        w
    );


    h=Math.min(
        canvas.height-minY,
        h
    );




    // ==============================
    // OUTPUT KEEP RATIO
    // ==============================


    const out =
    document.createElement("canvas");


    out.width = w;

    out.height = h;



    const octx =
    out.getContext("2d");



    octx.drawImage(

        canvas,

        minX,
        minY,

        w,
        h,

        0,
        0,

        w,
        h

    );



    console.log(
        "HEAD CROP CLEAN",
        {
            x:minX,
            y:minY,
            width:w,
            height:h
        }
    );



    return out.toDataURL(
        "image/png"
    );

}