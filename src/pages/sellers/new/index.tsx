import React, { FunctionComponent, useState } from 'react';
import { connect } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { Form, Row, Input, Button, InputNumber, Tooltip, message, Col } from 'antd';
import colors from '@/models/colors';
import { Store } from 'antd/es/form/interface';
import { Seller, sellerDefaultValues, sellerLabel } from '@/models/seller';
import { RouteChildrenProps, Link } from 'react-router-dom';
import { PlusOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { SellerDispatch } from '../data.d';

interface SellerNewProps extends RouteChildrenProps {
  dispatch: any;
  location: any;
}

const SellerNew: FunctionComponent<SellerNewProps> = (props) => {
  const seller: Seller = props.location.state?.seller
    ? props.location.state?.seller
    : sellerDefaultValues;
  // const [redirect, setRedirect] = useState(false);
  const [mode] = useState<'new' | 'edit'>(seller.id_seller_vtex ? 'edit' : 'new');

  const onSubmitSeller = (store: Store) => {
    const newSeller: Seller = {
      ...sellerDefaultValues,
      ...store,
    };

    if (mode === 'new')
      props.dispatch({
        type: SellerDispatch.AddSeller,
        payload: newSeller,
      });
    else
      props.dispatch({
        type: SellerDispatch.UpdateSeller,
        payload: newSeller,
      });

    message.success('Seller salvo com sucesso!');
    window.location.replace('/sellers/list');
    // setRedirect(true);
  };

  const createInputByType = (prop: string) => {
    switch (typeof seller[prop]) {
      case 'number':
        return (
          <InputNumber
            style={{ width: '100%' }}
            // readOnly={mode === 'edit' && prop !== 'commission'}
            disabled={mode === 'edit' && prop !== 'commission'}
          />
        );
      case 'string':
        return <Input
          // readOnly={mode === 'edit' && prop !== 'commission'}
          disabled={mode === 'edit' && prop !== 'commission'}
        />;
      default:
        return <></>;
    }
  };

  const createInputs = () => {
    return Object.keys(seller)
      .filter((prop) => prop !== 'sellerId' && prop !== 'password' && prop !== 'key')
      .map((prop) => (
        <Col xs={24} sm={12} md={8} lg={6}>
          <Form.Item
            label={sellerLabel[prop]}
            name={prop}
            initialValue={seller[prop]}
            rules={[
              {
                required: true,
                message: 'Este campo é obrigatório!',
              },
            ]}
          >
            {createInputByType(prop)}
          </Form.Item>
        </Col>
      ));
  };

  return (
    <PageContainer>
      {/* {redirect && <Redirect to={{ pathname: '/sellers/list' }} />} */}
      <Form
        onFinish={(event) => onSubmitSeller(event)}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 22 }}
        layout="horizontal"
        name="basic"
        initialValues={{
          remember: true,
          layout: 'horizontal',
        }}
      >
        <Row justify="space-between" style={{ padding: '20px', backgroundColor: 'white' }}>
          <Tooltip title="Voltar">
            <Link to={'/sellers/list'}>
              <Button type="primary" shape="circle" icon={<ArrowLeftOutlined />} />
            </Link>
          </Tooltip>

          <Button
            type="primary"
            htmlType="submit"
            style={{ backgroundColor: colors.green, width: '200px' }}
          >
            <PlusOutlined /> Salvar{' '}
          </Button>
        </Row>

        <Row
          justify={'start'}
          align={'middle'}
          style={{ backgroundColor: 'white', marginTop: '20px', padding: '20px' }}
        >
          {/* <Col span={16} style={{ margin: '40px auto' }}> */}
          {createInputs()}
          {/* </Col> */}
        </Row>
      </Form>
    </PageContainer>
  );
};
export default connect()(SellerNew);
