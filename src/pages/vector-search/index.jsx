import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Table, Switch } from "antd";
import SearchForm from "./search-form";
import "./index.less";

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
  const searchSuccess = data => {
    setData(data);
  };
  const handleCancel = () => {
    setData(null);
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
          handleCancel={handleCancel}
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
