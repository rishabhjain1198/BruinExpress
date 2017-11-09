import React, { Component,  } from 'react';
import { TouchableHighlight, StyleSheet, AsyncStorage, Text, View, Dimensions, StatusBar, Image, TextInput, Keyboard } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import SwipeDeck from './deck.js';
import PopupDialog, { SlideAnimation, DialogTitle, DialogButton } from 'react-native-popup-dialog';
import { Constants, Location, Permissions } from 'expo';
import RNExitApp from 'react-native-exit-app';

var that;

//import { Card } from './Card.js';

const SCREEN_WIDTH =  Dimensions.get('window').width;
const SCREEN_HEIGHT =  Dimensions.get('window').height;

var currentCard;
var currLat = 0;
var currLong = 0;
var executeonce = 0;
var countel = 1000;

var firstCardText = 'Find out what other bruins are saying around you! Swipe right to like, swipe left to dislike! Tap on the logo button below to express something yourself!';
var deviceid;

const GEOLOCATION_OPTIONS = { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 };

// test data
// const DATA = [
//   { id: 1, likeNumber:  6,text: 'The new breakfast bowls at the study are the shit!', age: 3, uri: 'http://media.istockphoto.com/photos/blue-background-picture-id470764344?k=6&m=470764344&s=612x612&w=0&h=Lz228xz6DylJLM1l7kS19Y-e9uXgIo3pJs_HspksxNM=' },
//   { id: 2, likeNumber:  27, text: 'The coffee here is bland as fuuuuuckkk', age: 1.7, uri: 'http://media.istockphoto.com/photos/blue-background-picture-id470764344?k=6&m=470764344&s=612x612&w=0&h=Lz228xz6DylJLM1l7kS19Y-e9uXgIo3pJs_HspksxNM=' },
//   { id: 3, likeNumber:  16, text: 'Scarlett', age: 25, uri: 'http://media.istockphoto.com/photos/blue-background-picture-id470764344?k=6&m=470764344&s=612x612&w=0&h=Lz228xz6DylJLM1l7kS19Y-e9uXgIo3pJs_HspksxNM=' },
//   { id: 4, likeNumber:  12, text: 'Keira', age: 27, uri: 'http://media.istockphoto.com/photos/blue-background-picture-id470764344?k=6&m=470764344&s=612x612&w=0&h=Lz228xz6DylJLM1l7kS19Y-e9uXgIo3pJs_HspksxNM=' },
//   { id: 5, likeNumber:  41, text: 'Emma', age: 29, uri: 'http://media.istockphoto.com/photos/blue-background-picture-id470764344?k=6&m=470764344&s=612x612&w=0&h=Lz228xz6DylJLM1l7kS19Y-e9uXgIo3pJs_HspksxNM=' },
//   { id: 6, likeNumber:  11, text: 'Jennifer', age: 24, uri: 'http://media.istockphoto.com/photos/blue-background-picture-id470764344?k=6&m=470764344&s=612x612&w=0&h=Lz228xz6DylJLM1l7kS19Y-e9uXgIo3pJs_HspksxNM=' },
//   { id: 7, likeNumber:  5, text: 'Sarah', age: 28, uri: 'http://media.istockphoto.com/photos/blue-background-picture-id470764344?k=6&m=470764344&s=612x612&w=0&h=Lz228xz6DylJLM1l7kS19Y-e9uXgIo3pJs_HspksxNM=' },
// ];
var DATA = [ { id: 1, likes:  6,message: firstCardText, dist: 3, uri: 'http://media.istockphoto.com/photos/blue-background-picture-id470764344?k=6&m=470764344&s=612x612&w=0&h=Lz228xz6DylJLM1l7kS19Y-e9uXgIo3pJs_HspksxNM=' }];

class ButtonShit extends Component {

