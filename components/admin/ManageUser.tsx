import { ISignupPayload } from '@/models/sigup.interface';
import { IUserProfile } from '@/models/user.interface';
import {
  Table,
  Space,
  Tag,
  Popconfirm,
  Modal,
  Form,
  Input,
  Button,
  Select,
  DatePicker,
} from 'antd';
import moment from 'moment';

const initState: ISignupPayload = {
  name: '',
  email: '',
  password: '',
  gender: '',
  confirm: '',
};

import React, { useEffect, useState } from 'react';
import * as api from '../../api';

const ManageUser: React.FC = () => {
  const { Option } = Select;
  const [formInfo] = Form.useForm();
  const [formAddUser] = Form.useForm();

  const [users, setUsers] = useState<IUserProfile[]>([]);
  const [callback, setCallback] = useState(false);
  const [modalVisibleEdit, setModalVisibleEdit] = useState(false);
  const [modalVisibleAddUser, setModalVisibleAddUser] = useState(false);
  const [userEdit, setUserEdit] = useState<IUserProfile>({});
  const [loading, setLoading] = useState(false);

  const dateFormat = 'DD/MM/YYYY';

  useEffect(() => {
    const getUsers = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const result: IUserProfile[] = await api.userApi.getAllUser(token);
        setUsers(result);
      }
    };
    getUsers();
  }, [callback]);

  useEffect(() => {
    formInfo.setFieldsValue(userEdit);
  }, [formInfo, userEdit]);

  const handleEdit = async (key: string) => {
    const user = await api.userApi.getUserByAdmin(key);
    user.birthday ? (user.birthday = moment(user.birthday)) : '';
    setUserEdit(user);
    setModalVisibleEdit(true);
  };

  const handleCancel = () => {
    setModalVisibleEdit(false);
    setModalVisibleAddUser(false);
  };

  const confirmEditUser = async (valuesUserEdit: IUserProfile) => {
    setLoading(true);
    const { id = '', ...rest } = valuesUserEdit;
    const result = await api.userApi.patchUserByAdmin(id, rest);
    if (result) {
      setCallback(!callback);
      setLoading(false);
      setModalVisibleEdit(false);
    }
  };

  const confirmDeleteUser = async (key: string, status: boolean) => {
    const result = await api.userApi.patchUserByAdmin(key, {
      isDeleted: !status,
    });
    if (result) {
      setCallback(!callback);
    }
  };

  const confirmAddUser = async (value: ISignupPayload) => {
    // eslint-disable-next-line no-unused-vars
    const { confirm, ...user } = value;
    const result = await api.authApi.signup(user);
    if (result) {
      formAddUser.setFieldsValue(initState);
      setCallback(!callback);
      setLoading(false);
      setModalVisibleAddUser(false);
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status: boolean) => (
        <Tag color={status ? 'error' : 'success'}>{status ? 'deleted' : 'success'}</Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (record: { key: string; status: boolean }) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record.key)}>Edit</a>
          <Popconfirm
            title={
              record.status
                ? 'Are you sure to restore this user?'
                : 'Are you sure to delete this user?'
            }
            onConfirm={() => confirmDeleteUser(record.key, record.status)}
            okText="Yes"
            cancelText="No"
          >
            <a href="#">{record.status ? 'Restore' : 'Delete'}</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const data = users.map((user) => ({
    key: user.id,
    name: user.name,
    email: user.email,
    gender: user.gender,
    status: user.isDeleted,
  }));

  return (
    <>
      <article className="admin-page__header">
        <h4>Manager User</h4>
        <p>
          Create new user or update a user existing user. You can then set their permission here to
        </p>
        <Button
          type="primary"
          shape="default"
          size="large"
          onClick={() => setModalVisibleAddUser(true)}
        >
          Add a new user
        </Button>
      </article>

      <Modal
        title="Edit User"
        centered
        visible={modalVisibleEdit}
        onCancel={handleCancel}
        footer={[
          <Button key="back" size="large" className="btn btn--cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            form="form-edit-user"
            htmlType="submit"
            key="submit"
            size="large"
            className="btn btn--bank"
            loading={loading}
          >
            Save
          </Button>,
        ]}
      >
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          name="form-edit-user"
          form={formInfo}
          onFinish={confirmEditUser}
        >
          <Form.Item name="id" label="ID" className="modal-user__label">
            <Input disabled />
          </Form.Item>
          <Form.Item name="email" label="Email" className="modal-user__label">
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="name"
            label="Name"
            className="modal-user__label"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="numberPhone" label="Number Phone" className="modal-user__label">
            <Input />
          </Form.Item>
          <Form.Item name="birthday" className="form__item w-100" label="Birthday">
            <DatePicker size="large" format={dateFormat} className="w-100" />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Gender"
            className="modal-user__label"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select gender" allowClear>
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
              <Option value="Other">Other</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      {/* Add user */}
      <Modal
        title="Add User"
        centered
        visible={modalVisibleAddUser}
        onCancel={handleCancel}
        footer={[
          <Button key="back" size="large" className="btn btn--cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            form="form-add-user"
            htmlType="submit"
            key="submit"
            size="large"
            className="btn btn--bank"
            loading={loading}
          >
            Add
          </Button>,
        ]}
      >
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          name="form-add-user"
          onFinish={confirmAddUser}
          form={formAddUser}
        >
          <Form.Item
            name="name"
            label="Name"
            className="modal-user__label"
            rules={[{ required: true, message: 'Please enter full name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            className="modal-user__label"
            rules={[{ type: 'email', required: true, message: 'Please enter email!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                type: 'string',
                required: true,
                message: 'Please enter password!',
              },
              {
                pattern: /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
                message: 'Password must include uppercase, lowercase and number!',
              },
              {
                min: 8,
                message: 'Password minimum 8 characters!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('The two passwords that you entered do not match!')
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Gender"
            className="modal-user__label"
            rules={[{ required: true, message: 'Please select gender!' }]}
          >
            <Select placeholder="Select gender" allowClear>
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
              <Option value="Other">Other</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default ManageUser;
