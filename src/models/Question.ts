import Asnwer from "./Answer";

export default class Question{
    body: string;
    testId: number;
    answers: Asnwer[] | undefined;
    constructor(body: string, testId: number)
    {
        this.body = body;
        this.testId = testId;
    }
}