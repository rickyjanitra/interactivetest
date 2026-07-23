// =====================================
// CREATE BOARD
// =====================================

function createBoard(protest){

    const board = new PIXI.Container();

    board.sortableChildren = true;
    board.zIndex = 20;

    // =====================================
    // BOARD GROUP
    // =====================================

    const boardGroup = new PIXI.Container();

    boardGroup.x = 0;
    boardGroup.y = -270;

    boardGroup.rotation = 0;

    boardGroup.zIndex = 20;

    boardGroup.sortableChildren = true;

    board.addChild(boardGroup);

    // =====================================
    // SIGN
    // =====================================

const sign = PIXI.Sprite.from(
    `assets/characters/protest/${protest}/sign.png`
);

sign.anchor.set(0.5);

sign.x = 0;
sign.y = -60;

sign.rotation = 0;

sign.scale.set(1.35);

sign.zIndex = 10;

boardGroup.addChild(sign);

    // =====================================
    // TEXT GROUP
    // =====================================

const textGroup = new PIXI.Container();

textGroup.x = 0;
textGroup.y = -60;

textGroup.rotation = 0;

textGroup.zIndex = 20;

textGroup.sortableChildren = true;

boardGroup.addChild(textGroup);

    // =====================================
    // PROTEST TEXT
    // =====================================

const protestText = new PIXI.Text("SAVE",{

    fontFamily:"Arial",

    fontSize:60,

    fontWeight:"bold",

    fill:0xffffff,

    align:"center",

    wordWrap:true,

    wordWrapWidth:260,

    breakWords:false,

    lineHeight:62,

    letterSpacing:1

});





   

    textGroup.addChild(protestText);


    protestText.anchor.set(0.5);

protestText.x = 0;
protestText.y = 0;

protestText.zIndex = 10;



function measureWidth(text){

    return PIXI.TextMetrics.measureText(
        text,
        protestText.style
    ).width;

}

    // =====================================
    // SET TEXT
    // =====================================

function setText(message){

    message = message
        .trim()
        .replace(/\s+/g," ")
        .toUpperCase();

        // kalau ada kata yang terlalu panjang, pecah paksa
message = message.replace(/\S{13,}/g, function(word){

    return word.match(/.{1,12}/g).join(" ");

});

    let font = 60;

    while(font >= 42){

        protestText.style.fontSize = font;
        protestText.style.lineHeight = font + 2;
        protestText.style.wordWrapWidth = 260;

        protestText.text = message;

        if(protestText.height <= 150){

            break;

        }

        font -= 2;

    }

}

function setFacing(isLeft){

    if(isLeft){

        textGroup.scale.x = -1;

    }else{

        textGroup.scale.x = 1;

    }

}

    // =====================================
    // RETURN
    // =====================================

return{

    container: board,

    setText,

    setFacing

};
}