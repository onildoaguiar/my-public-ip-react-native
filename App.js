import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image } from 'react-native';
import { Button } from 'react-native-elements'
import { AdMobBanner, AppLoading, Asset } from 'expo';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      myPublicIp: '',
      adUnitID: Platform.OS === 'ios'
        ? 'ca-app-pub-7075742595048757/1237582754'
        : 'ca-app-pub-7075742595048757/7337631830',
    };
  }

  async loadAssetsAsync() {
    const imagesAssets = [
      require('./assets/logo.png')
    ];

    const cacheImages = imagesAssets.map((image) => {
      return Asset.fromModule(image).downloadAsync();
    });
    return Promise.all(cacheImages)
  }

  async findMyPublicIp() {
    this.setState({
      myPublicIp: 'Finding my public IP...',
    });

    const ip = await fetch('http://httpbin.org/ip');
    const myPublicIp = await ip.json();
    this.setState({
      myPublicIp: myPublicIp.origin,
    });
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this.loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }

    return (
      <View style={styles.container}>
        <AdMobBanner
          style={styles.admob}
          bannerSize="banner"
          adUnitID={this.state.adUnitID}
          testDeviceID="EMULATOR"
          didFailToReceiveAdWithError={this.bannerError}
        />
        <View style={styles.body}>
          <Image style={styles.logo} source={require('./assets/logo.png')} />
          <Text style={styles.ip}>{this.state.myPublicIp}</Text>
          <Button
            title="Find my public IP"
            buttonStyle={styles.button}
            onPress={this.findMyPublicIp.bind(this)}
          />
        </View>
        <View style={styles.footer}>
          <Text style={styles.made}> {'<> with ❤ by Onildo Aguiar'}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2F2336',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  admob: {
    paddingTop: 25,
  },
  button: {
    backgroundColor: '#1E88E5',
    borderRadius: 25
  },
  ip: {
    color: 'white',
    paddingTop: 20,
    paddingBottom: 20,
  },
  logo: {
    width: 250,
    height: 100,
  },
  footer: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  made: {
    color: 'white',
    textAlign: 'center',
  },
});
