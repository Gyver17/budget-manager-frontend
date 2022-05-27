import { createContext, useReducer } from "react";
import authReducer, { initialState } from "./authReducer.context";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState)

    return (
        <AuthContext.Provider value={[state, dispatch]}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext }
export default AuthProvider;