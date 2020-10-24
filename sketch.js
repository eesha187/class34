var ball,mydataBase,ballPosition,pos;

function setup(){
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
   
   mydataBase =  firebase.database();
   ballPosition= mydataBase.ref("ball/position");
   ballPosition.on("value",readPosition,showError);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function writePosition(x,y){
    mydataBase.ref("ball/position").set(
        {
            x:pos.x + x,y:pos.y+y
        }
    );
    ball.x = ball.x + x;
    ball.y = ball.y + y;
}


function readPosition(params) {
 pos=params.val();
 ball.x=pos.x;
 ball.y=pos.y;
    
}

function showError(params) {
console.log("error while fetching data");    
}
