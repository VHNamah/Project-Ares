/**
 * Author: Vidush H. Namah (2019)
 * 
 * Reducer for SONOFFS20 WIDGET
*/

import * as ACTIONS from './Actions';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import { FetchTasksAsync, CreateTaskAsync, CloseTaskAsync } from '../service/index';

function* CreateTaskSagaHandler(model) {
    try {
        yield put({ type: ACTIONS.SAGA_CREATE_START });
        console.log("[SAGA] Creating new task");
        console.log(model.payload);
        
        // SERVER CREATE CALL
        const record = yield call(CreateTaskAsync, model.payload);

        yield put({ type: ACTIONS.SAGA_CREATE_SUCCESS, payload: record });
    } catch (e) {
        console.log("[SAGA] Create failed - " + e);
        yield put({ type: ACTIONS.SAGA_CREATE_FAILED, payload: e });
    }
}

function* CloseTaskSagaHandler(model) {
    try {
        yield put({ type: ACTIONS.SAGA_CLOSE_START });
        console.log("[SAGA] Closing task " + model.payload + ".");

        // PATCH TO SERVER
        const record = yield call(CloseTaskAsync, model.payload);

        yield put({ type: ACTIONS.SAGA_CLOSE_SUCCESS, payload: record });
    } catch (e) {
        console.log(e);
        yield put({ type: ACTIONS.SAGA_CLOSE_FAILED, payload: e });
    }
}

function* GetDataSagaHandler() {
    try {
        yield put({ type: ACTIONS.SAGA_FETCH_START });
        console.log("[SAGA] Fetching data.");

        const data = yield FetchTasksAsync();

        console.log("[SAGA] Received data.");
        console.log(data);
        yield put({ type: ACTIONS.SAGA_FETCH_SUCCESS, payload: data });
    } catch (e) {
        console.log("[SAGA] Fetch failed - " + e);
        yield put({ type: ACTIONS.SAGA_FETCH_FAILED, payload: e });
    }
};

function* DefaultSaga() {
    console.log("[SAGA] Waiting to FETCH/CREATE/CLOSE Tasks.");
    yield takeLatest(ACTIONS.SAGA_FETCH_DATA, GetDataSagaHandler);
    yield takeEvery(ACTIONS.SAGA_CREATE_TASK, CreateTaskSagaHandler);
    yield takeEvery(ACTIONS.SAGA_CLOSE_TASK, CloseTaskSagaHandler);
}

export default DefaultSaga;