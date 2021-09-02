import React, { FC } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Redirect, Route, RouteProps, Switch } from "react-router-dom";
import Centered from "./components/Centered";
import Heading from "./components/Heading";
import Text from "./components/Text";
import { useAuth } from "./providers/AuthProvider";
import GlobalStyle from "./styles/globalStyle";
import Admin from "./views/Admin";
import Artist from "./views/Artist";
import Home from "./views/Home";
import Login from "./views/Login";
import Lyrics from "./views/Lyrics";
import Profile from "./views/Profile";
import Search from "./views/Search";
import TopArtists from "./views/TopArtists";
import TopTracks from "./views/TopTracks";

const PrivateRoute: FC<RouteProps> = ({ ...props }) => {
  const { accessToken } = useAuth();
  return accessToken ? <Route {...props} /> : <Redirect to="/login" />;
};

const PublicOnlyRoute: FC<RouteProps> = ({ ...props }) => {
  const { accessToken } = useAuth();
  return !accessToken ? <Route {...props} /> : <Redirect to="/" />;
};

function App() {
  const { loading } = useAuth();
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const minWidth = 1200,
    minHeight = 600;

  function handleResize() {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {width < minWidth || height < minHeight ? (
        <Centered>
          <div>
            <Heading>Window is too small</Heading>
            {width < minWidth && (
              <Text style={{marginTop: '1rem'}}>
                Width is {width}px and must be at least {minWidth}px
              </Text>
            )}
            {height < minHeight && (
              <Text style={{marginTop: '1rem'}}>
                Height is {height}px and must be at least {minHeight}px
              </Text>
            )}
          </div>
        </Centered>
      ) : !loading ? (
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute path="/top-artists" component={TopArtists} />
          <PrivateRoute path="/top-tracks" component={TopTracks} />
          <PrivateRoute path="/artist/:id" component={Artist} />
          <PrivateRoute path="/my-profile" component={Profile} />
          <PrivateRoute path="/search" component={Search} />
          <PrivateRoute path="/lyrics" component={Lyrics} />
          <PublicOnlyRoute path="/login" component={Login} />
          <Route path="/admin" component={Admin} />
          <Route path="*" component={() => <Redirect to="/" />} />
        </Switch>
      ) : (
        <Centered>
          <Heading>Loading auth state...</Heading>
        </Centered>
      )}
      <GlobalStyle />
    </>
  );
}

export default App;
