'use client';
import React, { useContext } from 'react';
import Link from 'next/link';
import { AdminContext } from '@/app/providers/Admin/AdminProvider';

const AdminLink = ({ classes }) => {
  const isAdmin = useContext(AdminContext);

  if (isAdmin) {
    return (
      <li>
        <Link href='/admin' className={classes}>Admin</Link>
      </li>
    );
  }
  return null;
};

export default AdminLink;
