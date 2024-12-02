import React, { useState } from 'react';
import './LoginPage.css';

import { Informer } from '@consta/uikit/Informer';
import { useNavigate } from 'react-router-dom';
import { saveToken } from '../../services/Tocken';

const AuthPage = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const onFormSubmit = async (event) => {
	event.preventDefault();

	const getUserToken = async (user, pass) => {
		const response = await fetch('https://dummyjson.com/auth/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			username: user,
			password: pass,
			expiresInMins: 60,
		}),
		});

		if (!response.ok) {
		throw new Error('Неверные данные пользователя!');
		}

		const { accessToken } = await response.json();
		return accessToken;
	};

	try {
		const token = await getUserToken(username, password);
		saveToken(token);
		navigate('/profile');
	} catch (err) {
		setError(err.message);
	}
	};

	return (
		<div className="login-container">
			<form className="login-form" onSubmit={onFormSubmit}>
				<div className="error-message-container">
					{error.general && <div className="error-message">{error.general}</div>}
				</div>

				<div className="form-group">
					<label htmlFor="username">Имя пользователя</label>
					<input
						type="text"
						id="username"
						name="username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						placeholder="Введите имя пользователя"
						required
					/>
				</div>
				
				<div className="form-group">
					<label htmlFor="password">Пароль</label>
					<input
						type="password"
						id="password"
						name="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Введите пароль"
						required
					/>
					<div className="error-message-container">
						{error.password && <div className="error-message">{error.password}</div>}
					</div>
				</div>

				<button type="submit" className="submit-button">
					Войти
				</button>

				{error && (
					<div style={{ marginBottom: '16px' }}>
					<Informer status="alert" view="filled" title="Ошибка" label={error} />
					</div>
				)}
			</form>
		</div>
	);
};

export default AuthPage;
