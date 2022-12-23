import Profile from "./profile";
import NavBar from "../navbar/navbar";
import { useParams } from 'react-router-dom';

function UserProfile() {
  const { username } = useParams();


  return (
    <>
      <NavBar />
      <Profile username={username} />
    </>
  )
}

export default UserProfile;
