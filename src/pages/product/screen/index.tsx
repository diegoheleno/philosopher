import React, { FunctionComponent, useState } from 'react';
import { connect } from 'umi';
import { Button, Row, Col, Descriptions, Carousel, Tooltip } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import colors from '@/models/colors';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Link, RouteChildrenProps, Redirect } from 'react-router-dom';
import Title from 'antd/lib/typography/Title';
import { Product, productDefaultValues, ProductStatus } from '@/models/product';
import imagens from '../../../../mock/imagem';

interface ProductDetailProps extends RouteChildrenProps {
  dispatch: any;
  location: any;
}

const ProductDetail: FunctionComponent<ProductDetailProps> = (props) => {
  const product: Product = props.location.state?.product
    ? props.location.state?.product
    : productDefaultValues;

  const [redirect, setRedirect] = useState(false);

  const save = () => {
    props.dispatch({
      type: `productModel/updateProduct`,
      payload: product,
    });
    setRedirect(true);
  };

  const approval = () => {
    product.status = ProductStatus.Approved;
    save();
  };

  const refused = () => {
    product.status = ProductStatus.Refused;
    save();
  };

  return (
    <PageContainer title={'Avaliação de Produtos'}>
      {redirect && <Redirect to={{ pathname: '/product/list' }} />}
      <Row
        justify={'space-between'}
        align={'middle'}
        style={{ margin: '20px 0px', backgroundColor: 'white', padding: '10px 40px' }}
      >
        <Row align={'middle'}>
          <Tooltip title="Voltar">
            <Link to={'/product/list'}>
              <Button type="primary" shape="circle" icon={<ArrowLeftOutlined />} />
            </Link>
          </Tooltip>
          <Title style={{ fontSize: '25px', margin: '0 20px', padding: '0', textAlign: 'center' }}>
            {product.name}
          </Title>
        </Row>
        <Row>
          <Col>
            <Button
              style={{
                margin: '10px 5px',
                width: '150px',
                backgroundColor: colors.blue,
                color: 'white',
              }}
              type="primary"
            >
              Categoria V
            </Button>
          </Col>
          <Col>
            <Button
              style={{
                margin: '10px 5px',
                width: '150px',
                backgroundColor: colors.green,
                color: 'white',
              }}
              type="primary"
              onClick={() => approval()}
            >
              Aprovar
            </Button>
          </Col>

          <Col>
            <Button
              style={{
                margin: '10px 5px',
                width: '150px',
                backgroundColor: colors.red,
                color: 'white',
              }}
              type="primary"
              onClick={() => refused()}
            >
              Reprovar
            </Button>
          </Col>
        </Row>
      </Row>
      <Row justify={'space-between'}>
        <Col xs={24} sm={24} md={8} lg={8}>
          <Carousel autoplay>
            <div>
              <img alt="imagem" src={imagens[0]} style={{ width: '100%', height: '200px' }} />
            </div>
            <div>
              <img alt="imagem" src={imagens[1]} style={{ width: '100%', height: '200px' }} />
            </div>
            <div>
              <img alt="imagem" src={imagens[2]} style={{ width: '100%', height: '200px' }} />
            </div>
            <div>
              <img alt="imagem" src={imagens[3]} style={{ width: '100%', height: '200px' }} />
            </div>
          </Carousel>
        </Col>
        <Col xs={24} sm={24} md={15} lg={15} style={{ backgroundColor: 'white', padding: '10px' }}>
          <Descriptions bordered column={1} size={'small'}>
            <Descriptions.Item label="Título do Produto">{product.name}</Descriptions.Item>
            <Descriptions.Item label="Descrição">{product.description}</Descriptions.Item>
            <Descriptions.Item label="Acessórios">{product.accessories}</Descriptions.Item>
            <Descriptions.Item label="Status">{product.status}</Descriptions.Item>
            <Descriptions.Item label="SKU">{product.sku}</Descriptions.Item>
            <Descriptions.Item label="Código">{product.code}</Descriptions.Item>
            <Descriptions.Item label="Altura">{product.height}cm</Descriptions.Item>
            <Descriptions.Item label="Largura">{product.width}cm</Descriptions.Item>
            <Descriptions.Item label="Peso">{product.weight}kg</Descriptions.Item>
            <Descriptions.Item label="Tamanho">{product.length}cm</Descriptions.Item>
            <Descriptions.Item label="Multiplicador">{product.multiplierUnity}x</Descriptions.Item>
            <Descriptions.Item label="Unidade de Medida">{product.unitMeasure}</Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
    </PageContainer>
  );
};
export default connect()(ProductDetail);
