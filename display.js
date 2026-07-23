console.log("DISPLAY MANAGER V2");

console.clear();

console.log("DISPLAY RESTART");

// =====================================
// PIXI
// =====================================

const app = new PIXI.Application({

    width: 1920,

    height: 1080,

    backgroundColor: 0x1099bb

});

app.stage.sortableChildren = true;

document.getElementById("stage").appendChild(app.view);

// =====================================
// CREATE FIRST PERSON
// =====================================

//const person1 = createRaisePerson(app);

//const person2 = createNormalPerson(app);

//const person3 = createShakePerson(app);

//const person4 = createShoulderPerson(app);

// =====================================
// CROWD
// =====================================

const crowd = [];

let lastSpawned = 0;

async function checkLatest(){

    const response = await fetch(
    "uploaded/latest.json?" + Date.now()
);

    const data = await response.json();

if(data.latest > lastSpawned){

    console.log("NEW SELFIE :", data.latest);

    console.log("BEFORE SPAWN");

    spawnPerson({
    id: String(data.latest).padStart(6, "0")
});

    console.log("AFTER SPAWN");

    lastSpawned = data.latest;

}

}



async function loadExistingPeople(){

    const response = await fetch(
        "uploaded/latest.json?" + Date.now()
    );

    const data = await response.json();

    lastSpawned = data.latest;

    for(let i = 1; i <= data.latest; i++){

        spawnPerson({

            id: String(i).padStart(6,"0")

        });

    }

}



// =====================================
// CROWD AREA
// =====================================

const MIN_Y = 200;

const MAX_Y = 900;


// =====================================
// DNA
// =====================================

function randomPart(max = 10){

    return String(
        1 + Math.floor(Math.random() * max)
    ).padStart(2,"0");

}

function randomDNA(){

    return{

        torso: randomPart(),

        arms: randomPart(),

        hands: randomPart(),

        legs: randomPart(),

        feet: randomPart(),

        protest: randomPart()

    };

}


const dna = randomDNA();

console.log("DNA =", dna);

// =====================================
// SPAWN PERSON
// =====================================

function spawnPerson(data = null){

    const dna = randomDNA();

console.log("DNA =", dna);

    const random = Math.floor(Math.random() * 4);

    let person;

    if(random === 0){

        person =createNormalPerson(app, dna);

        if(data){

            person.loadPerson(data.id);

        }

    }
    else if(random === 1){

       person = createRaisePerson(app, dna);

        if(data){

            person.loadPerson(data.id);

        }

    }
    else if(random === 2){

        person = createShakePerson(app, dna);

        if(data){

            person.loadPerson(data.id);

        }

    }
    else{

        person = createShoulderPerson(app, dna);

        if(data){

            person.loadPerson(data.id);

        }

    }

    crowd.push(person);
    person.speed = 0.3 + Math.random() * 0.3;

    person.speedX =
    (Math.random() < 0.5 ? -1 : 1) *
    (0.15 + Math.random() * 0.25);

person.speedY =
    (Math.random() < 0.5 ? -1 : 1) *
    (0.05 + Math.random() * 0.15);

    app.stage.addChild(person.container);


person.container.x =
    200 + Math.random() * 1520;

person.container.y =
    MIN_Y + Math.random() * (MAX_Y - MIN_Y);

person.minX =
    80 + Math.random() * 500;

person.maxX =
    1400 + Math.random() * 420;

person.minY =
    MIN_Y + Math.random() * 120;

person.maxY =
    MAX_Y - Math.random() * 120;



person.container.y =
    MIN_Y + Math.random() * (MAX_Y - MIN_Y);

person.container.zIndex =
    person.container.y;

const depth =
    (person.container.y - MIN_Y) /
    (MAX_Y - MIN_Y);

const scale =
    0.18 + depth * 0.07;

person.container.scale.set(scale);


}

// =====================================
// TEST
// =====================================

// =====================================
// TEST
// =====================================

(async()=>{

    // karakter default
    spawnPerson({
        id:"000000"
    });

    // load semua selfie lama
    await loadExistingPeople();

    // mulai cek selfie baru
    setInterval(checkLatest,1000);

})();







// =====================================
// CROWD UPDATE
// =====================================

app.ticker.add(() => {

    crowd.forEach((person) => {

        person.container.x += person.speedX;
        person.container.y += person.speedY;



        if(person.container.x < person.minX){

            person.container.x = person.minX;
            person.speedX *= -1;

        }

        if(person.container.x > person.maxX){

            person.container.x = person.maxX;
            person.speedX *= -1;

        }

        if(person.container.y < person.minY){

            person.container.y = person.minY;
            person.speedY *= -1;

        }

        if(person.container.y > person.maxY){

            person.container.y = person.maxY;
            person.speedY *= -1;

        }

        person.container.zIndex =
            person.container.y;

        const depth =
            (person.container.y - MIN_Y) /
            (MAX_Y - MIN_Y);

        const scale =
    0.20 + depth * 0.05;

if(person.speedX > 0){

    person.container.scale.x = scale;

    if(person.board){

        person.board.setFacing(false);

    }

}else{

    person.container.scale.x = -scale;

    if(person.board){

        person.board.setFacing(true);

    }

}

person.container.scale.y = scale;

    });

});