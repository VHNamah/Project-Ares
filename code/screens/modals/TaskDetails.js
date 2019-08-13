import React from 'react';
import { Modal, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import moment from 'moment';

import { Divider } from '../../components/Divider';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

export default TaskDetails = (props) => (
    <Modal style={{flex:1}} visible={props.display} animationType="slide" onRequestClose={props.close}>
        <View style={STYLES.wrapper}>

            <View style={STYLES.panel}>
                <Text style={STYLES.title}>TASK DETAILS</Text>        
            </View>
            <Divider offset={10} color={Colors.Theme.Default} thickness={2} />
            <View style={STYLES.group}>
                <Text style={STYLES.label}>Name:</Text>
                <Text style={STYLES.detail}>{props.data.name}</Text>
            </View>
            <Divider offset={10} color={Colors.Theme.Default} thickness={2} />
            <View style={STYLES.group}>
                <Text style={STYLES.label}>Description:</Text>
                <Text style={STYLES.detail}>{props.data.description}</Text>
            </View>
            <Divider offset={10} color={Colors.Theme.Default} thickness={2} />
            <View style={STYLES.group}>
                <Text style={STYLES.label}>Deadline:</Text>
                <Text style={STYLES.detail}>{moment(Date(props.data.deadline)).format('DD-MM-YYYY hh:mm')}</Text>
            </View>
            <Divider offset={10} color={Colors.Theme.Default} thickness={2} />            
            <TouchableOpacity onPress={props.close} style={{margin:10}}>
                <View style={STYLES.button}>
                    <Text style={STYLES.caption}>CLOSE DETAILS</Text>
                </View>
            </TouchableOpacity>
        </View>
    </Modal>
)

const STYLES = StyleSheet.create({
    group: {
        marginTop: 7.5,
        marginBottom: 7.5
    },
    wrapper: {
        flex: 1,
        backgroundColor: Colors.Theme.Background,
        justifyContent: "center",
        paddingLeft: 15,
        paddingRight: 15
    },

    panel: {
        alignItems: 'center',
        marginBottom: 30
    },

    title: {
        fontFamily: Fonts.Primary,
        fontSize: 28,
        color: Colors.Theme.Text,
        marginLeft: 15,
        marginRight: 15
    },

    detail: {
        color: Colors.Theme.Button.TextLight,
        marginBottom: 10,
        fontSize: 18,
        fontFamily: Fonts.PrimaryLight,
        textAlign: 'justify',
        marginLeft: 15,
        marginRight: 15
    },

    label: {
        color: Colors.Theme.TextDisabled,
        marginTop: 10,
        fontSize: 14,
        fontFamily: Fonts.PrimaryLight,
        textAlign: 'justify',
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 5
    },

    button: {
        margin: 20,
        padding: 15,
        backgroundColor: "#E53935",
        borderRadius: 100,
        alignItems: "center",
        alignSelf: "center",        
        paddingLeft: 30,
        paddingRight: 30
    },

    caption: {
        color: Colors.Theme.Button.TextLight,
        marginLeft: 5,
        marginRight: 5,
        fontFamily: Fonts.Primary,   
    },
});