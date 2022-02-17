import {
  ArrowRightOutlined,
  ArrowLeftOutlined,
  UploadOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Form,
  Row,
  Col,
  Input,
  Select,
  Button,
  InputNumber,
  Steps,
  DatePicker,
  FormInstance,
  Avatar,
  Spin,
  Upload,
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import * as api from '../../api/index';
import { useAppSelector } from 'app/hooks';
import { selectorUser } from 'app/user/userSlice';
import router from 'next/router';
import { ICategory, IEventPayload } from '@/models/event.interface';
import AlertMessage, { TypeAlertEnum } from '../common/Alert/AlertMessage';

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be greater than ${min}',
  },
};

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

interface IFormEventData {
  name: string;
  categoryId: string;
  logoUrl: string;
  bannerUrl: string;
  description: string;
  eventPlaceName: string;
  eventAddress: string;
  saleStartDate: moment.Moment;
  saleEndDate: moment.Moment;
  eventStartDate: moment.Moment;
  eventEndDate: moment.Moment;
  totalTickets: number;
  availableTickets: number;
  ticketImageUrl: string;
  ticketPrice: number;
  maxTicketOrder: number;
  minTicketOrder: number;
  organizationInfo: string;
  organizationEmail: string;
  organizationPhone: string;
  organizationAddress: string;
  bankName: string;
  cardHolderName: string;
  creditNumber: string;
  userId?: string;
}

interface IEventDetailProps {
  id?: string;
}

const { Step } = Steps;

