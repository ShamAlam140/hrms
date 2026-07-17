import React, { useState } from 'react';
import { Table, Input, Button, Space } from 'antd';

const { Column } = Table;

const EditableTable = () => {
  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      sn: '1',
      class: 'Consultancy service',
      description: 'FARS',
      
      qty: '1',
      'Unit Price (₦)': '1,000,000.00',
      'Amount (₦)': '1,000,000.00',
      'VAT %': '7.50%',
      'VAT Amount (₦)': '75,000.00',
      'Gross Amount (₦)': '1,075,000.00',
      'WHT%': '2.5%',
      'WHT Amount': '25,000.00',
      'Net Amount': '1,050,000.00',
    },
    {
      key: '2',
      sn: '2',
      class: 'Consultancy service',
      description: 'Tax Service',
   
      qty: '1',
      'Unit Price (₦)': '500,000.00',
      'Amount (₦)': '500,000.00',
      'VAT %': '7.50%',
      'VAT Amount (₦)': '37,500.00',
      'Gross Amount (₦)': '537,500.00',
      'WHT%': '10%',
      'WHT Amount': '50,000.00',
      'Net Amount': '487,500.00',
    },
  ]);

  const handleAdd = () => {
    const newData = {
        sn: '',
      key: dataSource.length + 1,
      class: '',
      description: '',
      
      qty: '',
      'Unit Price (₦)': '',
      'Amount (₦)': '',
      'VAT %': '',
      'VAT Amount (₦)': '',
      'Gross Amount (₦)': '',
      'WHT%': '',
      'WHT Amount': '',
      'Net Amount': '',
    };
    setDataSource([...dataSource, newData]);
  };

  return (
    <div>
     
      <Table dataSource={dataSource} bordered className='w-full '>
      <Column title="S/N" dataIndex="sn" key="sn" />
        <Column title="Class" dataIndex="class" key="class" />
        <Column title="Description" dataIndex="description" key="description" />
        <Column title="QTY" dataIndex="qty" key="qty" />
        <Column title="Unit Price" dataIndex="Unit Price (₦)" key="Unit Price (₦)" />
        <Column title="Amount" dataIndex="Amount (₦)" key="Amount (₦)" />
        <Column title="VAT %" dataIndex="VAT %" key="VAT %" />
        <Column title="VAT Amount" dataIndex="VAT Amount (₦)" key="VAT Amount (₦)" />
        <Column title="Gross Amount" dataIndex="Gross Amount (₦)" key="Gross Amount (₦)" />
        <Column title="WHT%" dataIndex="WHT%" key="WHT%" />
        <Column title="WHT Amount" dataIndex="WHT Amount" key="WHT Amount" />
        <Column title="Net Amount" dataIndex="Net Amount" key="Net Amount" />
      </Table>
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        Add a row
      </Button>
    </div>
  );
};

export default EditableTable;
