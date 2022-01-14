// Tools
import axios from "axios";

const API_ADDRESS = "http://localhost:3000";

export const testGETRequestStatus = async (endpoint: string, expectedStatus: number, Cookie: string = "") => {
    await axios
        .get(`${API_ADDRESS}/${endpoint}`, { headers: { Cookie } })
        .then(({ status }) => {
            expect(status).toEqual(expectedStatus);
        })
        .catch(({ response }) => {
            expect(response.status).toEqual(expectedStatus);
        });
};
export const testPOSTRequestStatus = async (endpoint: string, expectedStatus: number, Cookie: string = "") => {
    await axios
        .post(`${API_ADDRESS}/${endpoint}`, {}, { headers: { Cookie } })
        .then(({ status }) => {
            expect(status).toEqual(expectedStatus);
        })
        .catch(({ response }) => {
            expect(response.status).toEqual(expectedStatus);
        });
};
