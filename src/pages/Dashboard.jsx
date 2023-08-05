import { useState } from "react";

// Data
import mockData from "../assets/data.json";
import timestamps from "../assets/timeStamps.json";

// Components
import Dropdown from "../component/dropdown/Dropdown";
import HeaderTitle from "../component/header-title/HeaderTitle";
import Search from "../component/search/Search";
import List from "../component/list/List";

// Styles
import styles from "./Dashboard.module.css";
import Card from "../component/card/Card";

const Dashboard = () => {
  const [currency, setCurrency] = useState("EUR");
  const [searchText, setSearchText] = useState("");
  const [selectedOrderDetails, setSelectedOrderDetails] = useState({});
  const [selectedOrderTimeStamps, setSelectedOrderTimeStamps] = useState({});

  const totalOrders = mockData.results.length;

  const filteredOrders = mockData.results.filter((order) =>
    order["&id"].toLowerCase().includes(searchText.toLowerCase())
  );
  const handleOrderSelection = (orderId) => {
    const selectedOrder = mockData.results.find((order) => order["&id"] === orderId);
    setSelectedOrderDetails({
      buySellIndicator: selectedOrder.executionDetails.buySellIndicator,
      orderStatus: selectedOrder.executionDetails.orderStatus,
      orderType: selectedOrder.executionDetails.orderType,
    });
    const selectedTimestamps = timestamps.results.find((timestamp) => timestamp["&id"] === orderId);
    setSelectedOrderTimeStamps(selectedTimestamps.timestamps);
  };


  return (
    <div>
      <div className={styles.header}>
        <HeaderTitle primaryTitle="Orders" secondaryTitle={`${filteredOrders.length} orders`} />
        <div className={styles.actionBox}>
          <Search
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Dropdown
            options={["GBP", "USD", "JPY", "EUR"]}
            onChange={(e) => setCurrency(e.target.value)}
            selectedItem={currency}
          />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.section}>
          <Card
            cardData={selectedOrderDetails}
            title="Selected Order Details"
          />
          <Card
            cardData={selectedOrderTimeStamps}
            title="Selected Order Timestamps"
          />
        </div>
        <List rows={filteredOrders} timestamps={timestamps.results} selectedCurrency={currency} onSelectRow={handleOrderSelection} />
      </div>
    </div>
  );
};

export default Dashboard;
