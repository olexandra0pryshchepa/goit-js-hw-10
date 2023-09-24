import axios from "axios";

const url = 'https://api.thecatapi.com/v1';

axios.defaults.headers.common["x-api-key"] = "live_GmWSZRCNfWuNIrcbI8f7CvFOwFDj2ENrYgQlWlwn8FvPIaMuQtS7X1cpuXBevjjb";

export function fetchBreeds() {
    return axios.get(`${url}/breeds`)
        .then(response => {
            return response.data;
        }).catch (error => {
            throw new Error(error.message);
        });       
};

export function fetchCatByBreed(breedId) {
    return axios.get(`${url}/images/search?breed_ids=${breedId}`)
        .then(response => {
            return response.data;
        });  
};