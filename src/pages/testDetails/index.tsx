import {  useParams } from "react-router-dom";
import { CurrentTestComponent } from "./components/currentTestComponent";

type RouteParams = {
    testId: string;
};

export default function CurrentTestPage() {
    const params = useParams<RouteParams>();

    return (
        <div>
            <CurrentTestComponent id={parseInt(params.testId!)} />
        </div>
    );
}
