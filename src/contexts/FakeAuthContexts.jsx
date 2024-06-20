import { createContext, useContext, useReducer } from "react";

const initialState = { user: [], isAuthenticated: false, error: "" };
function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: action.payload, isAuthenticated: false };
    case "invalid":
      return {
        ...state,
        isAuthenticated: false,
        error: alert(action.payload),
      };
    default:
      throw new Error("Unknown action");
  }
}

const FAKE_USER = {
  name: "Haitham",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};
const AuthContext = createContext({
  isAuthenticated: false,
  user: {},
  login: () => {},
  logout: () => {},
});
function AuthProvider({ children }) {
  const [{ user, isAuthenticated, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email, password) {
    if (FAKE_USER.email !== email || FAKE_USER.password !== password)
      return dispatch({
        type: "invalid",
        payload: "Email or password was invalid, try another one",
      });
    dispatch({ type: "login", payload: FAKE_USER });
  }

  function logout() {
    dispatch({ type: "logout" });
  }
  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, error, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) throw new Error("AuthContext was used outside AuthProvider ");
  return context;
}
export { AuthProvider, useAuth };
