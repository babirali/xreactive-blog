const initialState = {
    loading: false,
    tags: [
        {
            img: 'test1',
            title: 'test1',
        }
    ]
}
export default (state = initialState, action: any) => {
    switch (action.type) {
        case "test":
            { console.log(state); return state };
        default:
            return state;
    }
};