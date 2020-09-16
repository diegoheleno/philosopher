import React, { useEffect, FunctionComponent, useState, ReactText } from 'react';
import { connect } from 'umi';
import { Table, Row, Input, Button, Col, Tooltip, Space } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { PlusOutlined, SearchOutlined, FormOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { ColumnsType } from 'antd/lib/table';
// import Highlighter from 'react-highlight-words';
import colors from '../../../models/colors';
import { SellerState, SellerDispatch } from '../data.d';
import { Seller } from '../../../models/seller';

interface SellersListProps {
  sellers?: SellerState['sellers'];
  dispatch: any;
}

const SellersList: FunctionComponent<SellersListProps> = (props) => {
  const [sellers, setSellers] = useState(props.sellers);
  // const [inputTextSearch, setInputTextSearch] = useState('');
  // const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState<ReactText[]>([]);
  const [searchInput, setSearchInput] = useState<Input | null>(null);

  const getSellers = (reset: boolean = false) => {
    if (!sellers || reset) {
      props.dispatch({
        type: SellerDispatch.QuerySeller,
      });
    }
  };

  useEffect(
    (reset: boolean = false) => {
      if (props.sellers) return setSellers(props.sellers);

      return getSellers(reset);
    },
    [props.sellers],
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
    onFilter: (value: string | number | boolean, seller: Seller) =>
      seller[dataIndex]
        ? seller[dataIndex].toString().toLowerCase().includes(value.toString().toLowerCase())
        : '',
    onFilterDropdownVisibleChange: (visible: boolean) => {
      if (visible && searchInput) {
        setTimeout(() => searchInput.select(), 100);
      }
    },
    render: (text: string) =>
      searchedColumn === dataIndex
        ? text
        : // <Highlighter
          //   highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          //   searchWords={[searchText]}
          //   autoEscape
          //   textToHighlight={text ? text.toString() : ''}
          // />
          text,
  });

  const columns: ColumnsType<Seller> = [
    {
      title: 'Id Seller Vtex',
      dataIndex: `id_seller_vtex`,
      key: 'id_seller_vtex',
      ...getColumnSearchProps('id_seller_vtex'),
    },
    {
      title: 'Seller',
      dataIndex: `fantasy`,
      key: 'fantasy',
      ...getColumnSearchProps('fantasy'),
    },
    {
      title: 'Razão Social',
      dataIndex: `company`,
      key: 'company',
      ...getColumnSearchProps('company'),
    },
    {
      title: 'CNPJ',
      dataIndex: `cnpj`,
      key: 'cnpj',
      ...getColumnSearchProps('cnpj'),
    },
    {
      title: 'Email',
      dataIndex: `email`,
      key: 'email',
      ...getColumnSearchProps('email'),
    },
    {
      title: 'Comissão',
      dataIndex: `commission`,
      key: 'commission',
      ...getColumnSearchProps('commission'),
      render: (node, seller) => `${seller.commission}%`,
    },
    {
      title: 'Opções',
      key: 'option',
      render: (node, seller) => (
        <Tooltip placement="bottom" title={'Detalhes Seller'}>
          <Link to={{ pathname: '/sellers/new', state: { seller } }}>
            <FormOutlined style={{ marginLeft: '10px', color: colors.orange }} />
          </Link>
        </Tooltip>
      ),
    },
  ];

  return (
    <>
      <PageContainer>
        <Row justify="end" style={{ padding: '20px 40px', backgroundColor: 'white' }}>
          {/* <Button style={{ marginRight: '20px', width: '200px' }}>Redefinir</Button> */}

          <Button
            type="primary"
            style={{ backgroundColor: colors.green, color: 'white', width: '200px' }}
          >
            <Link to={'/sellers/new'}>
              <PlusOutlined style={{ marginRight: '10px' }} />
              Novo Seller
            </Link>
          </Button>
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
              dataSource={sellers?.map((seller, index) => ({ ...seller, key: index + 1 }))}
            />
          </Col>
        </Row>
      </PageContainer>
    </>
  );
};

export default connect(({ sellerModel }: { sellerModel: SellerState }) => ({
  sellers: sellerModel.sellers,
}))(SellersList);
