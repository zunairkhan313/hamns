import React from 'react'
import OrderDetails from '../components/OrderDetails'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';

export const metadata = {
  title: "Dashboard",
  // robots:{
  //   index:false,
  //   follow:true
  // }
};

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (session?.user?.email !== "nasah123@gmail.com" ) redirect('/login');

  return (
    <div>
      <OrderDetails/>
    </div>
  )
}
