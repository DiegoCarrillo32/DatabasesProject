import React, { useState } from "react";
import { Button } from "../../../components/Button/Button";
import { Modal } from "../../../modals/elementModal";
import "./DashboardMain.css";
export const DashboardMain = () => {
  const [isOpened, setIsOpened] = useState(false);
  return (
    <div>
      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Code</th>
            <th>Location</th>
            <th>
              <Button
                herarchy={"primary"}
                title={"+"}
                onClick={() => {
                  setIsOpened(true);
                }}
              />
            </th>
            <th>
              <Button
                herarchy={"primary"}
                title={"-"}
                onClick={() => {
                  setIsOpened(true);
                }}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
          </tr>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
          </tr>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
          </tr>
        </tbody>
      </table>
      <Modal isOpened={isOpened} onClose={() => setIsOpened(false)} />
    </div>
  );
};
