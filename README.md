![Open Chord Icon](android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png?raw=true "OpenChord")

# OpenChord
Cross-platform chordpro reader app for Android and iOS written with React Native.

[![Build Status](https://travis-ci.org/artutra/OpenChord.svg?branch=master)](https://travis-ci.org/artutra/OpenChord)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![David](https://img.shields.io/david/artutra/OpenChord.svg)](https://david-dm.org/artutra/OpenChord)
[![Discord](https://img.shields.io/discord/650021747382550528)](https://discord.gg/HzCSQpx)

<p style="display: flex;flex-wrap: wrap; align-items: center;justify-content: center">
  <a href="https://play.google.com/store/apps/details?id=com.openchord">
    <img src="https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png" width="250">
  </a>
</p>

# :camera: Screenshots

<p float="left">
  <img src="./screenshots/ArtistList.png" alt="screenshot-1" width="150">
  <img src="./screenshots/SongList.png" alt="screenshot-2" width="150">
  <img src="./screenshots/ChordDiagram.png" alt="screenshot-3" width="150">
  <img src="./screenshots/Toolbar.png" alt="screenshot-4" width="150">
  <img src="./screenshots/EditSong.png" alt="screenshot-5" width="150">
</p>

# :rocket: Features
Open Chord is a React Native application for both Android and iOS that allows you to organize your chord charts, lyric sheets and songbooks with a simple app on your tablet or smartphone. Open Chord easily allows you to get rid of all that paper by displaying your music in a flexible, easy to read format.

To perform searches and download the songs the app uses [OpenChordApi](https://cifralivre.com.br/api/).
OpenChordApi is currently BETA, which means it may be unreliable, unavailable or not working. That said, it's already useful and we're working to make it rock solid.

Join the community: [Discord Chat](https://discord.gg/HzCSQpx)

A few features include:

| Feature                          | Support            |
|:-------------------------------- |:------------------:|
| Render song with chordpro format | :heavy_check_mark: |
| Import songs from the web        | :heavy_check_mark: |
| Transpose song                   | :heavy_check_mark: |
| Create/edit song                 | :heavy_check_mark: |
| Show/hide tabs                   | :heavy_check_mark: |
| Configure font size              | :heavy_check_mark: |
| Show guitar chord diagrams       | :heavy_check_mark: |
| Autoscroll                       | :heavy_check_mark: |
| Manage playlists                 | :heavy_check_mark: |
| Search saved songs               | :heavy_check_mark: |
| Slide with touch                 | :clock2:           |
| Slide with volume button         | :clock2:           |
| Multiple columns visualization   | :clock2:           |
| Multiple languages support       | :clock2:           |
| Chord dictionary                 | :clock2:           |
| Playlist presentation mode       | :clock2:           |

:heavy_check_mark: = supported

:clock2: = will be supported in a future version

:heavy_multiplication_x: = currently no plans to support it in the near future

## :hammer: Try it yourself

### 1. Clone and Install

```bash
# clone the repo
git clone https://github.com/artutra/OpenChord.git

# Open the folder and install dependencies
cd OpenChord && npm install
```

### 2. Run it on both iOS and Android
```bash
# Run on iOS
npm run build:ios

# Run on Android
npm run build:android
```
### Or use Docker (for Android)
```bash
# Build the container and run the build scripts inside it
docker-compose run --service-ports android bash
```
Obs: The docker container can't attatch to the device via USB. You have to build the app-debug.apk using `npm run build:android`, copy the generated file inside `./android/app/build/outputs/apk/debug/app-debug.apk` and install it manually on the device.


## Built With

* [React Native v0.60](https://facebook.github.io/react-native/) - The framework for building native apps using React
* [Realm v3.0](https://github.com/realm/realm-js) - Realm is a mobile database that runs directly inside phones, tablets or wearables
* [React Navigation v4.0](https://reactnavigation.org) - React Native module support navigation
* [React Native Vector Icons v6.6](https://github.com/oblador/react-native-vector-icons) - Customizable Icons for React Native with support for NavBar/TabBar/ToolbarAndroid, image source and full styling
* [React Native Webview](https://github.com/react-native-community/react-native-webview) - A modern, well-supported, and cross-platform WebView for React Native
* [ChordSheetJS](https://github.com/martijnversluis/ChordSheetJS) - A JavaScript library for parsing and formatting chord sheets
* [ChordPro](https://www.chordpro.org/chordpro/index.html) - A text file format to write lead sheets, songs with lyrics and chords

## :raising_hand: How can you help
If you find any problems, feature requests, please open an issue or submit a fix as a pull request.

## :newspaper: License
[GNU General Public License v3.0](LICENSE)

## :star: Credits
Made with :heart: by [Artur Miranda](https://github.com/artutra)
