import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchData } from "../reducers/allTestsSlice";
import GlobalFunctions from "../../../services/globalFuntions";
import { Test } from "../../../models/Test";
import "../../../styles/tests.css";
import { Link } from "react-router-dom";

const TestsComponent = () => {
    const dispatch = useAppDispatch();
    const data = useAppSelector((x) => x.tests.tests);
    const isLoading = useAppSelector((x) => x.tests.isLoading);
    const errorMessage = useAppSelector((x) => x.tests.error);
    const userCred = GlobalFunctions.getCred();
    const userId = parseInt(userCred![1]!);
    const username = userCred![0];
    useEffect(() => {
        dispatch(fetchData(userId));
    }, []);

    return (
        <div className='outer'>
            <h1 id='title'>Avalible tests:</h1>

            <div className='tests_box'>
                {isLoading && <h2>Loading...</h2>}
                {errorMessage && <h2>{errorMessage}</h2>}
                {data &&
                    !isLoading &&
                    data.map((test: Test) => (
                        <div key={test.id} className='test_item_div'>
                            <h3>
                                {test.id}. {test.name}
                            </h3>
                            <p>{test.description}</p>
                            {test.bestScore === -1 && (
                                <span className='error_message'>
                                    You have not completed this test yet.
                                </span>
                            )}
                            {test.bestScore !== -1 && (
                                <span>Best score: {test!.bestScore * 100}%</span>
                            )}
                            <br />
                            <Link to={"details/" + test.id.toString()}>
                                <button>Details</button>
                            </Link>
                        </div>
                    ))}
            </div>
        </div>
    );
};
export default TestsComponent;
