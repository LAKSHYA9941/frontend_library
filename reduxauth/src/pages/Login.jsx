import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByValue, decrementByValue } from '../features/CounterSlice';

const Login = () => {
    const count = useSelector((store) => store.counter.count);
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState('');

    return (
        <div className="flex flex-col items-center justify-center p-8 space-y-6">
            <h1 className="text-4xl font-bold text-gray-800">Count: {count}</h1>
            
            <div className="flex gap-4">
                <button 
                    className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-colors"
                    onClick={() => dispatch(increment())}
                >
                    Increment
                </button>
                <button 
                    className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition-colors"
                    onClick={() => dispatch(decrement())}
                >
                    Decrement
                </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
                <input 
                    type="number" 
                    className="border border-gray-300 rounded-lg px-4 py-2 w-32 text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)} 
                    placeholder="Enter value"
                />
                <button 
                    className="px-4 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors"
                    onClick={() => {
                        if (inputValue) dispatch(incrementByValue(Number(inputValue)));
                    }}
                >
                    Add Value
                </button>
                <button 
                    className="px-4 py-2 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors"
                    onClick={() => {
                        if (inputValue) dispatch(decrementByValue(Number(inputValue)));
                    }}
                >
                    Subtract Value
                </button>
            </div>
        </div>
    );
};

export default Login;
