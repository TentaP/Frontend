import Profile from "../profile/profile";
import NavBar from "../navbar/navbar";
import { useParams } from 'react-router-dom';

function ProfilePage() {
  const { id } = useParams();


  return (
    <>
      <NavBar />
      <Profile id={id} />
    </>
  )
}

export default ProfilePage;
