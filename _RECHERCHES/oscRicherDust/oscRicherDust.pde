import oscP5.*;
import netP5.*;
/**
 * 
 * dev : Loïc Horellou
 *
 * IL FAUT INSTALLER oscP5 -> www.sojamo.de/libraries/oscP5/ 
 *
 **/



// on cree les variables nécessaires au projet
OscP5 oscP5;
NetAddress myBroadcastLocation; 

Boolean sendingData;
float noiseValue;

// on prepare la projection
void setup() {
  size(200, 200);
  frameRate(100);
  noStroke();
  background(0);

  oscP5 = new OscP5(this, 12000);
  myBroadcastLocation = new NetAddress("127.0.0.1", 4000);

  OscMessage m;
  m = new OscMessage("/abbleton/connect", new Object[0]);
  oscP5.flush(m, myBroadcastLocation);
  
  sendingData = false;
  noiseValue = random(10.0);
}

// on affiche les images au quand on est en mode lecture 
void draw() {
  background(0);

  if(sendingData){
    fill(255,0,0);
    ellipse(width/2,height/2,width-20,height-20);
      
    OscMessage message = new OscMessage("/abbleton/highfrequency");
    //message.add( random(1.0)/1000 );
    
    message.add( noise(noiseValue) );
    oscP5.send(message, myBroadcastLocation);
  }
  
  noiseValue += 2.0;
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
