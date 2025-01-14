import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
/* comment for a change */
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("site") || "");
    const navigate = useNavigate();
    const loginAction = async (data) => {
        try {
            const response = await fetch(`http://localhost:8080/api/students/login?email=${data.email}&password=${data.password}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    studentEmail: data.email,
                    studentPassword: data.password,
                }),
            });
            const res = await response.json();
            console.log(res);
            if (res) {
                setUser({userData: res, role: "Student"});
                setToken(res.id);
                localStorage.setItem("site", res.id);
                navigate("/dashboard");
                return;
            }
            throw new Error(res.message);
        } catch (err) {
            try{
              const response = await fetch(`http://localhost:8080/login?email=${data.email}&password=${data.password}`, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                      studentEmail: data.email,
                      studentPassword: data.password,
                  }),
              });
              const res = await response.json();
              console.log(res);
              if (res) {
                  setUser({userData: res, role: "Teacher"});
                  setToken(res.id);
                  localStorage.setItem("site", res.id);
                  navigate("/dashboard");
                  return;
              }
              throw new Error(res.message);
            }
            catch (err2){
              console.error(err);
            }
        }
    };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};