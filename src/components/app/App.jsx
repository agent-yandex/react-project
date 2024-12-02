import './App.css';

import { Theme, presetGpnDefault } from '@consta/uikit/Theme';
import { Responses404 } from '@consta/uikit/Responses404'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import MainLayout from '../../layouts/main-layout/MainLayout';
import MainPage from '../../pages/main-page/MainPage'
import ServicePage from '../../pages/service-page/ServicePage'
import ServiceDetailPage from '../../pages/service-detail-page/ServiceDetailPage'
import LoginPage from '../../pages/login-page/LoginPage'
import ProfilePage from '../../pages/profile-page/ProfilePage';

const App = () => {
    return (
        <Theme preset={presetGpnDefault}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<MainLayout />}>
                        <Route index element={<MainPage />}/>
                        <Route path='/login' element={<LoginPage />} />
                        <Route path='/services' element={<ServicePage />}/>
                        <Route path='/profile' element={<ProfilePage />}/>
                        <Route path='/services/:id' element={<ServiceDetailPage />}/>
                    </Route>
                    <Route path='*' element={<Responses404 />}/>
                </Routes>
            </BrowserRouter>
        </Theme>
    );
}

export default App;
