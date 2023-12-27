// "use client";
import AdminProvider from "./Admin/AdminProvider";
import { cookies } from 'next/headers';


export default function Providers({ children }) {
  const cookieStore = cookies();
  const cartelCookie = cookieStore.get('cartel-jwt');
  const isValidToken = cartelCookie?.value === 'token';
  // console.log('index provider', isValidToken)
  return (
      <AdminProvider isValidToken={isValidToken}>
          {children}
      </AdminProvider>
  );
}