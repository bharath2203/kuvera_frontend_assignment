import React from "react";

const Table = ({ headings, filteredFunds, handleHeadingClick }) => {
  return (
    <div className="card centered-card">
      <div className="card-content">
        <table class="centered">
          <thead>
            <tr>
              <th>Index </th>
              {headings.map((heading) => {
                return (
                  <th onClick={(e) => handleHeadingClick(heading)}>
                    {heading}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {filteredFunds.map((fund, ind) => {
              return (
                <tr>
                  <td>{ind + 1}</td>
                  <td>{fund.name}</td>
                  <td>{fund.fund_category}</td>
                  <td>{fund.fund_type}</td>
                  <td>{fund.plan}</td>
                  <td>{fund.returns.year_1}</td>
                  <td>{fund.returns.year_3}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
