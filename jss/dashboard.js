console.log("DASHBOARD JS LOADED");

// =====================================
// OPEN DISPLAY
// =====================================

document
.getElementById("displayBtn")
.onclick = function(){

    window.open(
        "display.html",
        "_blank"
    );

};

// =====================================
// FULLSCREEN
// =====================================

document
.getElementById("fullscreenBtn")
.onclick = function(){

    window.open(
        "display.html?fullscreen=1",
        "_blank"
    );

};

// =====================================
// RESET
// =====================================

document
.getElementById("resetBtn")
.onclick = function(){

    if(confirm("Delete all selfies?")){

        resetDisplay();

    }

};

// =====================================
// RESET DISPLAY
// =====================================

async function resetDisplay(){

    console.log("STEP 1");

    try{

        console.log("STEP 2");

        const response = await fetch(
            "php/reset.php",
            {
                method:"POST"
            }
        );

        console.log("STEP 3", response);

        const result = await response.text();

        if(result !== "RESET SUCCESS"){

    alert(result);

    return;

}

        console.log("STEP 4", result);

        

        const display =
document.getElementById("preview");

display.src =
"display.html?reset=" + Date.now();

    }
    catch(err){

        console.error("ERROR :", err);

    }

}