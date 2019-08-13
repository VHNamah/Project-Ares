/**
 * Author: Vidush H. Namah (2019)
 * 
 * Widget for SONOFF S20 Device
 */

import React from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';

import { Ionicons as Icon } from '@expo/vector-icons';
import moment from 'moment';

import Colors from '../../constants/Colors';
import { ActionButton } from '../../components';
import Fonts from '../../constants/Fonts';

export default BasicCard = (props) => (
    <View style={[STYLES.card, props.style]}>
        <View style={[STYLES.content]}>
            <View style={[STYLES.center]}>
                <Text style={[STYLES.font, STYLES.tag, props.disabled && {color: Colors.Theme.TextDisabled}]}>
                    DEADLINE: { moment(new Date(props.data.deadline)).format('DD-MM-YYYY hh:mm') }
                </Text>
                <Text style={[STYLES.font, props.disabled && {color: Colors.Theme.TextDisabled}]}>{props.data.name.toUpperCase()}</Text>
            </View>
        </View>
        { !props.disabled && 
            <View>
                <ActionButton diameter={40} background="#E0F2F1" action={props.action}>
                    <Icon name="md-checkmark-circle" size={30} color="#26A69A" />
                </ActionButton>
            </View>
        }
        {
            props.disabled &&
            <View>
                <Icon name="md-checkmark" size={25} color={Colors.Theme.TextDisabled} style={{marginRight:10}} />
            </View>
        }
    </View>
);

const STYLES = StyleSheet.create({
    imagewrap: {
        marginRight: 10 
    },
    icon: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        margin: 0,
        padding: 0
    },
    card: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderRadius: 50
    },
    content: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    center: {
        flex: 1,
        justifyContent: 'center'
    },
    tag: {
        fontSize: 11,
        marginBottom: 2
    },
    font: {
        fontFamily: Fonts.Primary,
        fontSize: 15,
        color: Colors.Theme.Text
    },
    border: {
        borderWidth: 1,
        borderColor: Colors.Theme.Button.BorderDefault,
        borderRadius: 100,
    }
});
