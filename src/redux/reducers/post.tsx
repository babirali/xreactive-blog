// import initialState from "../initial-state";
const initialState: any = {
    loading: false,
    post: [
        {
            img: 'test',
            title: 'test'
        }
    ]
}
export default (state = initialState, action: any) => {
    switch (action.type) {
        case "get":
            { console.log(state); return state };
        case "save":
            console.log(state)
            return [
                ...state.post,
                { img: 'test', title: 'test' }
            ]
        default:
            return state;
    }
};