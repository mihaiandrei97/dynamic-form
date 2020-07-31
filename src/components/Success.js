import React from 'react';

const Success = ({ state }) => {
  const result = { data: [] };
  Object.keys(state).forEach((key) => {
    if (key.includes('step_')) {
      result.data.push({
        [`${key}`]: state[key],
      });
    }
  });
  return (
    <pre style={{ textAlign: 'left' }}>{JSON.stringify(result, null, 2)}</pre>
  );
};

export default Success;
