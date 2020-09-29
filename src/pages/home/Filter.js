import React from "react";
import { useEffect } from "react";
import M from "materialize-css";

const Filter = ({
  fundCatogories,
  handleFundCategoryChange,
  fundTypes,
  handleFundTypeChange,
  plans,
  handlePlanChange,
}) => {
  // Initialized Materializecss.
  useEffect(() => {
    const elems = document.querySelectorAll("select");
    M.FormSelect.init(elems, fundCatogories);
  }, [fundCatogories]);

  useEffect(() => {
    const elems = document.querySelectorAll("select");
    M.FormSelect.init(elems, fundTypes);
  }, [fundTypes]);

  useEffect(() => {
    const elems = document.querySelectorAll("select");
    M.FormSelect.init(elems, plans);
  }, [plans]);

  return (
    <div className="row">
      <div className="input-field col s12 m4">
        <select defaultValue="" onChange={(e) => handleFundCategoryChange(e)}>
          <option value="" disabled>
            Choose your option
          </option>
          {fundCatogories &&
            fundCatogories.map((category) => {
              console.log(category);
              return (
                <option value={category} key={category}>
                  {category}
                </option>
              );
            })}
        </select>
        <label>Fund Catogories</label>
      </div>
      <div className="input-field col s12 m4">
        <select defaultValue="" onChange={(e) => handleFundTypeChange(e)}>
          <option value="" disabled>
            Choose your option
          </option>
          {fundTypes.map((type) => {
            return <option value={type}>{type}</option>;
          })}
        </select>
        <label>Fund Types</label>
      </div>
      <div className="input-field col s12 m4">
        <select onChange={(e) => handlePlanChange(e)}>
          <option defaultValue="" disabled>
            Choose your option
          </option>
          {plans.map((category) => {
            return <option value={category}>{category}</option>;
          })}
        </select>
        <label>Plans</label>
      </div>
    </div>
  );
};

export default Filter;
