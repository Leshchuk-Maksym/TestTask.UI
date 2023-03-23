import Question from "./Question";

export class Test {
    id: number;
    name: string;
    description: string;
    bestScore: number;
    userId: number;
    questions!: Question[];

    constructor(id: number, name: string, description: string, bestScore: number, userId: number) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.bestScore = bestScore;
        this.userId = userId;
    }
}
