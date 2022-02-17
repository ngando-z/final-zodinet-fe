import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const ModalCreateBank: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const router = useRouter();

  const handleOk = () => {
    setIsModalVisible(false);
    router.push('/user/create-bank');
  };

  const handleCancel = () => {
    router.back();
    setIsModalVisible(false);
  };


  

  return (
    <Modal
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      className="modal-bank__contain"
      footer={[
        <Button key="back" size="large" className="btn btn--cancel" onClick={handleCancel}>
          <ArrowLeftOutlined /> Return
        </Button>,
        <Button key="submit" size="large" className="btn btn--bank" onClick={handleOk}>
          Create Bank Account <ArrowRightOutlined />
        </Button>,
      ]}
    >
      <p className="modal-bank__message">
        Please provide bank account information before creating an event.
      </p>
    </Modal>
  );
};

export default ModalCreateBank;
