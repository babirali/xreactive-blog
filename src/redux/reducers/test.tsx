const initialState = {
    loading: false,
    tags: [
        {
            img: "test1",
            title: "test1",
        },
    ],
};
export default (state = initialState, action: any) => {
    switch (action.type) {
        case "test":
            return state;
        default:
            return state;
    }
};
