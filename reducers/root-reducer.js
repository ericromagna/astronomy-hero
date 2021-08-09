const initialState = {
    kpi: [1,2,2,4],
    asteroids: {}
}

const rootReducer = (state = initialState , action) => {
   
    console.log(`rootReducer: action type ${action.type} called`);
    console.log(`rootReducer: kpi ${action?.kpi}`);

    //TODO: Instead of literal strings use Enums
    if (action.type === 'UPDATE_KPI') {
        return {
            ...state,
            kpi: action?.kpi
        }
    }

    if (action.type === 'UPDATE_ASTEROIDS') {
        return {
            ...state,
            asteroids: action?.asteroids
        }
    }

    return state;
}

export default rootReducer;