  render() {
    return (
      <View style={{ flex: 2, alignItems: 'center', marginLeft: 50, }}>

        <View style={{ flex: 1 }}>
          <TouchableHighlight style={ buttonContainer()}>
            <Image style={buttonItself()} source={{ uri: 'https://i.giphy.com/media/VlzUkJJzvz0UU/200_s.gif' }} />
          </TouchableHighlight>
        </View>


      </View>
    );
  }

}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default class App extends Component {
constructor(props){
  super(props);
  this._getLocationAsync().done();
  this.getCache().done();

  that = this;

  this.popupAnimation = new SlideAnimation({ slideFrom: "bottom" });

  //CUT FROM HERE
  var tempData = DATA;


  //YEAH HERE
  this.state = {
      dataState: tempData,
      text: 'Start expressing, start typing...',
  };
}


componentWillMount() {

  that = this;


  }

_getLocationAsync = async () => {
  try{
  let { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== 'granted') {

      //EXIT APP HERE
      this.popupLocationFailure.show();
  }
  else {
    Location.watchPositionAsync(GEOLOCATION_OPTIONS, this.locationChanged);
  }} catch(error){
    console.log(error);
  }
};

locationChanged = (location) => {

  currLat =  location.coords.latitude;
  currLong =  location.coords.longitude;



  //ADDED HERE
  if(executeonce == 0){
    executeonce = 1;
    var tempData = DATA;
    //RETRIEVE MORE DATA HERE

    console.log(deviceid);
    console.log(currLat);
    console.log(currLong);

    // while(deviceidretrieved  == 0){
    //
    // }
    mainurl = 'http://django-env.xn3qqn2rwr.us-west-1.elasticbeanstalk.com/get/';
    mainurlDevice = mainurl + deviceid + '+';
    mainurlLat = mainurlDevice + currLat + '+';
    finalurl = mainurlLat + currLong;

    fetch(finalurl)
    .then((response) => response.json())
    .then((additionalData) => {


      for (var i = 0; i < additionalData.length; i++) {
        additionalData[i].uri = 'http://media.istockphoto.com/photos/blue-background-picture-id470764344?k=6&m=470764344&s=612x612&w=0&h=Lz228xz6DylJLM1l7kS19Y-e9uXgIo3pJs_HspksxNM=';
        additionalData[i].id = countel;
        finaldist = additionalData[i].dist;

        parts = finaldist.split('.');
        tobeput = parts[0] + '.' + parts[1].slice(0,3);

        additionalData[i].dist = tobeput;

        countel = countel + 1;
        tempData.push(additionalData[i]);
      //  console.log(additionalData[i]);
      }

      return additionalData.message;
    })
    .catch((error) => {
      console.log(error);
    });

    that.setState({dataState:  tempData});

  }
}

quitAppLocation() {
  that.popupLocationFailure.show();
}

async getCache() {
try {
  const value = await AsyncStorage.getItem('uniqueid:key');
  if (value !== null && value!= 'undefined' && value!=undefined ){
    // We have data!!
    deviceid = value;
    deviceidretrieved = 1;
  }
  else {

      //GENERATE AN ID FOR THIS PHONE

      console.log('generate');
      var testerid = String(getRandomInt(1000000, 9999999));
      deviceid = testerid;
      deviceidretrieved = 1;
      console.log(testerid);
      await AsyncStorage.setItem('uniqueid:key', testerid);

    }
} catch (error) {
    console.log("cant do shit about uuid" + error);
    RNExitApp.exitApp();
    //EXIT APP
  }
}

updateCurrentCard(card) {
  // console.log('CARD IS THIS ' + card.text);
  //console.log(card.message);
  currentCard = card;

  //console.log('updating');


}

async contactBackend(url) {
  try{

    let response = await fetch(url);

  } catch(error) {
    console.error(error);
  }
}

showComments(){

  Keyboard.dismiss()

  if(currLat == 0 && currLong == 0){
    return;
  }

  message = this.state.text;
  finalmessage = message.replace(/ /g, '+');

  tosend = deviceid + '+' + currLat + '+' + currLong + '+' + finalmessage;
  console.log(tosend);

  posturl = 'http://django-env.xn3qqn2rwr.us-west-1.elasticbeanstalk.com/post/';

  urlstrPOST = posturl + tosend;

  this.contactBackend(urlstrPOST);
  this.popupDialog.dismiss( () => {
    //console.log('callback');
  }

  );

  this.popupSuccess.show();

}

renderCard(card) {
return (
<Card
        key={card.id}
        containerStyle={{borderRadius: 50, width: SCREEN_WIDTH * 0.92, height: SCREEN_HEIGHT - 162, }}
        featuredTitle={`\'${card.message}\'`}
        title={`${card.likes} likes`}
        featuredTitleStyle={styles.titleCardTextStyle}
        featuredSubtitle={`\n${card.dist} miles away`}
        featuredSubtitleStyle={styles.subtitleCardTextStyle}
        image={{ uri: card.uri }}
        imageStyle={{width: SCREEN_WIDTH * 0.915, height: SCREEN_HEIGHT - 165}}
/>
    )
  }

onSwipeRight(card) {
if(card.message == firstCardText) {
  if(currLat == 0 && currLong == 0) {
    that.popupLocationFailure.show();
  }
}

if(card.message == that.state.dataState[that.state.dataState.length-1].message){
//ADDED HERE
  var tempData = [];
  //RETRIEVE MORE DATA HERE

  mainurl = 'http://django-env.xn3qqn2rwr.us-west-1.elasticbeanstalk.com/get/';
  mainurlDevice = mainurl + deviceid + '+';
  mainurlLat = mainurlDevice + currLat + '+';
  finalurl = mainurlLat + currLong;

  fetch(finalurl)
  .then((response) => response.json())
  .then((additionalData) => {

    var hua = 1;

    for (var i = 0; i < additionalData.length; i++) {
      hua = 0;
      additionalData[i].uri = 'http://media.istockphoto.com/photos/blue-background-picture-id470764344?k=6&m=470764344&s=612x612&w=0&h=Lz228xz6DylJLM1l7kS19Y-e9uXgIo3pJs_HspksxNM=';
      additionalData[i].id = countel;
      finaldist = additionalData[i].dist;

      parts = finaldist.split('.');
      tobeput = parts[0] + '.' + parts[1].slice(0,3);

      additionalData[i].dist = tobeput;

      countel = countel + 1;
      tempData.push(additionalData[i]);
    //  console.log(additionalData[i]);
    }

    if(hua == 1) {
      that.popupAllDone.show();
    }

    that.setState({dataState:  tempData});
    return additionalData.message;
  })
  .catch((error) => {
    console.log(error);
  });


}

console.log("Card liked: " + card.message);
likeurl = 'http://django-env.xn3qqn2rwr.us-west-1.elasticbeanstalk.com/like/';
finalmessage = card.message.replace(/ /g, '+');
finalurl = likeurl+finalmessage;

fetch(finalurl);
}

onSwipeLeft(card) {
  if(card.message == firstCardText) {
    if(currLat == 0 && currLong == 0) {
      that.popupLocationFailure.show();
    }
  }
  console.log("Card disliked: " + card.message);


  if(card.message == that.state.dataState[that.state.dataState.length-1].message){
  //ADDED HERE
    var tempData = [];
    //RETRIEVE MORE DATA HERE

    mainurl = 'http://django-env.xn3qqn2rwr.us-west-1.elasticbeanstalk.com/get/';
    mainurlDevice = mainurl + deviceid + '+';
    mainurlLat = mainurlDevice + currLat + '+';
    finalurl = mainurlLat + currLong;

    fetch(finalurl)
    .then((response) => response.json())
    .then((additionalData) => {

      var hua = 1;
      for (var i = 0; i < additionalData.length; i++) {
        hua = 0;
        additionalData[i].uri = 'http://media.istockphoto.com/photos/blue-background-picture-id470764344?k=6&m=470764344&s=612x612&w=0&h=Lz228xz6DylJLM1l7kS19Y-e9uXgIo3pJs_HspksxNM=';
        additionalData[i].id = countel;
        finaldist = additionalData[i].dist;

        parts = finaldist.split('.');
        tobeput = parts[0] + '.' + parts[1].slice(0,3);

        additionalData[i].dist = tobeput;

        countel = countel + 1;
        tempData.push(additionalData[i]);
      //  console.log(additionalData[i]);
      }

      if(hua == 1) {
        that.popupAllDone.show();
      }

      that.setState({dataState:  tempData});
      return additionalData.message;
    })
    .catch((error) => {
      console.log(error);
    });


  }

}

renderNoMoreCards() {
  if(currLat == 0 && currLong == 0){
    return;
  }

  doneText = 'No more new expressions around you! Come back later. Meanwhile, why not express something yourself?';

  return(
    <View style={{flex: 1,}}>
        <Text style={{ padding: 20, fontSize:  20, }}>{doneText}</Text>
    </View>
  );

  }

render() {
return (

<View style={{ flex: 1 }}>
<Image source={{ uri: 'https://image.freepik.com/free-photo/3d-render-of-spotlights-on-a-grunge-brick-wall_1048-6284.jpg' }} style={styles.backImg}>



<PopupDialog
dialogTitle={<DialogTitle title="Failed to get your location..." />}
ref={(popupLocationFailure) => { this.popupLocationFailure = popupLocationFailure; }}
width={SCREEN_WIDTH*0.8}
height={SCREEN_HEIGHT*0.4}
dialogAnimation = {this.popupAnimation}
onDismissed = { () => {
  this.quitAppLocation();
}}
>
<View style={{flex: 1, alignItems:  'center', justifyContent: 'center'}}>
<Text style={{ padding: 20, fontSize:  20, color: 'white', }}>This app works to show you what people are thinking around you, and it cannot do that without knowing your location. Please restart the app and make sure that your location is accessible.</Text>
</View>
</PopupDialog>

<PopupDialog
dialogTitle={<DialogTitle title="Maybe try going to a new place!" />}
ref={(popupAllDone) => { this.popupAllDone = popupAllDone; }}
width={SCREEN_WIDTH*0.8}
height={SCREEN_HEIGHT*0.3}
dialogAnimation = {this.popupAnimation}
>
<View style={{flex: 1, alignItems:  'center', justifyContent: 'center'}}>
<Text style={{ padding: 20, fontSize:  20}}>No more new expressions around you! Come back later. Meanwhile, why not express something yourself?</Text>
</View>
</PopupDialog>


<View style={styles.deck}>

  <SwipeDeck
            data={this.state.dataState}
            renderCard={this.renderCard}
            renderNoMoreCards={this.renderNoMoreCards}
            onSwipeRight={this.onSwipeRight}
            onSwipeLeft={this.onSwipeLeft}
            updateCurrentCard={this.updateCurrentCard}
  />
</View>

<PopupDialog
dialogTitle={<DialogTitle title="Other Bruins will see this soon!" />}
ref={(popupSuccess) => { this.popupSuccess = popupSuccess; }}
width={SCREEN_WIDTH*0.8}
height={SCREEN_HEIGHT*0.18}
dialogAnimation = {this.popupAnimation}
>
<View style={{flex: 1, alignItems:  'center', justifyContent: 'center'}}>
<Text>Success!</Text>
</View>
</PopupDialog>



<PopupDialog
dialogTitle={<DialogTitle title="Express your thought here, no login required!" />}
ref={(popupDialog) => { this.popupDialog = popupDialog; }}
width={SCREEN_WIDTH*0.8}
height={SCREEN_HEIGHT*0.3}
dialogAnimation = {this.popupAnimation}
>
  <View style={{ flex: 1,  }}>

      <TextInput
      style={popupInput()}
      onChangeText={(text) => this.setState({text:  text })}
      maxLength={160}
      multiline={true}
      placeholder={`                160 Characters Limit!`}
    />


    <View style={{ alignItems:  'center', marginBottom: 20 }}>
      <TouchableHighlight style={ buttonContainer2()} onPress={this.showComments.bind(this)} underlayColor={`white`}>
        <Image style={buttonItself2()} source={{ uri: 'https://i.imgur.com/zeqA1mX.png' }} />
      </TouchableHighlight>
    </View>

  </View>
</PopupDialog>



<View style={bottomView()}>

    <TouchableHighlight style={ buttonContainer()} onPress={ () => {
      this.popupDialog.show();
    }} >
      <Image style={buttonItself()} source={{ uri: 'https://i.imgur.com/KVmp9pC.jpg' }} />

    </TouchableHighlight>

      <View style={{ flex: 1,
        backgroundColor: 'rgba(0,0,0,0)',
        }}>
      <Text style={footerText()} >BruinExpress</Text>
    </View>


</View>



</Image>
</View>
    );
  }
}
const styles = StyleSheet.create({
  deck : {
    flex: 10,
    marginTop: 20,
  },
  titleCardTextStyle: {
    // position: 'absolute',
    // // left: 15,
    // // bottom: 10,

    fontSize: 30,
    fontStyle:  'italic',
    marginLeft: 20,
    marginRight:  20,
  },

  subtitleCardTextStyle:  {
    fontSize: 25,
    fontWeight: 'bold',

  },

  backImg: {
    flex: 1,
    width: null,
    height: null,
  },

});

function footerText() {
  return {
  fontSize: 40,
  color:  '#0D8ABC',


  };
}

const hiwid = 50;

function buttonItself() {
  return {
    height: hiwid,
    width:  hiwid+100,
    borderRadius: hiwid*0.2,

  };
}

function buttonItself2() {
  return {
    height: (hiwid),
    width:  (hiwid),

  };
}

function buttonContainer() {
  return {
    height: hiwid,
    width:  hiwid+100,
    borderRadius: hiwid*0.2,

  };
}
function buttonContainer2() {
  return {
    height: hiwid,
    width:  hiwid,
    borderRadius: hiwid*0.5,

  };
}

function  bottomView() {
  return {
    flex: 3,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop:  SCREEN_HEIGHT*0.25,
  };
}

function popupInput() {
  return {
      flex: 1,
  }
}
