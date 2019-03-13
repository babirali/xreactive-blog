// import initialState from "../initial-state";
const initialState = {
    loading: false,
    post: [
        {
            img: 'test',
            title: 'test',
        }
    ]
}
export default (state = initialState, action: any) => {
    switch (action.type) {
        case "get":
            { console.log(state); return state };
        default:
            return state;
    }
};