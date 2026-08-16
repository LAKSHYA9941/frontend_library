import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../feature/counterSlice";

function Counter() {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col items-center gap-4 mt-10">
      <h1 className="text-4xl font-bold text-black">{count}</h1>

      <div className="flex gap-4">
        <button
          onClick={() => dispatch(increment())}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Increment
        </button>

        <button
          onClick={() => dispatch(decrement())}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Decrement
        </button>
      </div>
      
    </div>
  );
}

export default Counter;