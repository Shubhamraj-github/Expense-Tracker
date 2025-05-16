import React from 'react';
import StatisticsChart from '../../commoncomponents/Stats/StatisticsChart';
import useAuth from '../../hooks/useAuth';

function Dashboards() {
  const { user } = useAuth();

  return (
    <div className="space-y-10 px-4 py-2">
      {user?.user_type === 'user' && (
        <>
          <StatisticsChart userId={user} statType="stat1" />
          <StatisticsChart userId={user} statType="stat2" />
          <StatisticsChart userId={user} statType="stat3" />
        </>
      )}

      {user?.user_type === 'admin' && (
        <StatisticsChart userId={user} statType="stat4" />
      )}
    </div>
  );
}

export default Dashboards;