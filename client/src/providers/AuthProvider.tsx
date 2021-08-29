import axios from "axios";
import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";

interface ContextProps {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  loading: boolean;
  signOut: Function;
}

const AuthContext = createContext({} as ContextProps);

export const useAuth = () => useContext(AuthContext);

const AuthProvider: FC = ({ children }) => {
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [expiresIn, setExpiresIn] = useState(0);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  function signOut() {
    setAccessToken("");
    setRefreshToken("");
    setExpiresIn(0);
    Cookies.remove("refresh-token");
  }

  useEffect(() => {
    const cookieRefreshToken = Cookies.get("refresh-token");

    if (!cookieRefreshToken) return setLoading(false);

    axios
      .post("api/v1/refresh", {
        refreshToken: cookieRefreshToken,
      })
      .then(({ data }) => {
        setRefreshToken(cookieRefreshToken);
        setAccessToken(data.accessToken);
        setExpiresIn(data.expiresIn);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get("code");

    if (!code || accessToken) return;

    setLoading(true);

    axios
      .post("api/v1/login", { code })
      .then(({ data }) => {
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);
        setExpiresIn(data.expiresIn);

        Cookies.set("refresh-token", data.refreshToken, { expires: 7 });

        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [location.search, accessToken]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;

    const interval = setInterval(() => {
      axios
        .post("api/v1/refresh", { refreshToken })
        .then(({ data }) => {
          setAccessToken(data.accessToken);
          setExpiresIn(data.expiresIn);
        })
        .catch((err) => console.error(err));
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  const value = {
    accessToken,
    refreshToken,
    expiresIn,
    loading,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
