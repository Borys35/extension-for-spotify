import Button from "../components/Button";
import HeadingWithBack from "../components/HeadingWithBack";
import Layout from "../components/Layout";
import { useAuth } from "../providers/AuthProvider";
import { usePlayer } from "../providers/PlayerProvider";
import { useSpotify } from "../providers/SpotifyProvider";
import theme from "../styles/theme";

const Profile = () => {
  const { signOut } = useAuth();
  const { player } = usePlayer();

  return (
    <Layout>
      <HeadingWithBack style={{ marginBottom: "2rem" }}>
        My Profile
      </HeadingWithBack>
      <div>
        <Button
          onClick={() => {
            player.disconnect();
            signOut();
          }}
          style={{ background: theme.colors.red }}
        >
          Sign out
        </Button>
      </div>
    </Layout>
  );
};

export default Profile;
