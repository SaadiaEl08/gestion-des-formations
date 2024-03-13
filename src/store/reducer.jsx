const initialState = {
    employes: [],
    filterEmploye: "",
    filterEmployeValue: "",

    formations: [],
    filterFormation: "",
    filterFormationValue: "",
    dateMin: "",
    dateMax: "",

    participations: [],
    filterParticipation: "",
    filterParticipationValue: "",

};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "setEmploys":
            return { ...state, employes: action.payload };
        case "setFilterEmploye":
            return { ...state, filterEmploye: action.payload };
        case "setFilterEmployeValue":
            return { ...state, filterEmployeValue: action.payload };

        case "setFormations":
            return { ...state, formations: action.payload };
        case "setFilterFormation":
            return { ...state, filterFormation: action.payload };
        case "setFilterFormationValue":
            return { ...state, filterFormationValue: action.payload };

        case "setDateMin":
            return { ...state, dateMin: action.payload };
        case "setDateMax":
            return { ...state, dateMax: action.payload };
            
        case "setParticipations":
            return { ...state, participations: action.payload };
        case "setFilterParticipation":
            return { ...state, filterParticipation: action.payload };
        case "setFilterParticipationValue":
            return { ...state, filterParticipationValue: action.payload };
        default:
            return state;
    }


};

export default reducer;