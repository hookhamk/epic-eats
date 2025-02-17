import React, { useState } from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';

interface Item {
  id: number;
  title: string;
  image: string;
  // Add other properties as needed
}

interface Props {
  items: Item[];
}

type LayoutType = Parameters<typeof Form>[0]['layout'];

const PaginatedList: React.FC<Props> = ({ items }) => {
  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the index range for current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  // Function to handle page change
  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(items.length / itemsPerPage); i++) {
    pageNumbers.push(i);

    //Ant Design Form
    const [form] = Form.useForm();
    const [formLayout, setFormLayout] = useState<LayoutType>('horizontal');
  
    const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
      setFormLayout(layout);
  }

  return (
    <div>
      {currentItems.map(item => (
        <div key={item.id}>
            <img src={item.image}></img>
            <p>{item.title}</p>
        </div>
      ))}
      <div>
        {pageNumbers.map(number => (
          <button key={number} onClick={() => handleClick(number)}>
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PaginatedList;