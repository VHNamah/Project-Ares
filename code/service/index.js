import Endpoints from '../constants/Endpoints';

export const FetchTasksAsync = async () => {
    const result = await fetch(Endpoints.Tasks.Default).then((response) => response.json());
    return result;
}

export const CreateTaskAsync = async (model) => {
    const result = await fetch(Endpoints.Tasks.Default, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(model)
    }).then((response) => response.json());

    return result;
}

export const CloseTaskAsync = async (id) => {
    const result = await fetch(Endpoints.Tasks.Default + id, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({status:true})
    }).then((response) => response.json());

    return result;
}