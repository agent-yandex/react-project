import React, { useEffect, useState }  from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Button } from '@consta/uikit/Button';
import { getToken, dropToken } from '../../services/Tocken';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from "../../data/Store";

import './MainLayout.css';

const MainLayout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
	const user = useSelector((state) => state.user);

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const userToken = getToken();

		const fetchUserInfo = async () => {
			try {
				const response = await fetch("https://dummyjson.com/auth/me", {
					method: "GET",
					headers: {
					Authorization: `Bearer ${userToken}`,
					},
				});

				if (!response.ok) {
					throw new Error("Не удалось загрузить информацию о пользователе");
				}

				const userInfo = await response.json();
				dispatch(setUser(userInfo));
			} catch (err) {
				setError(err.message || "Произошла ошибка при загрузке данных пользователя");
			} finally {
				setLoading(false);
			}
		};

		fetchUserInfo();
	}, [dispatch, navigate]);

    const handleLogout = () => {
        dropToken();
        navigate("/");
    };

    return (
        <div className="layout">
            <header className="header">
                <nav className="nav">
                    <div className="nav-links">
                        <Button label="Главная страница" view="secondary" as={Link} to="/" />
                        <Button label="Услуги компании" view="secondary" as={Link} to="/services" />
                    </div>
                    <div className="auth-links">
                        {
                            getToken() ? (
                                <>
                                    <Link to='/profile'>{user.username}</Link>
                                    <Button label="Выйти" view="primary" onClick={handleLogout} />
                                </>
                            ) : (
                                <Button label="Вход" view="primary" as={Link} to="/login" />
                            )
                        }
                    </div>
                </nav>
            </header>

            <main className="main">
                <Outlet />
            </main>

            <footer className="footer">
                <div className="footer-links">
                    <Button label="Главная страница" view="secondary" as={Link} to="/" />
                    <Button label="Услуги компании" view="secondary" as={Link} to="/services" />
                </div>
                <div className="copyright">
                    © 2024 Company
                </div>
            </footer>
        </div>
    );
}

export default MainLayout;
