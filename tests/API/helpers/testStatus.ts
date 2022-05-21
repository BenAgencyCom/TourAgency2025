// Tools
import axios from "axios";
import FormData from "form-data";

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

interface TestPOSTRequestStatus {
    expectedStatus: number;
    endpoint: string;
    Cookie?: string;
    body: FormData;
}
export const testPOSTRequestStatus = async (props: TestPOSTRequestStatus) => {
    const { endpoint, expectedStatus, Cookie, body } = props;
    return await axios({
        method: "POST",
        url: `${API_ADDRESS}/${endpoint}`,
        data: body,
        headers: {
            Cookie: Cookie ?? "",
            ...body.getHeaders(),
        },
        validateStatus: () => true,
    }).then((res) => {
        expect(res.status).toEqual(expectedStatus);
    });
};
