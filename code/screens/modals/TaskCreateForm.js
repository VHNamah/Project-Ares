import React from 'react';
import { Modal, Text, TouchableOpacity, View, Alert, StyleSheet, TextInput } from 'react-native';
import DatePicker from 'react-native-datepicker'

import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import { Guid } from 'guid-typescript';
import moment from 'moment'

const INITIAL = {
    id: null,
    name: null,
    description: null,
    deadline: null,
    created: null,
    status: null
}

export default class TaskCreateForm extends React.Component {

    state = INITIAL;

    handleNameChange = (e) => {
        this.setState({
            name: e.target.value
        });
    }

    handleDescriptionChange = (e) => {
        this.setState({
            description: e.target.value
        })
    }

    submitTask = () => {
        var model = {
            id: Guid.create().toString(),
            name: this.state.name,
            description: this.state.description,
            deadline: moment(this.state.date).format(),
            created: moment(Date.now()).format(),
            status: false
        }

        console.log(model);

        var date_valid = VALIDATOR.DateCheck(model.created, model.deadline);
        var name_valid = VALIDATOR.PresenceCheck(model.name);
        var description_valid = VALIDATOR.PresenceCheck(model.description);

        if (date_valid && name_valid && description_valid) {
            this.props.action(model);
            this.setState(INITIAL);

            this.props.close();
        } else {
            var alert_message = "";
            if (!date_valid) { alert_message += "Deadline: Cannot be past.\n"; }
            if (!name_valid) { alert_message += "Name: Cannot be blank.\n"; }
            if (!description_valid) { alert_message += "Description: Cannot be blank.\n"; }

            Alert.alert(
                'INVALID ENTRY',
                alert_message.trim(),
                [
                  {text: 'OK', onPress: () => this.setState({date: ""})}
                ],
                { cancelable: true }
            )
        }        
    }

    render() {
        return (
            <Modal style={{ flex: 1 }} visible={this.props.display} animationType="slide" onRequestClose={this.props.close}>
                <View style={STYLES.wrapper}>
                    <View style={STYLES.panel}>
                        <Text style={STYLES.title}>CREATE NEW TASK</Text>
                    </View>

                    <TextInput onChangeText={(name) => this.setState({ name })} value={this.state.name}
                        placeholder="ENTER TASK TITLE" style={STYLES.input}
                    />
                    <TextInput onChangeText={(description) => this.setState({ description })} value={this.state.description} placeholder="ENTER A BRIEF DESCRIPTION"
                        multiline={true} style={STYLES.input}
                    />

                    <View>
                        <DatePicker
                            style={[STYLES.datepicker]}
                            mode="datetime"
                            date={this.state.date}
                            androidMode="spinner"
                            placeholder="TAP TO SET DEADLINE"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            onDateChange={(date) => this.setState({ date })}
                            showIcon={false}
                            customStyles={DATEPICKERSTYLES} />

                    </View>
                    
                    <TouchableOpacity onPress={() => this.submitTask()} style={{ marginTop: 10 }}>
                        <View style={STYLES.button}>
                            <Text style={STYLES.caption}>CREATE</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </Modal>
        );
    }
}

const STYLES = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: Colors.Theme.Background,
        justifyContent: "center",
        paddingLeft: 15,
        paddingRight: 15
    },

    input: {
        margin: 10,
        padding: 10,
        height: 40,
        borderWidth: 1,
        borderColor: Colors.Theme.Default,
        borderRadius: 100,
        paddingLeft: 15,
        paddingRight: 15,
        color: Colors.Theme.TextLight,
        textAlign: "center"
    },

    panel: {
        alignItems: 'center',
        marginBottom: 30
    },

    title: {
        fontFamily: Fonts.Primary,
        fontSize: 28,
        color: Colors.Theme.Text
    },
    button: {
        margin: 20,
        padding: 15,
        backgroundColor: "#26A69A",
        borderRadius: 100,
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
    datepicker: {
        padding: 15,
        borderRadius: 100,
        paddingLeft: 30,
        paddingRight: 30,
        width: 350,
        alignSelf: "center"
    }
});

const DATEPICKERSTYLES = {
    dateTouchBody: {
        color: Colors.Theme.TextLight
    },
    dateInput: {
        padding: 10,
        height: 40,
        borderWidth: 1,
        borderColor: Colors.Theme.Default,
        borderRadius: 100,
        paddingLeft: 15,
        paddingRight: 15,
        color: Colors.Theme.TextLight
    },
    dateIcon: {
        margin: 0,
        padding: 0
    },
    dateText: {
        color: Colors.Theme.TextLight
    }
}

const VALIDATOR = {
    DateCheck: (created, deadline) => {
        if(moment(created).isBefore(moment(deadline))) {
            return true;
        }

        return false;
    },

    PresenceCheck: (value) => {
        return !(value == null || value == "");
    }
}