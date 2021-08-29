import axios from "axios";
import { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
import Heading from "../components/Heading";
import { useSpotify } from "../providers/SpotifyProvider";

const Container = styled.div`
  padding: 2rem;
  > * {
    margin-bottom: 2rem;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const Form = styled.form`
  > * {
    margin-bottom: 2rem;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  label {
    margin-bottom: 0.1rem;
  }
`;

const Admin = () => {
  const [sotdId, setSotdId] = useState("");
  const [password, setPassword] = useState("");
  const { spotifyApi, setSotd } = useSpotify();
  const history = useHistory();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    axios
      .post("api/v1/sotdId", { sotdId, password })
      .then(({ data }) => {
        const { sotdId } = data;
        spotifyApi.getTrack(sotdId).then((data: any) => {
          setSotd(data.body);
          history.push("/");
        });
      })
      .catch((err) => console.error(err));
  }

  return (
    <Container>
      <Heading>Admin Panel</Heading>
      <Form onSubmit={handleSubmit}>
        <Field>
          <label>Song of the day ID</label>
          <input value={sotdId} onChange={(e) => setSotdId(e.target.value)} />
        </Field>
        <Field>
          <label>Admin Panel Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Field>
        <Button>Proceed</Button>
      </Form>
    </Container>
  );
};

export default Admin;
