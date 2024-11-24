import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home">
            <h1>Добро пожаловать!</h1>
            <button onClick={() => navigate('/login')}>Вход</button>
            <button onClick={() => navigate('/register')}>Регистрация</button>
        </div>
    );
};

export default Home;
