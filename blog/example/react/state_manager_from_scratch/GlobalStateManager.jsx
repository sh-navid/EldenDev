import { useState, createContext, useContext } from 'react';

// 1. Create a Context
const StoreContext = createContext();

// 2. Create a custom hook for global state
export const useGlobalState = () => {
    return useContext(StoreContext);
};

// 3. Create a Provider component
export const StoreProvider = ({ children }) => {
    // Initial state
    const [globalState, setGlobalState] = useState({
        count: 0,
        name: 'Initial Name',
        // other global state variables go here
    });

    // Action to update the state
    const actions = {
        update: (key, value) => {
            setGlobalState(prevState => ({ ...prevState, [key]: value }));
        },
        // other actions
    };

    const value = {
        globalState,
        actions,
    };

    return (
        <StoreContext.Provider value={value}>
            {children}
        </StoreContext.Provider>
    );
};

const TestComponent = () => {
    const { globalState, actions } = useGlobalState();

    const handleUpdateName = () => {
        actions.update('name', 'Updated Name');
    };

    return (
        <div>
            <p>Count: {globalState.count}</p>
            <p>Name: {globalState.name}</p>
            <button onClick={() => actions.update('count', globalState.count + 1)}>Increment Count</button>
            <button onClick={handleUpdateName}>Update Name</button>
        </div>
    );
};

export default TestComponent;

// The data resets on route changes because the component, and therefore its state, re-renders when the route changes.
// Solution: Use techniques like local storage, session storage, or a state management library (e.g., Redux, Zustand)
// to persist the application's state across route changes.
