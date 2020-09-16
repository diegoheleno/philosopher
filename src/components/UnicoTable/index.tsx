import React, { FunctionComponent, useState, ReactText } from 'react';
import { connect } from 'umi';
import { Table, Row, Input, Button, Col, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/lib/table';
// import Highlighter from 'react-highlight-words';

interface UnicoTableProps {
  dataSource: any[];
  columns: ColumnsType<any>;
}

const UnicoTable: FunctionComponent<UnicoTableProps> = (props) => {
  const [searchedColumn, setSearchedColumn] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState<ReactText[]>([]);
  const [searchInput, setSearchInput] = useState<Input | null>(null);

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
    onFilter: (value: string | number | boolean, item: any) =>
      item[dataIndex]
        ? item[dataIndex].toString().toLowerCase().includes(value.toString().toLowerCase())
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

  const columns = props.columns.map((column) => ({
    ...column,
    ...getColumnSearchProps(column.key ? column.key.toString() : ''),
  }));

  const itens = props.dataSource?.map((item, index) => ({
    ...item,
    key: index + 1,
  }));

  console.log(columns);

  return (
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
          dataSource={itens}
        />
      </Col>
    </Row>
  );
};

// export default connect(({ sellerModel }: { sellerModel: SellerState }) => ({
//   dataSource: sellerModel.dataSource,
// }))(DataSourceList);

export default connect()(UnicoTable);
