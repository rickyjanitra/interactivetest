console.log(
    "SEGMENTATION JS LOADED"
);



// ========================================
// AI BACKGROUND REMOVAL
// ========================================

async function removeBackground(canvas){



    console.log(
        "AI BACKGROUND REMOVAL START"
    );



    // cek library

    if(
        typeof window.imglyRemoveBackground !== "function"
    ){

        console.error(
            "IMG.LY NOT READY"
        );


        return null;

    }





    try{



        const blob =
        await new Promise(resolve=>{


            canvas.toBlob(

                resolve,

                "image/png"

            );


        });




        if(!blob){


            console.error(
                "CANVAS TO BLOB FAILED"
            );


            return null;

        }





        console.log(
            "START AI MODEL"
        );




        const result =

        await window.imglyRemoveBackground(

            blob

        );





        console.log(
            "AI CUTOUT SUCCESS"
        );





        const url =

        URL.createObjectURL(

            result

        );





        return url;




    }



    catch(error){


        console.error(

            "AI REMOVE ERROR",

            error

        );


        return null;


    }



}