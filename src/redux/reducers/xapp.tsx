const initialState = {
    post: [
        {
            title: 'title',
            description: 'description',
            img: '//placehold.it/200'
        },
        {
            title: 'title1',
            description: 'description1',
            img: '//placehold.it/200'
        },
        {
            title: 'title2',
            description: 'description2',
            img: '//placehold.it/200'
        }
    ]
}

function XApp(state = initialState, action: any) {
    //eventually adding logic to handle create, update, and delete
    return state
}

export default XApp;