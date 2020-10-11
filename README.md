# Hermit

## Contents

1. [Short description](#short-description)
1. [The architecture](#the-architecture)
1. [Project roadmap](#project-roadmap)
1. [Getting started](#getting-started)
1. [Built with](#built-with)
1. [The team](#the-team)


## Short description
Project "hermit" promotes social distancing via gamification. The user's distance to other persons will be tracked, resulting in a score and feedback which encourages to keep physical distance. A device will also give immediate feedback to influence the users immediate behavior.


## The architecture
<p align="center"><img src="https://media.github.ibm.com/user/11875/files/6b73b180-bb0b-11ea-8ce1-71afe70dc343" height="300"></p>  

The necklace will constantly scan the environment for movement and heat information. The necklace sends notifications with that data to a phone app. The phone app will forward this data via a HTTP request to the IBM Cloud. It will be stored in Cloudant. The scoring engine works on that data and classify the behavior of the user. The result of that classification will be sent back to the phone and displayed to the user.  

<p align="center"><img src="https://media.github.ibm.com/user/11875/files/6d3d7500-bb0b-11ea-8404-5b112662ec40" height="300"></p>

### User feedback on the phone
A phone app will display the results of the data collected by the device. The users will see graphs that show how they keep distance over time. A score will be calculated based on their behavior. The score will be mapped to a state to encourage the user to keep up social distancing. Possible states are: "hermit noob", "amateur loner", "lone wolf". A humorous approach is intended to help motivate the users to engage with the game. 


### User feedback on the device
Lights flashing in different colors intuitively show if the user's distance to another person is too close
or appropriately distanced. The lights will change when the user changes their position in relation to other persons. 


### Necklace
<p align="center"><img src="https://media.github.ibm.com/user/11875/files/724bf580-bb06-11ea-8689-65130aa5f538" height="500"></p>

### Hardware
- [x] GPS
- [x] Speaker 2w
- [x] Arduino Nano
- [x] NeoPixel x7
- [x] PIR x4
- [x] HC-08 Bluetooth
- [x] Battery 3.7v 400mah
- [x] PowerBoost 1000 Charger

### Phone
The implementation of the app is based on the Cordova framework. The Bluetooth connection is established with the Plugin "cordova-plugin-bluetoothle". The app was able to connect from an Android phone to a bluetooth speaker. It was a specific connection to the speaker as the speaker's MAC address was used to establish the connection. The app should be notified by the necklace and with new data. The data will be passed on to the IBM Cloud where the data will be saved and processed. The app will receive data that can be displayed to the user.
A mockup of what we have planned can be seen below.  

<p align="center"><img src="https://media.github.ibm.com/user/11875/files/87288900-bb06-11ea-91a6-b99dff6714f8" height="500"></p>

## Project roadmap
### Phone
- [x] Establish a Bluetooth conenction
- [ ] Bluetooth scan for necklace
- [ ] Connect to necklace
- [ ] Get data from necklace
- [ ] Send data from necklace to IBM Cloud app
- [ ] Receive data from IBM Cloud
- [ ] Add graphs to phone UI that display hermit data
- [ ] Verify the mobile app can use the AppID sdk to use for authenticating
- [ ] Compile app and install on phone

### Necklace
- [x] Movement sensors
- [x] Heat sensors
- [x] Speaker
- [x] GPS
- [x] Lights
- [ ] Sound Sensors
- [ ] Tracking Sensor for area
- [ ] Security for device and necklace
- [ ] Scale down necklace
- [ ] Pair phone to hermit necklace

### Cloud 
- [x] Cloud Foundry Service for API
- [x] Cloudant DB Setup
- [x] CRUD operations for Users (Leaderboard is top x user scores)
- [x] IBM Cloud App ID Setup
- [x] Authentication and API token generation using IBM Cloud App ID
- [x] Decode the token to get a user sub as identification for a given user.
- [ ] Authentication from mobile app using IBM Cloud App ID with Google, Facebook, or create a user on IBM Cloud App ID registry
- [ ] Scoring Engine
- [ ] Finish CRUD operations for accepting user events used for calculating stats, leaderboards, and GPS info for maps in the future
- [ ] Create a web ui that lists leaderboard and could be expanded to include maps, etc

## Getting started
You will need... 
- [NodeJS](https://nodejs.org/en/download/)
- [Android Studio](https://developer.android.com/studio/install)  

From inside the MyApp folder run `npm install`. Then build and run the app with Android Studio.


## Built with

* [IBM Cloudant](https://cloud.ibm.com/catalog?search=cloudant#search_results) - The NoSQL database used
* [IBM AppID](https://cloud.ibm.com/catalog/services/app-id) - provides  ability to use Facebook, Google, SAML, or Cloud Directory to manage and identify users
* [IBM Cloud Foundry](https://www.ibm.com/cloud/cloud-foundry) 
* [NodeJS](https://nodejs.org/en/) - The backend app
* [Cordova](https://cordova.apache.org/) - used to create the phone application

The node.js backend app is hosted on IBM Cloud, using a Cloud Foundry service. This app is bound to a Cloudant nosql database for storing Hermit event data which is used for calculating user scores. For user registry, authentication and api token generation, we use IBM AppID, which provides  ability to use Facebook, Google, SAML, or Cloud Directory to manage and identify users. As a user's phone receives event data, the information is sent to the backend scoring engine to determine the user's new score and level and return updated stats for the user.

## The team
![DSC01945_1080p](https://media.github.ibm.com/user/11875/files/2b5e0000-bb06-11ea-86d2-7b7fa3f99439)  

Going from left to right...
- Andre Augustus
- Chris Murphy
- Dagmar Kutz
- John Foley
