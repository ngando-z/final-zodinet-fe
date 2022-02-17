import {
  Avatar,
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Spin,
  Typography,
  Upload,
} from 'antd';
import React, { useEffect, useState } from 'react';
import * as api from '../../api/index';
import { IUserProfile } from '@/models/user.interface';
import moment from 'moment';
import AlertMessage, { TypeAlertEnum } from '../common/Alert/AlertMessage';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';

const UserProfile: React.FC = () => {
  const { Option } = Select;
  const [data, setData] = useState<IUserProfile>({} as IUserProfile);
  const { Title } = Typography;
  const [form] = Form.useForm();

  const [alertMessage, setAlertMessage] = useState({ message: '', title: TypeAlertEnum.Info });
  const [isDisplayAlert, setIsDisplayAlert] = useState(false);
  const [isDisplaySpin, setIsDisplaySpin] = useState(false);

  const [imageUrl, setImageUrl] = useState('');

  const dateFormat = 'DD/MM/YYYY';

  useEffect(() => {
    const getUserById = async (id: string) => {
      const result: IUserProfile = await api.userApi.getUser(id);
      if (result) {
        result.birthday ? (result.birthday = moment(result.birthday)) : '';
        result.avatar ? setImageUrl(result.avatar) : setImageUrl('');
        setData(result);
      }
    };

    const token = localStorage.getItem('token');
    if (token) {
      getUserById(token);
    }
  }, []);

  useEffect(() => {
    form.setFieldsValue({ ...data });
  }, [data, form]);

  useEffect(() => {
    setIsDisplayAlert(alertMessage.message ? true : false);
  }, [alertMessage]);

  useEffect(() => {
    form.setFields([{ name: 'avatar', value: imageUrl }]);
  }, [form, imageUrl]);

  const handleUpload = async (file: any): Promise<any> => {
    setIsDisplaySpin(true);
    const formData = new FormData();
    formData.append('file', file);
    const result: any = await api.eventApi.uploadImage(formData);
    setImageUrl(result.url);
    setIsDisplaySpin(false);
  };

  const onFinish = async (value: IUserProfile) => {
    try {
      const result = await api.userApi.updateUser(value);
      setData(result);
      setAlertMessage({ message: 'Update event Successfully!', title: TypeAlertEnum.Success });
    } catch (error: any) {
      setAlertMessage({
        message: error?.errorCode,
        title: TypeAlertEnum.Error,
      });
    }
  };

  return (
    <Row>
      <Col offset="16" span="8">
        {isDisplayAlert && (
          <AlertMessage message={alertMessage.message} title={alertMessage.title} />
        )}
      </Col>
      <Col span={24}>
        <Row className="profile__contain">
          <Col span={24}>
            <Title className="profile__heading " level={2}>
              Your Profile
            </Title>
          </Col>
          <Col span={24}>
            <Divider className="profile__dashed" />
          </Col>
          <Col span={24} className="mt-20">
            <Form
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              name="form-profile"
              form={form}
              onFinish={onFinish}
            >
              <Row>
                <Col offset={2} span={12}>
                  <Form.Item name="name" className="form__item" label="Full Name">
                    <Input size="large" />
                  </Form.Item>
                  <Form.Item name="email" className="form__item" label="Email">
                    <Input size="large" disabled />
                  </Form.Item>
                  <Form.Item name="numberPhone" className="form__item" label="Phone number">
                    <Input size="large" />
                  </Form.Item>
                  <Form.Item name="birthday" className="form__item w-100" label="Birthday">
                    <DatePicker size="large" format={dateFormat} className="w-100" />
                  </Form.Item>
                  <Form.Item name="gender" label="Gender">
                    <Select placeholder="Select gender" allowClear size="large">
                      <Option value="Male">Male</Option>
                      <Option value="Female">Female</Option>
                      <Option value="Other">Other</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Form.Item name="avatar">
                  <Col offset={2} span={22}>
                    <Row justify="center">
                      <Spin spinning={isDisplaySpin} size="large">
                        <Avatar
                          size={128}
                          icon={<UserOutlined />}
                          src={imageUrl ? imageUrl : '/img/default-image.jpg'}
                        />
                      </Spin>

                      <Upload action={handleUpload} showUploadList={false}>
                        <Button icon={<UploadOutlined />} className="mt-10">
                          Upload
                        </Button>
                      </Upload>
                    </Row>
                  </Col>
                </Form.Item>
              </Row>

              <Row justify="center" className="mt-40">
                <Button
                  className="btn btn--submit"
                  size="large"
                  htmlType="submit"
                  disabled={isDisplaySpin}
                >
                  Update Profile
                </Button>
              </Row>
            </Form>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default UserProfile;
