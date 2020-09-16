import React, { FunctionComponent, useEffect, useState, ReactText } from 'react';
import { connect } from 'umi';
import { Input, Table, Button, Row, Col, Tooltip, Tag, Space } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { SearchOutlined, FormOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import colors from '@/models/colors';
import { ColumnsType } from 'antd/lib/table';
// import Highlighter from 'react-highlight-words';
import { Product } from '@/models/product';
import { ProductState, ProductDispatch } from '../data.d';
// import styles from '../style.less'

interface ProductsListProps {
  products?: ProductState['products'];
  dispatch: any;
}

const ProductList: FunctionComponent<ProductsListProps> = (props) => {
  const [products, setProducts] = useState(props.products);
  // const [inputTextSearch, setInputTextSearch] = useState('');
  // const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState<ReactText[]>([]);
  const [searchInput, setSearchInput] = useState<Input | null>(null);

  const getProducts = (reset: boolean = false) => {
    if (!products || reset) {
      props.dispatch({
        type: ProductDispatch.QueryProduct,
      });
    }
  };

  useEffect(
    (reset: boolean = false) => {
      if (props.products) return setProducts(props.products);

      return getProducts(reset);
    },
    [props.products],
  );

  const handleSearch = (selectedKeys: string[], confirm: () => void, dataIndex: string) => {
    confirm();
    // setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    // setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: string) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            setSearchInput(node);
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: string) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value: string | number | boolean, product: Product) =>
      product[dataIndex]
        ? product[dataIndex].toString().toLowerCase().includes(value.toString().toLowerCase())
        : '',
    onFilterDropdownVisibleChange: (visible: boolean) => {
      if (visible && searchInput) {
        setTimeout(() => searchInput.select(), 100);
      }
    },
    render: (text: string) => (searchedColumn === dataIndex ? text : text),
    //   (<Highlighter
    //     highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
    //     searchWords={[searchText]}
    //     autoEscape
    //     textToHighlight={text ? text.toString() : ''}
    //   />
    // ) : (
    // text
    // ),
  });

  const columns: ColumnsType<Product> = [
    {
      title: 'Foto',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      render: (node, product) => (
        <img
          style={{ width: '50px', height: '50px' }}
          src={product.imageUrl}
          alt={product.imageName}
        />
      ),
    },
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'SKU',
      dataIndex: 'sku',
      key: 'sku',
      ...getColumnSearchProps('sku'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'Aprovado', value: 'Aprovado' },
        { text: 'Recusado', value: 'Recusado' },
        { text: 'Análise', value: 'Análise' },
      ],
      onFilter: (filterValue, product) => product.status === filterValue,
      render: (status) => {
        return (
          <Tag
            color={
              status === 'Análise'
                ? colors.orange
                : status === 'Aprovado'
                ? colors.green
                : status === 'Recusado'
                ? colors.red
                : colors.blue
            }
            key={status}
          >
            {status}
          </Tag>
        );
      },
    },
    {
      title: 'Seller',
      dataIndex: 'keyword',
      key: 'seller',
      ...getColumnSearchProps('keyword'),
      render: (keyword) => `Empresa ${keyword}`,
    },
    {
      title: 'Opções',
      key: 'option',
      render: (node, product) => (
        <Tooltip placement="bottom" title={`Detalhes ${product.name}`}>
          <Link to={{ pathname: '/product/screen', state: { product } }}>
            <FormOutlined style={{ color: colors.orange }} />
          </Link>
        </Tooltip>
      ),
    },
  ];

  return (
    <>
      <PageContainer title={'Produtos'}>
        {/* <Row style={{ backgroundColor: 'white', padding: '20px 40px' }}>
          <Col span={15}>
            {/* <Button
              style={{ left: '10px' }}
              onClick={() => {
                getProducts(true);
              }}
            >
              {'Redefinir'}
            </Button>
           </Col>
        </Row>

        <Row style={{ marginTop: '20px' }}>
          <Col span={24}>
            <div style={{ marginBottom: 16 }}>
              <span style={{ marginLeft: 8 }}>
                {selectedRowKeys.length === 1
                  ? `${selectedRowKeys.length} item selecionado`
                  : selectedRowKeys.length > 1
                  ? `${selectedRowKeys.length} itens selecionados`
                  : ''}
              </span>
            </div>
            <Table
              columns={columns}
              rowSelection={{
                selectedRowKeys,
                onChange: (keys: ReactText[]) => setSelectedRowKeys(keys),
              }}
              dataSource={products?.map((product, index) => ({ ...product, key: index + 1 }))}
            />
          </Col>
        </Row> */}

        <Row style={{ marginTop: '20px' }}>
          <Col span={24}>
            <div style={{ marginBottom: 16 }}>
              <span style={{ marginLeft: 8 }}>
                {selectedRowKeys.length === 1
                  ? `${selectedRowKeys.length} item selecionado`
                  : selectedRowKeys.length > 1
                  ? `${selectedRowKeys.length} itens selecionados`
                  : ''}
              </span>
            </div>
            <Table
              columns={columns}
              rowSelection={{
                selectedRowKeys,
                onChange: (keys: ReactText[]) => setSelectedRowKeys(keys),
              }}
              dataSource={products?.map((product, index) => ({ ...product, key: index + 1 }))}
            />
          </Col>
        </Row>
      </PageContainer>
    </>
  );
};

// export default connect()(ProductList);
export default connect(({ productModel }: { productModel: ProductState }) => ({
  ...productModel,
}))(ProductList);
