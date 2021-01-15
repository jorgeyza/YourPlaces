import React from 'react';

import UsersList from '../components/UsersList';

const Users = () => {
  const USERS = [
    {
      id: 'u1',
      name: 'Jorge Eyzaguirre',
      image:
        'https://images.pexels.com/photos/1570610/pexels-photo-1570610.jpeg?cs=srgb&dl=pexels-paula-nardini-1570610.jpg&fm=jpg',
      places: 3,
    },
  ];
  return <UsersList items={USERS} />;
};

export default Users;
