import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Button } from '@consta/uikit/Button';
import { getToken, dropToken } from '../../services/Tocken';
import './MainLayout.css';

const MainLayout = () => {
    const navigate = useNavigate();

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
                                    <Link to='/profile'>Пользователь</Link>
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
