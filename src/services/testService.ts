import { API } from "../axios/axiosInstance";
import { Test } from "../models/Test";

class TestService {
    static async getAllTestForUser(userId: number): Promise<Test[]> {
        return await (
            await API.get("Test/getByUserId/" + userId.toString())
        ).data;
    }

    static async getTestById(Id: number): Promise<Test> {
        return await (
            await API.get("Test/getById/" + Id.toString())
        ).data;
    }

    static async checkResults(testId: number, answersIds: number[]): Promise<number> {
        return await (await API.post("Test/checkAnswers", { testId, answersIds })).data;
    }
}

export default TestService;
