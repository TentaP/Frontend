import './home-style.css'
import Container from 'react-bootstrap/Navbar';
import React, { useState, useEffect } from "react";
import Badge from 'react-bootstrap/Badge';




function Home() {
    let [text, setText] = useState("");
    let words = ["Find course solutions", "Find course assignments", "Find course exams"];
    let counter = 0;

    useEffect(() => {
        setText('sourced from students')
        let interval = setInterval(() => {
            setText(words[counter]);
            counter = (counter + 1) % words.length;
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <Container className="main-div">
                <Container className='center-div'>
                    <h1 style={{
                        "font-size": "7vh"

                    }}>
                        TentaP...
                        <br />

                        {text}
                    </h1>



                </Container>
            </Container>
        </>
    );
}

export default Home;