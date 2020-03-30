import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

import {vibrate} from './utils'

class Count extends React.Component {
  workMins_const = 0;
  workSecs_const = 5;
  breakMins_const = 0;
  breakSecs_const = 20;
  constructor() {
    super()
    this.state = {
      actvty: 0, //0-work, 1-break
      workMins: 0,
      workSecs: 5,
      workMins_upd: 0,
      workSecs_upd: 5,
      breakMins: 0,
      breakSecs: 20,
      breakMins_upd: 0,
      breakSecs_upd: 20,
    }
  }

  componentDidMount() {
    this.interval = setInterval(this.timer, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  timer = () => {
    if (!this.state.actvty && this.state.workSecs !== 0){
      this.setState(prevState => ({
        workSecs: prevState.workSecs - 1,
      }))
    } else if (!this.state.actvty) {
      this.setState(prevState => ({
        workMins: prevState.workMins - 1,
        workSecs: 59,
      }))
    }

    if (this.state.actvty && this.state.breakSecs !== 0){
      this.setState(prevState => ({
        breakSecs: prevState.breakSecs - 1,
      }))
    } else if (this.state.actvty) {
      this.setState(prevState => ({
        breakMins: prevState.breakMins - 1,
        breakSecs: 59,
      }))
    }

    if (this.state.workMins === 0 && this.state.workSecs === 0) {
      vibrate()
        this.setState(() => ({
          actvty: 1,
          breakMins: this.state.breakMins_upd,
          breakSecs: this.state.breakSecs_upd,
          workMins: this.state.workMins_upd,
          workSecs: this.state.workSecs_upd,
        }))
    }

    if (this.state.breakMins === 0 && this.state.breakSecs === 0) {
      vibrate()
      this.setState(() => ({
        actvty: 0,
        workMins: this.state.workMins_upd,
        workSecs: this.state.workSecs_upd,
        breakMins: this.state.breakMins_upd,
        breakSecs: this.state.breakSecs_upd,
      }))
    }
  }

  handleWorkMins = (mins) => {
    if(mins) this.workMins_const = mins
    else this.workMins_const = 0
  }

  handleWorkSecs = (secs) => {
    if(secs) this.workSecs_const = secs
    else this.workSecs_const = 0
  }

  handleBreakMins = (mins) => {
    if (mins) this.breakMins_const = mins
    else this.breakMins_const = 0
  }

  handleBreakSecs = (secs) => {
    if (secs) this.breakSecs_const = secs
    else this.breakSecs_const = 0
  }

  upd = () => {
    this.setState({
      workSecs_upd: this.workSecs_const,
      workMins_upd: this.workMins_const,
      breakSecs_upd: this.breakSecs_const,
      breakMins_upd: this.breakMins_const,
    })
  }

  reset = () => {
    this.setState({
      workSecs_upd: this.workSecs_const,
      workMins_upd: this.workMins_const,
      breakSecs_upd: this.breakSecs_const,
      breakMins_upd: this.breakMins_const,
    })
  }

  render() {
    if(!this.state.actvty){
      return (
        <View style={styles.container}>
          <Text style={styles.text}>Work Timer</Text>
          <Text style={styles.time}>{this.state.workMins} : {this.state.workSecs}</Text>
          <View style={styles.setTimers}>
            <Text>Work Time:</Text>
            <TextInput style={styles.input}
                underlineColorAndroid = "transparent"
                placeholder = " mins"
                placeholderTextColor = "#111"
                autoCapitalize = "none"
                onChangeText={this.handleWorkMins}
            />
            <TextInput style={styles.input}
                underlineColorAndroid = "transparent"
                placeholder = " secs"
                placeholderTextColor = "#111"
                autoCapitalize = "none"
                onChangeText={this.handleWorkSecs}
            />
          </View>
          <View style={styles.setTimers}>
            <Text>Break Time:</Text>
            <TextInput style={styles.input}
                underlineColorAndroid = "transparent"
                placeholder = " mins"
                placeholderTextColor = "#111"
                autoCapitalize = "none"
                onChangeText={this.handleBreakMins}
            />
            <TextInput style={styles.input}
                underlineColorAndroid = "transparent"
                placeholder = " secs"
                placeholderTextColor = "#111"
                autoCapitalize = "none"
                onChangeText={this.handleBreakSecs}
            />
          </View>
        <Button title="Update" onPress={this.upd}/>
        <Button title="Reset" onPress={this.reset}/>
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>Break Timer</Text>
          <Text style={styles.time}> {this.state.breakMins} : {this.state.breakSecs} </Text>
          <View style={styles.setTimers}>
            <Text>Work Time:</Text>
            <TextInput style={styles.input}
                  underlineColorAndroid = "transparent"
                  placeholder = " mins"
                  placeholderTextColor = "#111"
                  autoCapitalize = "none"
                  onChangeText={this.handleWorkMins}
            />
            <TextInput style={styles.input}
                  underlineColorAndroid = "transparent"
                  placeholder = " secs"
                  placeholderTextColor = "#111"
                  autoCapitalize = "none"
                  onChangeText={this.handleWorkSecs}
            />
          </View>
          <View style={styles.setTimers}>
            <Text>Break Time:</Text>
            <TextInput style={styles.input}
                  underlineColorAndroid = "transparent"
                  placeholder = " mins"
                  placeholderTextColor = "#111"
                  autoCapitalize = "none"
                  onChangeText={this.handleBreakMins}
            />
            <TextInput style={styles.input}
                  underlineColorAndroid = "transparent"
                  placeholder = " secs"
                  placeholderTextColor = "#111"
                  autoCapitalize = "none"
                  onChangeText={this.handleBreakSecs}
            />
          </View>
          <Button title="Update" onPress={this.upd}/>
          <Button title="Reset" onPress={this.reset}/>
        </View>
      )
    }
  }
}

export default class App extends React.Component {
  render() {
    return <Count/>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff38',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 48,
    fontWeight: "bold",
  },
  time: {
    fontSize: 40,
  },
  input: {
      margin: 5,
      height: 40,
      paddingHorizontal: 10,
      width: 100,
      borderColor: '#000',
      borderWidth: 1
   },
   setTimers: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
  }
});
