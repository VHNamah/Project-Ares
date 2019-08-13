/**
 * Author: Vidush H. Namah (2019)
 * 
 * Main Screen - currently default template with no purpose
*/

import React from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, RefreshControl, Alert } from 'react-native';
import { connect } from 'react-redux';

import Colors from '../constants/Colors';

import Fonts from '../constants/Fonts';
import { BasicCard } from '../components';
import { Divider } from '../components/Divider';

import moment from 'moment';
import { AsyncFetchData, AsyncCreateTask, AsyncCloseTask } from '../reducers/main'

import TaskDetails from './modals/TaskDetails';
import TaskCreateForm from './modals/TaskCreateForm';

export class MainUI extends React.Component {
    state = {
        modals: {
            details: {
                data: {},
                visible: false
            },
            create: {
                visible: false
            }
        }
    };

    constructor() {
        super();
    }

    triggerDetailsModal(item = {}) {
        visible = this.state.modals.details.visible;
        this.setState(() => {
            return {
                modals: {
                    ...this.state.modals,
                    details: {
                        visible: !visible,
                        data: item
                    }
                }
            }
        });
    }

    triggerCreateModal() {
        visible = this.state.modals.create.visible;
        this.setState(() => {
            return {
                modals: {
                    ...this.state.modals,
                    create: {
                        visible: !visible
                    }
                }
            }
        });
    }

    handleTaskAction = () => {

    }

    renderTaskList() {
        console.log("[MAIN SCREEN] LOADING ITEMS");
        console.log(this.props.data);

        TASKS = []
        data = this.props.data;
        data.sort(x => x.status);

        data.forEach((item) => {
            TASKS.push(
                <View key={item.id}>
                    {/* <Divider offset={10} color={Colors.Theme.Default} thickness={2} /> */}
                    <TouchableOpacity onPress={() => { this.triggerDetailsModal(item) }}>
                        <BasicCard data={item} disabled={item.status} action={() => this.props.CloseTask(item.id)} />
                    </TouchableOpacity>
                </View>
            );
        });

        return TASKS;
    }

    componentDidMount() {
        this.props.RefreshData();
    }

    componentDidUpdate() {
        if (this.props.error && this.props.error.status) {
            Alert.alert(
                this.props.error.title,
                this.props.error.message + "\n\n" + this.props.error.log,
                [
                    {
                        text: 'TRY AGAIN', onPress: () => {
                            console.log('[MAIN] ERROR : TRY AGAIN.')
                            this.props.RefreshData();
                        }
                    },
                    {
                        text: 'CANCEL',
                        onPress: () => console.log('[MAIN] ERROR DISMISSED.'),
                        style: 'cancel',
                    }
                ],
                { cancelable: true },
            );
        }
    }

    render() {
        return (
            <View style={STYLES.wrapper}>
                <TaskCreateForm
                    display={this.state.modals.create.visible}
                    close={() => this.triggerCreateModal()}
                    action={(e) => this.props.CreateTask(e)} />

                <TaskDetails
                    display={this.state.modals.details.visible}
                    data={this.state.modals.details.data}
                    close={() => this.triggerDetailsModal()} />

                <ScrollView style={{}}
                    refreshControl={<RefreshControl refreshing={this.props.loading} onRefresh={this.props.RefreshData} />}>
                    {/* <View style={STYLES.header}>
                        <TouchableOpacity style={STYLES.headeroption}>
                            <Image source={IMGLogoutBTN} style={STYLES.headeritem} resizeMode="contain" />
                            <Text style={{ color: Colors.Theme.Text, padding: 0, margin: 0 }}>EXIT</Text>
                        </TouchableOpacity>
                    </View> */}

                    <View style={STYLES.panel}>
                        <Text style={STYLES.title}>PROJECT ARES</Text>
                        {/* <View style={STYLES.controls}>
                            <ActionButton style={STYLES.option} diameter={HeaderOptionSize} background="#E0F2F1" color={Colors.Theme.Text} caption="ABOUT">
                                <Icon name="md-information-circle" size={HeaderIconSize} color="#26A69A" />
                            </ActionButton>
                            <ActionButton action={this.props.RefreshData} style={STYLES.option} diameter={HeaderOptionSize} background="#E3F2FD" color={Colors.Theme.Text} caption="REFRESH">
                                <Icon name="md-refresh-circle" size={HeaderIconSize} color="#42A5F5" />
                            </ActionButton>
                            <ActionButton style={STYLES.option} diameter={HeaderOptionSize} background="#F3E5F5" color={Colors.Theme.Text} caption="LOGOUT">
                                <Icon name="md-log-out" size={HeaderIconSize} color="#BA68C8" />
                            </ActionButton>
                        </View> */}
                        <View style={STYLES.controls}>
                            <TouchableOpacity onPress={() => this.triggerCreateModal()}>
                                <View style={STYLES.createtask}>
                                    <Text style={STYLES.caption}>CREATE NEW TASK</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Divider offset={10} color={Colors.Theme.Default} thickness={2} />

                    {this.renderTaskList()}

                </ScrollView>
            </View>
        );
    }
}

const STYLES = StyleSheet.create({
    toolbar: {

    },
    wrapper: {
        flex: 1,
        backgroundColor: Colors.Theme.Background
    },
    panel: {
        flex: 1,
        alignItems: 'center',
        marginBottom: 30,
        paddingTop: 40
    },
    controls: {
        marginTop: 30,
        flex: 1,
        flexDirection: 'row'
    },
    option: {
        marginLeft: 15,
        marginRight: 15
    },
    title: {
        fontFamily: Fonts.Primary,
        fontSize: 28,
        color: Colors.Theme.Text
    },
    room: {
        marginTop: 20,
        marginBottom: 20
    },
    header: {
        flex: 1,
        paddingTop: 35,
        marginLeft: 15
    },
    headeroption: {
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    headeritem: {
        width: 25,
        height: 25,
        marginRight: 10
    },
    createtask: {
        flex: 1,
        padding: 15,
        backgroundColor: "#26A69A",
        borderRadius: 100
    },
    caption: {
        color: Colors.Theme.Button.TextLight,
        marginLeft: 5,
        marginRight: 5,
        fontFamily: Fonts.Primary
    }
});

const mapStateToProps = (store) => ({
    data: store.State.Data,
    loading: store.State.Loading,
    error: store.State.Error
});
const mapActionsToProps = (dispatch) => ({
    RefreshData: () => dispatch(AsyncFetchData()),
    CreateTask: (model) => dispatch(AsyncCreateTask(model)),
    CloseTask: (id) => dispatch(AsyncCloseTask(id))
});

export default Main = connect(mapStateToProps, mapActionsToProps)(MainUI);