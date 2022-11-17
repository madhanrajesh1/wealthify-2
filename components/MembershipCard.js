import Image from "next/image";
import React, { useEffect } from "react";
import Wrappers from "../assets/wrappers/MembershipCard";
import Tag from "../assets/image/Tag.svg";
import axios from "axios";
import { getRequest, postRequest } from "../utils/request/postRequest";
let patientId;
if (typeof window !== "undefined") {
  patientId = localStorage.getItem("p_id");
}
const MembershipCard = ({
  price,
  planType,
  month,
  calls,
  dietChart,
  planId,
  buttonType,
}) => {
  const buyPlans = async () => {
    postRequest("subscription", {
      api_key: "add",
      data: { p_id: patientId, plan_type: planType, plan_id: planId },
    });
  };
  return (
    <Wrappers>
      <div className="tag-container">
        <Image src={Tag} />
        <p className="price">
          {price} <br />
          INR
        </p>
      </div>
      <div className="container">
        <ul>
          <li>{month}</li>
          <li>{calls}</li>
          <li>{dietChart}</li>
        </ul>
        <div className="upgrade-div">
          <button
            className="upgrade-btn  btn"
            onClick={() => {
              buyPlans();
            }}
          >
            {buttonType}
          </button>
        </div>
      </div>
    </Wrappers>
  );
};

export default MembershipCard;
