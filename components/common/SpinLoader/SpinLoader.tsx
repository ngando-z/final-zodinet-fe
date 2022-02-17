import { Spin, Alert } from 'antd';
import React from 'react';

export const SpinLoader: React.FC = () => {
  return (
    <Spin tip="Loading...">
      <Alert
        message="Alert message title"
        description="Further details about the context of this alert."
        type="info"
      />
    </Spin>
  );
};
export default SpinLoader;
