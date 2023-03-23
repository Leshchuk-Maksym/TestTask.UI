export default class Asnwer {
    id: number;
    body: string;
    questionId: number;
    constructor(id: number, body: string, questionId: number) {
        this.id = id;
        this.body = body;
        this.questionId = questionId;
    }
}