const EventDetail: React.FC<IEventDetailProps> = (props) => {
  const { Option } = Select;

  const [current, setCurrent] = React.useState(0);
  const user = useAppSelector(selectorUser);
  const [formInfo] = Form.useForm();
  const [formTicket] = Form.useForm();
  const [formAccountBank] = Form.useForm();

  const [formValues, setFormValues] = useState<IFormEventData>({} as IFormEventData);
  const [alertMessage, setAlertMessage] = useState({ message: '', title: TypeAlertEnum.Info });
  const [isDisplayAlert, setIsDisplayAlert] = useState(false);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isDisplaySpinLogo, setIsDisplaySpinLogo] = useState(false);
  const [isDisplaySpinBanner, setIsDisplaySpinBanner] = useState(false);
  const [isDisplaySpinTicket, setIsDisplaySpinTicket] = useState(false);
  const [imageLogoUrl, setImageLogoUrl] = useState('');
  const [imageBannerUrl, setImageBannerUrl] = useState('');
  const [imageTicketUrl, setImageTicketUrl] = useState('');

  useEffect(() => {
    setIsDisplayAlert(alertMessage.message ? true : false);
  }, [alertMessage]);

  //get bank account of user
  useEffect(() => {
    const getBankAccount = async () => {
      const result: any = await api.userApi.findBankByUserId(user.id);
      if (result) {
        setFormValues({
          ...formValues,
          bankName: result.name,
          cardHolderName: result.cardHolderName,
          creditNumber: result.creditNumber,
        });
      }
    };

    const getCategories = async () => {
      const result: ICategory[] = await api.eventApi.getAllCategory();
      setCategories(result);
    };
    getBankAccount();
    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //get event when update
  useEffect(() => {
    const getEventById = async (id: string) => {
      const result: IEventPayload = await api.eventApi.getEventById(id);
      if (result) {
        const parsedValue = parseValue(result);
        setFormValues({ ...formValues, ...parsedValue });
      }
    };
    if (props.id) {
      getEventById(props.id);
      setIsUpdate(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.id]);

  useEffect(() => {
    formInfo.setFieldsValue(formValues);
  }, [formInfo, formValues]);

  useEffect(() => {
    formTicket.setFieldsValue(formValues);
  }, [formTicket, formValues]);

  useEffect(() => {
    setImageLogoUrl(formValues.logoUrl);
    setImageBannerUrl(formValues.bannerUrl);
    setImageTicketUrl(formValues.ticketImageUrl);
  }, [isUpdate, formValues.logoUrl, formValues.bannerUrl, formValues.ticketImageUrl]);

  const onFinish = async () => {
    const payload: IEventPayload = { ...formValues, userId: user.id };
    if (!isUpdate) {
      try {
        const result: any = await api.eventApi.createEvent(payload);
        if (result) {
          setAlertMessage({ message: 'Created Event Successfully!', title: TypeAlertEnum.Success });
          router.push('/events/my-event');
        }
      } catch (error: any) {
        setAlertMessage({ message: error?.errorCode, title: TypeAlertEnum.Error });
      }
    } else {
      setAlertMessage({ message: 'Feature are development', title: TypeAlertEnum.Info });
    }
  };

  const handleUpload = async (file: any, field: string, form: FormInstance): Promise<any> => {
    switch (field) {
      case 'logoUrl':
        setIsDisplaySpinLogo(true);
        const resultLogo: any = await uploadImage(file);
        setImageLogoUrl(resultLogo.url);
        form.setFields([{ name: field, value: resultLogo.url }]);
        setFormValues({ ...formValues, ...form.getFieldsValue() });
        setIsDisplaySpinLogo(false);
        break;
      case 'bannerUrl':
        setIsDisplaySpinBanner(true);
        const resultBanner: any = await uploadImage(file);
        setImageBannerUrl(resultBanner.url);
        form.setFields([{ name: field, value: resultBanner.url }]);
        setFormValues({ ...formValues, ...form.getFieldsValue() });

        setIsDisplaySpinBanner(false);
        break;
      case 'ticketImageUrl':
        setIsDisplaySpinTicket(true);
        const result: any = await uploadImage(file);
        setImageTicketUrl(result.url);
        form.setFields([{ name: field, value: result.url }]);
        setFormValues({ ...formValues, ...form.getFieldsValue() });
        setIsDisplaySpinTicket(false);
        break;

      default:
        break;
    }
  };

  const uploadImage = async (file: any) => {
    const formData = new FormData();
    formData.append('file', file);
    const result = await api.eventApi.uploadImage(formData);
    return result;
  };

  const handleCancel = () => {
    if (confirm('Do you want cancel create event?')) {
      router.push('/');
    } else {
      return;
    }
  };

  const disabledDate = (current: any) => {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  };

  const next = (value: any) => {
    console.log(value);
    setFormValues((prevState) => ({ ...prevState, ...value }));
    setCurrent((prevState) => prevState + 1);
  };

  const prev = () => {
    setCurrent((prevState) => prevState - 1);
  };

  const parseValue = (eventPayload: IEventPayload): IEventPayload => {
    eventPayload.eventStartDate = moment(eventPayload.eventStartDate);
    eventPayload.eventEndDate = moment(eventPayload.eventEndDate);
    eventPayload.saleStartDate = moment(eventPayload.saleStartDate);
    eventPayload.saleEndDate = moment(eventPayload.saleEndDate);
    eventPayload.ticketPrice = +eventPayload.ticketPrice;
    eventPayload.minTicketOrder = +eventPayload.minTicketOrder;
    eventPayload.maxTicketOrder = +eventPayload.maxTicketOrder;
    eventPayload.totalTickets = +eventPayload.totalTickets;
    return eventPayload;
  };

  const formInfoContent = (
    <Form
      {...layout}
      form={formInfo}
      name="form-info"
      className="event-detail__form"
      validateMessages={validateMessages}
      autoComplete="on"
      onFinish={next}
      initialValues={formValues}
    >
      <Row>
        <Col span={24} className="mb-10">
          <h2 className="event-detail__heading--secondary">Event Information</h2>
        </Col>
        <Col offset={2} span={9}>
          <Form.Item name="name" label="Event name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="eventPlaceName" label="Event place name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="eventAddress" label="Event place address" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="categoryId"
            label="Event Category"
            rules={[{ required: true, message: 'Please select event category ' }]}
          >
            <Select placeholder="Select event category" allowClear>
              {categories.map((category) => (
                <Option value={category.id} key={category.id}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="description" label="Description" rules={[{ required: true }]}>
            <TextArea placeholder="Description for event" autoSize={{ minRows: 3, maxRows: 5 }} />
          </Form.Item>
        </Col>
        <Col offset={2} span={9}>
          <Form.Item
            name="organizationInfo"
            label="Organizer's Information"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="organizationEmail"
            label="Organizer's email"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="organizationPhone"
            label="Organizer's Phone"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="organizationAddress"
            label="Organizer's Address"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Row>
            <Col span={10}>
              <Form.Item name="logoUrl" label="Logo event">
                <Row justify="center">
                  <Spin spinning={isDisplaySpinLogo} size="large">
                    <Avatar
                      size={128}
                      icon={<UserOutlined />}
                      src={imageLogoUrl ? imageLogoUrl : '/img/default-image.jpg'}
                      shape="square"
                    />
                  </Spin>

                  <Upload
                    action={(e) => handleUpload(e, 'logoUrl', formInfo)}
                    showUploadList={false}
                    className="mt-10"
                  >
                    <Button icon={<UploadOutlined />}>Upload</Button>
                  </Upload>
                </Row>
              </Form.Item>
            </Col>
            <Col span={10} offset={4}>
              <Form.Item name="bannerUrl" label="Banner event">
                <Row justify="center">
                  <Spin spinning={isDisplaySpinBanner} size="large">
                    <Avatar
                      size={128}
                      icon={<UserOutlined />}
                      src={imageBannerUrl ? imageBannerUrl : '/img/default-image.jpg'}
                      shape="square"
                    />
                  </Spin>

                  <Upload
                    action={(e) => handleUpload(e, 'bannerUrl', formInfo)}
                    showUploadList={false}
                  >
                    <Button icon={<UploadOutlined />} className="mt-10">
                      Upload
                    </Button>
                  </Upload>
                </Row>
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row justify="end">
        <Button
          htmlType="submit"
          className="btn btn--submit"
          disabled={isDisplaySpinBanner || isDisplaySpinLogo || isDisplaySpinTicket}
        >
          Continue
          <span className="ml-10">
            <ArrowRightOutlined />
          </span>
        </Button>
      </Row>
    </Form>
  );

  const formTicketContent = (
    <Form
      {...layout}
      form={formTicket}
      name="form-ticket"
      className="event-detail__form"
      validateMessages={validateMessages}
      autoComplete="on"
      initialValues={formValues}
      onFinish={next}
    >
      <Row>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 10 }}>
          <Col span={24}>
            <h2 className="event-detail__heading--secondary">Event Time </h2>
          </Col>
          <Row>
            <Col offset={2} span={8}>
              <Form.Item
                name="eventStartDate"
                label="Event start date"
                rules={[{ required: true }]}
              >
                <DatePicker format="DD-MM-YYYY" disabledDate={disabledDate} />
              </Form.Item>
              <Form.Item name="saleStartDate" label="Sale start date" rules={[{ required: true }]}>
                <DatePicker format="DD-MM-YYYY" />
              </Form.Item>
            </Col>
            <Col offset={2} span={8}>
              <Form.Item name="eventEndDate" label="Event end date" rules={[{ required: true }]}>
                <DatePicker format="DD-MM-YYYY" />
              </Form.Item>
              <Form.Item name="saleEndDate" label="Sale end date" rules={[{ required: true }]}>
                <DatePicker format="DD-MM-YYYY" />
              </Form.Item>
            </Col>
          </Row>
        </Col>
        <Col span={14}>
          <Col span={24}>
            <h2 className="event-detail__heading--secondary">Ticket </h2>
          </Col>
          <Row>
            <Col offset={2} span={6}>
              <Form.Item
                name="ticketPrice"
                label="Ticket Price"
                rules={[
                  { required: true },
                  {
                    type: 'number',
                    min: 1,
                    message: 'Please input number greater than 0',
                  },
                ]}
              >
                <InputNumber className="w-100" />
              </Form.Item>
              <Form.Item
                name="minTicketOrder"
                label="Minimum ticket order"
                dependencies={['maxTicketOrder']}
                rules={[
                  { required: true },
                  {
                    type: 'number',
                    min: 1,
                    message: 'Please input number greater than 0',
                  },
                  ({ getFieldValue, isFieldTouched }) => ({
                    validator(rule, value) {
                      const maxTicketOrder = getFieldValue('maxTicketOrder');
                      if (isFieldTouched('maxTicketOrder') && maxTicketOrder < +value) {
                        return Promise.reject([
                          `Please input number less than or equal ${maxTicketOrder}`,
                        ]);
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <InputNumber className="w-100" />
              </Form.Item>
            </Col>
            <Col offset={1} span={6}>
              <Form.Item
                name="totalTickets"
                label="Total tickets"
                rules={[
                  { required: true },
                  {
                    type: 'number',
                    min: 1,
                    message: 'Please input number greater than 0',
                  },
                ]}
              >
                <InputNumber className="w-100" />
              </Form.Item>
              <Form.Item
                name="maxTicketOrder"
                label="Maximum ticket order"
                dependencies={['totalTickets']}
                rules={[
                  { required: true },
                  {
                    type: 'number',
                    min: 1,
                    message: 'Please input number greater than 0',
                  },

                  ({ getFieldValue, isFieldTouched }) => ({
                    validator(rule, value) {
                      const totalTicket = getFieldValue('totalTickets');
                      if (isFieldTouched('maxTicketOrder') && totalTicket < +value) {
                        return Promise.reject([
                          `Please input number less than or equal ${totalTicket}`,
                        ]);
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <InputNumber className="w-100" />
              </Form.Item>
            </Col>
            <Col offset={2} span={6}>
              <Form.Item name="ticketImageUrl" label="Ticket Image">
                <Row justify="center">
                  <Spin spinning={isDisplaySpinTicket} size="large">
                    <Avatar
                      size={128}
                      icon={<UserOutlined />}
                      src={imageTicketUrl ? imageTicketUrl : '/img/default-image.jpg'}
                      shape="square"
                    />
                  </Spin>

                  <Upload
                    action={(e) => handleUpload(e, 'ticketImageUrl', formTicket)}
                    showUploadList={false}
                    className="mt-10"
                  >
                    <Button icon={<UploadOutlined />} className="mt-10">
                      Upload
                    </Button>
                  </Upload>
                </Row>
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row justify="end" className="mt-20">
        <Button
          className="btn btn--submit mr-10"
          onClick={() => prev()}
          disabled={isDisplaySpinBanner || isDisplaySpinLogo || isDisplaySpinTicket}
        >
          <span className="mr-10">
            <ArrowLeftOutlined />
          </span>
          Previous
        </Button>

        <Button
          htmlType="submit"
          className="btn btn--submit"
          disabled={isDisplaySpinBanner || isDisplaySpinLogo || isDisplaySpinTicket}
        >
          Continue
          <span className="ml-10">
            <ArrowRightOutlined />
          </span>
        </Button>
      </Row>
    </Form>
  );

  const formBankContent = (
    <Form
      {...layout}
      form={formAccountBank}
      name="form-bank"
      onFinish={onFinish}
      className="event-detail__form"
      validateMessages={validateMessages}
      autoComplete="on"
    >
      <Row>
        <Col span={24} className="mb-10">
          <h2 className="event-detail__heading--secondary">Bank Account Information</h2>
        </Col>
        <Col offset={6} span={12}>
          <Form.Item name="bankName" label="Bank name" rules={[{ required: true }]}>
            <Input disabled={true} />
          </Form.Item>
          <Form.Item name="cardHolderName" label="Card Holder Name" rules={[{ required: true }]}>
            <Input disabled={true} />
          </Form.Item>
          <Form.Item name="creditNumber" label="Credit Number" rules={[{ required: true }]}>
            <Input disabled={true} />
          </Form.Item>
        </Col>
        <Col offset={8} className="mt-40">
          <Button className="btn btn--submit mr-10" onClick={() => prev()}>
            <span className="mr-10">
              <ArrowLeftOutlined />
            </span>
            Previous
          </Button>
          <Button className="btn btn--submit  mr-10" htmlType="submit">
            {isUpdate ? 'Update Event' : 'Create Event'}
          </Button>
          <Button className="btn btn--cancel" onClick={handleCancel}>
            Cancel
          </Button>
        </Col>
      </Row>
    </Form>
  );

  const steps = [
    {
      title: 'Information',
      content: formInfoContent,
    },
    {
      title: 'Date & Time, Ticket',
      content: formTicketContent,
    },
    {
      title: 'Bank Account',
      content: formBankContent,
    },
  ];

  return (
    <Row>
      <Col offset="16" span="8">
        {isDisplayAlert && (
          <AlertMessage message={alertMessage.message} title={alertMessage.title} />
        )}
      </Col>
      <Col span={24}>
        <main className="event-detail__content">
          <Row>
            <Col span={24}>
              <h1 className="event-detail__heading">Event Information</h1>
            </Col>
            <Col offset={2} xs={{ span: 12 }} lg={{ span: 20 }}>
              <Steps current={current}>
                {steps.map((item) => (
                  <Step key={item.title} title={item.title} />
                ))}
              </Steps>
              <Row className="steps-content">{steps[current].content}</Row>
            </Col>
          </Row>
        </main>
      </Col>
    </Row>
  );
};

export default EventDetail;
