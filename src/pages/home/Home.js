import React, { useState, useEffect } from "react";
import fetchData from "../../api/apiUtil";
import "./Home.css";
import Table from "./Table";
import Filter from "./Filter";

const Home = (props) => {
  const [funds, setFunds] = useState([]);
  const [filteredFunds, setfilteredFunds] = useState([]);
  const [sortColumn, setSortColumn] = useState(null);
  const [fundCategories, setFundCategories] = useState([]);
  const [fundTypes, setFundTypes] = useState([]);
  const [plans, setPlans] = useState([]);
  const [fundCategory, setFundCategory] = useState(null);
  const [fundType, setFundType] = useState(null);
  const [plan, setPlan] = useState(null);

  const headings = [
    "Name",
    "Fund Category",
    "Fund Type",
    "Plan",
    "Year 1 Returns",
    "Year 2 Returns",
  ];

  const headingToKeys = {
    Name: "name",
    "Fund Category": "fund_category",
    "Fund Type": "fund_type",
    Plan: "plan",
  };

  // Initializes option values for filtering from recieved JSON.
  const fillFilteringColumns = (funds) => {
    setFundCategories(getUniqueItems(funds, "fund_category"));
    setFundTypes(getUniqueItems(funds, "fund_type"));
    setPlans(getUniqueItems(funds, "plan"));
  };

  // Returns list of unique items fron the JSON array, given key
  const getUniqueItems = (list, key) => {
    const uniqueItems = [];
    list.forEach((item) => {
      if (item === null) return;
      if (!uniqueItems.includes(item[key])) {
        uniqueItems.push(item[key]);
      }
    });
    return uniqueItems;
  };

  useEffect(() => {
    fetchData()
      .then((response) => {
        let requiredFunds = response.data;
        requiredFunds = requiredFunds.slice(
          0,
          Math.min(requiredFunds.length, 100)
        );
        console.log(requiredFunds);
        setFunds(requiredFunds);
        setfilteredFunds(requiredFunds);
        fillFilteringColumns(requiredFunds);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Update the order of the JSON data everytime the heading is clicked.
  useEffect(() => {
    const msortFunds = [...filteredFunds];
    msortFunds.sort((first, second) => {
      if (first[sortColumn] < second[sortColumn]) return -1;
      else if (first[sortColumn] === second[sortColumn]) return 0;
      else return 1;
    });
    setfilteredFunds(msortFunds);
  }, [sortColumn]);

  useEffect(() => {
    const mFunds = [...funds];
    const filteredmFunds = mFunds.filter((fund) => {
      return fund.fund_category === fundCategory;
    });
    setfilteredFunds(filteredmFunds);
  }, [fundCategory]);

  useEffect(() => {
    const mFunds = [...funds];
    const filteredmFunds = mFunds.filter((fund) => {
      return fund.fund_type === fundType;
    });
    setfilteredFunds(filteredmFunds);
  }, [fundType]);

  useEffect(() => {
    const mFunds = [...funds];
    const filteredmFunds = mFunds.filter((fund) => {
      return fund.plan === plan;
    });
    setfilteredFunds(filteredmFunds);
  }, [plan]);

  const handleHeadingClick = (column_heading) => {
    setSortColumn(headingToKeys[column_heading]);
  };

  const handleFundCategoryChange = (event) => {
    setFundCategory(event.target.value);
  };

  const handleFundTypeChange = (event) => {
    setFundType(event.target.value);
  };

  const handlePlanChange = (event) => {
    setPlan(event.target.value);
  };

  return (
    <div>
      <Filter
        fundCatogories={fundCategories}
        handleFundCategoryChange={handleFundCategoryChange}
        fundTypes={fundTypes}
        handleFundTypeChange={handleFundTypeChange}
        plans={plans}
        handlePlanChange={handlePlanChange}
      ></Filter>
      <Table
        headings={headings}
        filteredFunds={filteredFunds}
        handleHeadingClick={handleHeadingClick}
      ></Table>
    </div>
  );
};

export default Home;
