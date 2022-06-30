img="";
status="";
objects=[];
function setup(){
    canvas=createCanvas(380,380);
    canvas.position(500,400);
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();

}
function modelLoaded(){
    console.log("model loaded!");
    status=true;
    
}
function gotResult(error,results){
    if(error){
        console.error(error);

    }
    console.log(results);
    objects=results;
}
function start(){
    objectDetector=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML='STATUS:DETECTING OBJECTS';
    object_name=document.getElementById("object_name").value ;
}
function draw(){
    image(video,0,0,380,380);
    if(status!=""){
        r=random(255);
        g=random(255);
        b=random(255);
        objectDetector.detect(video,gotResult);
     for(i=0;i<objects.length;i++){
        document.getElementById("status").innerHTML="status: object detected";
        document.getElementById("number_of_objects").innerHTML="status: number of objects detected are: "+objects.length;
        fill(r,g,b);
        percent= floor(objects[i].confidence*100);
        text(objects[i].label+"  "+percent+"%",objects[i].x+15,objects[i].y+15);
        noFill();
        stroke(r,g,b);
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        if(objects[i].label==object_name){
video.stop();
objectDetector.detect(gotResult);
document.getElementById("number_of_objects").innerHTML=object_name+" found";
synth=window.speechSynthesis;
utterthis=new SpeechSynthesisUtterance(object_name+" found");
synth.speak(utterthis);
        }
     }   
    }
    

}