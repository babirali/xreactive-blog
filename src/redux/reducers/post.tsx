// import initialState from "../initial-state";
const initialState: any = {
    loading: false,
    post: [
        {
            img: "test",
            title: "test",
        },
    ],
};
export default (state = initialState, action: any) => {
    switch (action.type) {
        case "get":
            return state;
        case "save":
            return [
                ...state.post,
                { img: "test", title: "test" },
            ];
        default:
            return state;
    }
};
