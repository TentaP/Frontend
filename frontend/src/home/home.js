import './home-style.css'
import Container from 'react-bootstrap/Navbar';
import SearchBox from '../searchBox/searchBox';



function Home() {
    return (
        <>
     <Container className="main-div"> 
        <Container className='center-div'>
            <SearchBox/>
        </Container>
     </Container>
        </>
    );
  }
  
  export default Home;