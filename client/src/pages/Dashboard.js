import React from 'react';
import FriendList from '../components/FriendList';

import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_MESSAGES, QUERY_ME } from '../utils/queries';

const Dashboard = () => {
  const { loading, data } = useQuery(QUERY_MESSAGES);
  const { data: userData } = useQuery(QUERY_ME);
  const messages = data?.messages || [];

  const loggedIn = Auth.loggedIn();

  return (
    <main>
      <div className="flex-row justify-space-between">
        {loggedIn && userData ? (
          <div className="">
            <FriendList
              username={userData.me.username}
              friendCount={userData.me.friendCount}
              friends={userData.me.friends}
            />
          </div>
        ) : null}
      </div>
    </main>
  );
};

export default Dashboard;
