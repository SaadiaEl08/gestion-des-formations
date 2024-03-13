export const setEmployes = (employes) => {
    return { type: "setEmploys", payload: employes };
};
export const setFilterEmploye = (filter) => {
    return { type: "setFilterEmploye", payload: filter };
};
export const setFilterEmployeValue = (value) => {

    return { type: "setFilterEmployeValue", payload: value };
};

export const setFormations = (formation) => {
    return { type: "setFormations", payload: formation };
};
export const setFilterFormation = (filter) => {
    return { type: "setFilterFormation", payload: filter };
};
export const setFilterFormationValue = (value) => {
    return { type: "setFilterFormationValue", payload: value };
};

export const setDateMin = (dateMin) => {
    return { type: "setDateMin", payload: dateMin };

};
export const setDateMax = (dateMax) => {
    return { type: "setDateMax", payload: dateMax };

};


export const setParticipations = (participation) => {
    return { type: "setParticipations", payload: participation };
};
export const setFilterParticipation = (filter) => {
    return { type: "setFilterParticipation", payload: filter };
};
export const setFilterParticipationValue = (value) => {
    return { type: "setFilterParticipationValue", payload: value };
};