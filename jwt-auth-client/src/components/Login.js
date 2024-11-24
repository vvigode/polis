import React, { useState } from 'react';
import api, { setAuthToken } from '../api';
import BackButton from './BackButton';
import '../styles.css';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setErrors();

        try {
            const response = await api.post('/login', formData);
            const token = response.data.token;

            localStorage.setItem('token', token);
            setAuthToken(token);
            setMessage('Авторизация прошла успешно!');
            setFormData({ email: '', password: '' });
        } catch (error) {
            if (error.response && error.response.data) {
                const errorData = error.response.data;
                if (errorData.error) {
                    setErrors(errorData.error);
                } else if (errorData.message) {
                    setMessage(errorData.message);
                }
            } else {
                setMessage('Ошибка сети или сервер недоступен.');
            }
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <BackButton />
                <h2>Авторизация</h2>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors ? 'error' : ''}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    value={formData.password}
                    onChange={handleChange}
                    className={errors ? 'error' : ''}
                />
                {errors && <p className="error-message">{errors}</p>}
                <button type="submit">Войти</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default Login;
