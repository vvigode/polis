import React, { useState } from 'react';
import api from '../api';
import BackButton from './BackButton';
import '../styles.css';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setErrors({});

        try {
            await api.post('/register', formData);
            setMessage('Регистрация прошла успешно!');
            setFormData({ name: '', email: '', password: '' });
        } catch (error) {
            if (error.response && error.response.data) {
                const errorData = error.response.data;
                if (errorData) {
                    const formattedErrors = {};
                    for (const [key, messages] of Object.entries(errorData)) {
                        formattedErrors[key] = messages.join(' ');
                    }
                    setErrors(formattedErrors);
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
                <h2>Регистрация</h2>
                <input
                    type="text"
                    name="name"
                    placeholder="Имя"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? 'error' : ''}
                />
                {errors.name && <p className="error-message">{errors.name}</p>}

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? 'error' : ''}
                />
                {errors.email && <p className="error-message">{errors.email}</p>}

                <input
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    value={formData.password}
                    onChange={handleChange}
                    className={errors.password ? 'error' : ''}
                />
                {errors.password && <p className="error-message">{errors.password}</p>}

                <button type="submit">Зарегистрироваться</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default Register;
