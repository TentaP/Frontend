import Profile from "../profile/profile";
import NavBar from "../navbar/navbar";
import { useParams } from 'react-router-dom';

function ProfilePage() {
  const { username } = useParams();


  return (
    <>
      <NavBar />
      <Profile username={username} />
    </>
  )
}

export default ProfilePage;
