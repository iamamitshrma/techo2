import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from 'rc-table';
import styles from './homeScreen.module.css';

const HomeScreen = () => {

  const [user, setUser] = useState([]);

  const deleteItem = (e) => {
    console.log(e)
  }

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
      width: 200,
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
      width: 200,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 200,
    },
    {
      title: 'isAdmin',
      dataIndex: 'isAdmin',
      key: 'isAdmin',
      width: 200,
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      width: 200,
    },
    {
      title: 'Operations',
      dataIndex: '',
      key: 'operations',
      render: () => <button onClick={deleteItem}>Delete</button>,
    },
  ];

  useEffect(() => {
    const getUsers = async () => {
      const item = await axios.get('http://localhost:8800/api/users/allUsers'); 
      setUser(item.data);
    }
    getUsers();
  },[]);

  const data = user;
  console.log(data)
  return (
    <>
      <div className={styles.tableContainer}>
        <Table columns={columns} data={data} />
      </div>
    </>
  );
};

export default HomeScreen;
