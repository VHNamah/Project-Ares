/**
 * Author: Vidush H. Namah (2019)
 * 
 * Creates Navigation Stack for the entire application
 * All screens supporting navigation should be linked via
 * a key here.
 */

import React from 'react';
import { StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import { connect } from 'react-redux';

import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import Main from '../screens/Main';

const IMGHeaderBG = require('../../assets/images/headerbg.png');
const IMGBackBTN = require('../../assets/images/icons/back.png');
const IMGLogoutBTN = require('../../assets/images/icons/logout-light.png')

const NavigationStack = createStackNavigator(
    {
        Main: {
            screen: Main,
            navigationOptions: ({ navigation }) => {
                return {
                    headerLeft: props => (
                        <TouchableOpacity onPress={props.onPress} style={STYLES.HeaderOption}>
                            <Image source={IMGLogoutBTN} style={STYLES.HeaderItem} resizeMode="contain" />
                            <Text style={{ color:Colors.Theme.Text, padding:0, margin:0 }}>EXIT</Text>
                        </TouchableOpacity>
                    )
                }
            }
        }
    },
    {
        defaultNavigationOptions: ({ navigation }) => {
            return {
                title: null,
                titleStyle: {
                    fontFamily: Fonts.PrimaryLight
                },
                headerStyle: {
                    backgroundColor: Colors.Theme.StatusBar,
                    borderBottomWidth: 0,        
                    elevation: 0, // ANDROID: Remove shadow
                    shadowOpacity: 0, // IOS: Remove shadow
                },
                headerBackground: null,
                headerTitleStyle: {
                    color: Colors.Theme.LightText,
                    fontFamily: Fonts.Primary,
                    flex: 1,
                    textAlign: "center"
                },
                headerTintColor: '#222222',
                headerLeft: props => (
                    <TouchableOpacity onPress={props.onPress} style={STYLES.HeaderOption}>
                        <Image source={IMGBackBTN} style={STYLES.HeaderItem} resizeMode="contain" />
                    </TouchableOpacity>
                )
            }
        }
    }
);

const STYLES = StyleSheet.create({
    Header: {
        flex: 1
    },
    HeaderOption: {
        padding:5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    HeaderItem: {
        height: 25
    }
});

export default Navigator = createAppContainer(NavigationStack);