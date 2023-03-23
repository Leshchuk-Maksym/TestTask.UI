import {  useParams } from "react-router-dom";
import { CurrentTestComponent } from "./components/currentTestComponent";

type RouteParams = {
    testId: string;
};

export default function CurrentTestPage() {
    const params = useParams<RouteParams>();
    console.log(params.testId);

    return (
        <div>
            <CurrentTestComponent id={parseInt(params.testId!)} />
        </div>
    );
}
