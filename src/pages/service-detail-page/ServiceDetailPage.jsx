import './ServiceDetailPage.css'

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@consta/uikit/Button';
import { Text } from '@consta/uikit/Text';
import { getToken } from '../../services/Tocken';

const ServiceDetailPage = () => {
    const [service, setService] = useState(null);
    const { id } = useParams();
    const [serviceId, ] = useState(id);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/services');
    };


    useEffect(() => {
        const userToken = getToken();

        if (!userToken) {
            navigate("/login");
            return;
        }

        setLoading(true);
        setError('');

        const fetchServiceDetails = async () => {
            try {
                const response = await fetch(`https://673423afa042ab85d1190055.mockapi.io/api/v1/services/${serviceId}`);
                if (!response.ok) {
                    throw new Error('Не удалось загрузить услугу');
                }

                const serviceData = await response.json();
                setService(serviceData);
            } catch (err) {
                setError(err.message || 'Произошла ошибка при загрузке услуги');
            } finally {
                setLoading(false);
            }
        };

        fetchServiceDetails();

    }, [serviceId, navigate]);

    if (loading) {
        return <Text size="l">Загрузка...</Text>;
    }

    if (error) {
        return <Text size="l" view="critical">Ошибка: {error}</Text>;
    }

    return (
        <div className="service-detail-container">
            <Text className="service-detail-title">{service?.name}</Text>

            {/* Генерация случайного изображения для сервиса, используя его ID */}
            <img
                // src={`https://picsum.photos/500?random=${service?.id}`}
                src={service?.image}
                alt={service?.name}
                className='service-detail-image'
            />
            
            <Text className="service-detail-description">{service?.description}</Text>
            <Button className="next-service-button" onClick={handleGoBack} label="Назад к услугам" />
        </div>
    );
};

export default ServiceDetailPage;
