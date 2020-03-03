import React, { useState, useContext, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Table } from "antd";
import SearchForm from "./search-form";
import "./index.less";
import { dataManagementContext } from "../../context/data-management";
import { httpContext } from "../../context/http";
import { KEYS } from "../../reducers/data-management";
import { UPDATE } from "../../consts";
const VectorSearch = props => {
  const { t } = useTranslation();
  const dataManageTrans = t("dataManage");
  const vectorTrans = t("vector");
  const [showSearch, setShowSearch] = useState(true);
  const { currentAddress } = useContext(httpContext);
  const { dataManagement, setDataManagement } = useContext(
    dataManagementContext
  );

  const { data, formInit } = useMemo(() => {
    const { data = null, formInit = {} } =
      dataManagement[KEYS.vectorSearch][currentAddress] || {};
    console.log("in", dataManagement);
    return { data, formInit };
  }, [dataManagement, currentAddress]);
  console.log(data, formInit);
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
    setDataManagement({
      type: UPDATE,
      payload: {
        key: KEYS.vectorSearch,
        id: currentAddress,
        value: { data }
      }
    });
  };
  const handleCancel = () => {
    setDataManagement({
      type: UPDATE,
      payload: {
        key: KEYS.vectorSearch,
        id: currentAddress,
        value: { data: null }
      }
    });
  };
  const setFormInit = data => {
    setDataManagement({
      type: UPDATE,
      payload: {
        key: KEYS.vectorSearch,
        id: currentAddress,
        value: { formInit: { ...data } }
      }
    });
  };
  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  return (
    <div className="vector-wrapper">
      <div className="header">
        <h2>{dataManageTrans.vector}</h2>
      </div>
      {/* <div style={{ marginTop: "20px" }}>
        <span className="mr-10">{vectorTrans.search}</span>
        <Switch checked={showSearch} onChange={toggleSearch}></Switch>
      </div> */}

      <div>
        <SearchForm
          showSearch={showSearch}
          handleCancel={handleCancel}
          searchSuccess={searchSuccess}
          formInit={formInit}
          setFormInit={setFormInit}
        ></SearchForm>
      </div>

      {data && (
        <Table
          size="middle"
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
