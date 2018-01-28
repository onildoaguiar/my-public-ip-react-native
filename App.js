import React from 'react';
import { Platform, StyleSheet, Text, View, Image, Button } from 'react-native';
import { AdMobBanner } from 'expo';

import logo from './assets/logo.png';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myPublicIp: '',
      adUnitID: Platform.OS === 'ios'
        ? 'ca-app-pub-7075742595048757/1237582754'
        : 'ca-app-pub-7075742595048757/7337631830',
    };
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
          <Image style={styles.logo} source={logo} />
          <Text style={styles.ip}>{this.state.myPublicIp}</Text>
          <Button
            title="Find my public IP"
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
