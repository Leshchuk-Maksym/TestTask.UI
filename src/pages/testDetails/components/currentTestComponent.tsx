import { useEffect, useState } from "react";
import GlobalFunctions from "../../../services/globalFuntions";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchCurrentData } from "../reducers/currentTestSlice";
import "../../../styles/tests.css";
import "../../../styles/currTest.css";
import TestService from "../../../services/testService";
import { Link } from "react-router-dom";
import { Http2ServerRequest } from "http2";

interface TestProps {
    id: number;
}

export const CurrentTestComponent = (props: TestProps) => {
    const { id } = props;
    const dispatch = useAppDispatch();
    const data = useAppSelector((x) => x.currentTest.test);
    const isLoading = useAppSelector((x) => x.currentTest.isLoading);
    const errorMessage = useAppSelector((x) => x.currentTest.error);

    const userCred = GlobalFunctions.getCred();
    const userId = parseInt(userCred![1]!);
    const username = userCred![0];

    const [agreeToStart, setAgreeToStart] = useState(false);
    const [start, setStart] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);

    const [userAnswers, setUserAnswers] = useState<number[]>([]);
    const [currentAnswer, setCurrentAnswer] = useState(0);

    const [result, setResult] = useState(-1);

    useEffect(() => {
        dispatch(fetchCurrentData(id));
        console.log("dispached ");
    }, [start]);

    return (
        <div className='curr_test_outer'>
            {isLoading && <h2>Loading...</h2>}
            {errorMessage && <h2>{errorMessage}</h2>}

            {data && !isLoading && (
                <div className='test_item_div'>
                    <Link to={"/tests"}>
                        <button>Back to tests</button>
                    </Link>
                    <h3>
                        {data!.id}. {data!.name}
                    </h3>
                    <p>{data!.description}</p>
                    {data!.bestScore === -1 && (
                        <span className='error_message'>You have not completed this test yet.</span>
                    )}
                    {data!.bestScore !== -1 && <span>Best score: {data!.bestScore * 100}%</span>}
                    <br />
                    <br />
                    {result !== -1 && (
                        <span style={{ color: "red" }}>Result : {result * 100}%</span>
                    )}
                </div>
            )}
            {!start && (
                <div className='start_div'>
                    <div>
                        <input
                            type='checkbox'
                            checked={agreeToStart}
                            onChange={(e) => {
                                setAgreeToStart(!agreeToStart);
                            }}
                        />
                        <label>I agree to start </label>
                    </div>

                    <button
                        disabled={!agreeToStart}
                        onClick={(e) => {
                            setStart(true);
                        }}
                    >
                        Start
                    </button>
                </div>
            )}
            {start && (
                <div className='question_div'>
                    <h3>
                        {currentQuestion + 1}. {data!.questions[currentQuestion].body}
                    </h3>
                    <br />
                    <div>
                        {data!.questions[currentQuestion].answers!.map((answer) => (
                            <div>
                                <input
                                    type='radio'
                                    name='answer'
                                    value={answer.id}
                                    onChange={(e) => setCurrentAnswer(answer.id)}
                                    checked={currentAnswer === answer.id}
                                />
                                {answer.body}
                            </div>
                        ))}
                        <br />
                        <button
                            onClick={async (e) => {
                                if (currentQuestion < data!.questions.length - 1) {
                                    setCurrentQuestion(currentQuestion + 1);
                                    setUserAnswers([...userAnswers, currentAnswer]);
                                } else {
                                    setStart(false);
                                    let res = await TestService.checkResults(data!.id, [
                                        ...userAnswers,
                                        currentAnswer,
                                    ]);
                                    console.log(res);
                                    setResult(res);
                                    setCurrentAnswer(0);
                                    setUserAnswers([]);
                                }
                            }}
                            disabled={currentQuestion > data!.questions.length - 1}
                        >
                            {currentQuestion !== data!.questions.length - 1 && "Next question"}
                            {currentQuestion === data!.questions.length - 1 && "Complete test"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
