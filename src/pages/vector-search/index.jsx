import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Table, Switch } from "antd";
import SearchForm from "./search-form";
import "./index.scss";

const VectorSearch = props => {
  const { t } = useTranslation();
  const dataManageTrans = t("dataManage");
  const vectorTrans = t("vector");
  const [data, setData] = useState(null);
  const [showSearch, setShowSearch] = useState(true);
  const columns = [
    {
      title: "ID",
      dataIndex: "id"
    },
    {
      title: vectorTrans.distance,
      dataIndex: "distance"
    }
  ];
  const searchSuccess = () => {
    setData([
      {
        id: 1,
        distance: "123"
      },
      {
        id: 2,
        distance: "333"
      },
      {
        id: 3,
        distance: "1231"
      },
      {
        id: 4,
        distance: "3331"
      },
      {
        id: 5,
        distance: "1232"
      },
      {
        id: 6,
        distance: "3332"
      },
      {
        id: 7,
        distance: "1233"
      },
      {
        id: 8,
        distance: "3333"
      }
    ]);
  };
  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };
  return (
    <div className="vector-wrapper">
      <div className="header">
        <h2>{dataManageTrans.vector}</h2>
      </div>
      <div style={{ marginTop: "20px" }}>
        <span className="mr-10">{vectorTrans.search}</span>
        <Switch checked={showSearch} onChange={toggleSearch}></Switch>
      </div>

      <div>
        <SearchForm
          showSearch={showSearch}
          searchSuccess={searchSuccess}
        ></SearchForm>
      </div>

      {data && (
        <Table
          rowKey={record => record.id}
          columns={columns}
          pagination={false}
          className="table-wrapper"
          dataSource={data}
        />
      )}
    </div>
  );
};

export default VectorSearch;
