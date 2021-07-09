img = "";
status = "";
objects = [];

function preload(){
    img = loadImage("kitchen.jpeg");
}

function setup(){
    canvas  = createCanvas(640,420);
    canvas.center();
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Detecting Objects";    
}

function modelLoaded(){
    status = true;
    objectDetector.detect(img,gotResult);
}

function gotResult(error,results){
    if(error){
       console.log(error);
    }
    console.log(results);
    objects = results;

    if(status != ""){
        for(i = 0; i < objects.length; i++){
           document.getElementById("status").innerHTML = "Status: Objects Detected";
           fill("#000000");
           percent = floor(objects[i].confidence * 100);
           text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y + 20);
           noFill();
           stroke("#0000FF");
           rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
     }
 }
