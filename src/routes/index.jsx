import { Route, Routes as ReactRoutes } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';
import ErrorPages from '@/pages/error';
import Account from '@/pages/account';
import ErrorPageNotFound from '@/pages/error/PageNotFound';
//import MessagePage from '@/components/Messages/Messages'; // 👈 Importa directamente


export default function AppRoutes() {
	return (
		<ReactRoutes>
			<Route path="account/*" element={<Account />} />			
			<Route path="/*" element={<ProtectedRoutes />} />
			<Route path="/error/*" element={<ErrorPages />} />
			<Route path="*" element={<ErrorPageNotFound />} />			 
		</ReactRoutes>
	);
}
