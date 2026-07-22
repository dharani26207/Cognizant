import React from 'react';
import styles from './CohortDetails.module.css';

const CohortDetails = ({ cohort }) => {
  const isOngoing = cohort.status.toLowerCase() === 'ongoing';

  return (
    <div className={styles.box}>
      <h3 style={{ color: isOngoing ? 'green' : 'blue', margin: '0 0 12px 0', fontSize: '1.25rem' }}>
        {cohort.name}
      </h3>
      <dl style={{ margin: 0 }}>
        <dt>Course Name</dt>
        <dd>{cohort.course}</dd>
        
        <dt>Start Date</dt>
        <dd>{cohort.startDate}</dd>
        
        <dt>End Date</dt>
        <dd>{cohort.endDate}</dd>
        
        <dt>Status</dt>
        <dd style={{ textTransform: 'capitalize', fontWeight: 'bold', color: isOngoing ? 'green' : 'blue' }}>
          {cohort.status}
        </dd>
      </dl>
    </div>
  );
};

export default CohortDetails;
