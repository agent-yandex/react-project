import './ServicePage.css';

import React, { useEffect } from 'react';
import { Text } from '@consta/uikit/Text';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { setServices } from '../../data/Store';
import { getToken } from '../../services/Tocken';

const ServicePage = () => {
    const dispatch = useDispatch();
    const services = useSelector((state) => state.services);
    const navigate = useNavigate();

    useEffect(() => {
        const userToken = getToken();

        if (!userToken) {
            navigate("/login");
            return;
        }

        const fetchServices = async () => {
            try {
                const response = await fetch('https://673423afa042ab85d1190055.mockapi.io/api/v1/services');
                if (!response.ok) {
                    throw new Error('Ошибка при загрузке услуг');
                }
                const data = await response.json();
                dispatch(setServices(data));
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };

        fetchServices();
    }, [dispatch, navigate]);

    if (!services || services.length === 0) {
        return <Text size="l">Нет доступных услуг</Text>;
    }

    return (
        <div className="services-container">
            <h1 className="services-title">Наши услуги</h1>
            <div className="services-grid">
                {services.map(service => (
                    <Link to={`/services/${service.id}`} key={service.id} className="service-card-link">
                        <h3 className="service-title">{service.name}</h3>
                        <p className="service-description">{service.description}</p>
                    </Link>
                ))}
            </div>
        </div>
  );
};

export default ServicePage;
