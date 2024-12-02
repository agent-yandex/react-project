import React, { useEffect, useState } from "react";

import './ProfilePage.css'
import { Text } from "@consta/uikit/Text";
import { getToken } from "../../services/Tocken";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from "../../data/Store";

const ProfilePage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector((state) => state.user);

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const userToken = getToken();

		if (!userToken) {
			navigate("/login");
			return;
		}

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

	// Если загрузка данных, отображаем индикатор
	if (loading) {
		return <Text size="l">Загрузка...</Text>;
	}

	// Если произошла ошибка, показываем сообщение
	if (error) {
		return <Text size="l" view="critical">Ошибка: {error}</Text>;
	}

	return (
		<div className="profile-container">
			<div className="profile-info">
				<Text size="xl" weight="bold" className='name'>
					{user?.firstName} {user?.lastName}
				</Text>
				<Text className="text"> {user?.email} </Text>
				<Text className="text">Username: {user?.username}</Text>
				<Text className="text">Phone: {user?.phone}</Text>
				<Text className="text">Age: {user?.age}</Text>
			</div>
			{user?.image && (
				<img
					src={user.image}
					alt="User profile"
					className="profile-image"
				/>
			)}
		</div>
	);
};

export default ProfilePage;
