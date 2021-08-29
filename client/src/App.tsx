import React, { FC } from "react";
import { Redirect, Route, RouteProps, Switch } from "react-router-dom";
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

  return (
    <>
      {!loading ? (
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
        "Loading auth state"
      )}
      <GlobalStyle />
    </>
  );
}

export default App;
