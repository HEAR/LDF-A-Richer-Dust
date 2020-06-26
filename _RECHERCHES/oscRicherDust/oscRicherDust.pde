import oscP5.*;
import netP5.*;
/**
 * 
 * dev : Loïc Horellou
 *
 * IL FAUT INSTALLER oscP5 -> www.sojamo.de/libraries/oscP5/ 
 *
 **/


float minH, maxH, valH, minM, maxM, valM, minL, maxL, valL;


// on cree les variables nécessaires au projet
OscP5 oscP5;
NetAddress myBroadcastLocation; 

Boolean sendingData;
float noiseValueH, noiseValueM, noiseValueL;

// on prepare la projection
void setup() {
  size(200, 200);
  frameRate(100);
  noStroke();
  background(0);
  
  minH = 0.00010420970647828653 ;
  maxH = 0.05616306886076927;
  valH = 0;
  
  minM = 0.0006506393547169864;
  maxM = 0.21790699660778046;
  valM = 0;
  
  minL = 0.0001728180213831365;
  maxL = 0.21915771067142487;
  valL = 0;

  oscP5 = new OscP5(this, 12000);
  myBroadcastLocation = new NetAddress("127.0.0.1", 4000);

  OscMessage m;
  m = new OscMessage("/abbleton/connect", new Object[0]);
  oscP5.flush(m, myBroadcastLocation);
  
  sendingData = false;
  noiseValueH = random(10.0);
  noiseValueM = random(10.0);
  noiseValueL = random(10.0);
}

// on affiche les images au quand on est en mode lecture 
void draw() {
  background(0);

  if(sendingData){
    fill(255,0,0);
    ellipse(width/2,height/2,width-20,height-20);
      
    OscMessage messageH = new OscMessage("/ableton/highfrequency");
    //message.add( random(1.0)/1000 );
    messageH.add( (maxH - minH) * noise(noiseValueH) + minH );
    oscP5.send(messageH, myBroadcastLocation);
    
    OscMessage messageM = new OscMessage("/ableton/midfrequency");
    //message.add( random(1.0)/1000 );
    messageM.add( (maxM - minM) * noise(noiseValueM) + minM );
    oscP5.send(messageM, myBroadcastLocation);
    
    OscMessage messageL = new OscMessage("/ableton/lowfrequency");
    //message.add( random(1.0)/1000 );
    messageL.add( (maxL - minL) * noise(noiseValueL) + minL );
    oscP5.send(messageL, myBroadcastLocation);
  }
  
  noiseValueH += 2.0;
  noiseValueM += 2.0;
  noiseValueL += 2.0;
}


// quand on appuie sur une touche clavier 
// 1 ou n'importe quelle touche
// -> permet de signaler que l'ordinateur est le maître, charge la vidéo 1
// 2 ou é
// -> ordinateur esclave n°1, charge la vidéo 2
// 3 ou "
// -> ordinateur esclave n°2, charge la vidéo 3
void keyPressed() {
  if (key == 'd') {
    // ON SE DECONNECTE DU SERVEUR
    OscMessage m;
    m = new OscMessage("/abbleton/disconnect", new Object[0]);
    oscP5.flush(m, myBroadcastLocation);
  } else if(key== 's'){
     sendingData = !sendingData; 
  }else {
    println("NOTHING");
  }
}



/* incoming osc message are forwarded to the oscEvent method. */
void oscEvent(OscMessage theOscMessage) {
  /* print the address pattern and the typetag of the received OscMessage */
  print("### received an osc message.");
  print(" addrpattern: "+theOscMessage.addrPattern());
  println(" typetag: "+theOscMessage.typetag());
  
  println("ok");
  
}

/*

socket emit ableton { high: 
   { min: 0.00010420970647828653,
     max: 0.05616306886076927,
     val: 0.001715930295176804 },
  mid: 
   { min: 0.0006506393547169864,
     max: 0.21790699660778046,
     val: 0.07329517602920532 },
  low: 
   { min: 0.0001728180213831365,
     max: 0.21915771067142487,
     val: 0.027161207050085068 } }

socket emit ableton {
  high: 
   { min: 0.00010420970647828653,
     max: 0.05616306886076927,
     val: 0.0024028890766203403 },
  mid: 
   { min: 0.0006506393547169864,
     max: 0.21790699660778046,
     val: 0.08096270263195038 },
  low: 
   { min: 0.0001728180213831365,
     max: 0.21915771067142487,
     val: 0.033322449773550034 } }
*/
