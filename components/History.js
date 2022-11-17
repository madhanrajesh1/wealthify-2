import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { useAppcontext } from "../context/appContext";
import PrescriptionForm from "./PrescriptionForm";
import formatDate from "../utils/dateFormat";
const Wrappers = styled.div`
  margin-top: 3rem;
  width: 700px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .btn-green {
    margin-left: -2rem;
  }
  .table-container {
    height: 300px;
    overflow: scroll;
  }
  td {
    padding: 1rem;
  }
  th {
    padding: 0.5rem;
  }
  @media (max-width: 480px) {
    width: 300px;
  }
`;
const data = [
  {
    patientId: "1212",
    attendedPatient: "john",
    callDuration: "12:45 PM - 1:00PM ,15 mins",
  },
  {
    patientId: "1232",
    attendedPatient: "john",
    callDuration: "12:45 PM - 1:00PM ,15 mins ",
  },
  {
    patientId: "1232",
    attendedPatient: "john",
    callDuration: "12:45 PM - 1:00PM ,15 mins ",
  },
  {
    patientId: "1232",
    attendedPatient: "john",
    callDuration: "12:45 PM - 1:00PM ,15 mins ",
  },
  {
    patientId: "1232",
    attendedPatient: "john",
    callDuration: "12:45 PM - 1:00PM ,15 mins ",
  },
  {
    patientId: "1232",
    attendedPatient: "john",
    callDuration: "12:45 PM - 1:00PM ,15 mins ",
  },
  {
    patientId: "1232",
    attendedPatient: "john",
    callDuration: "12:45 PM - 1:00PM ,15 mins ",
  },
  {
    patientId: "1232",
    attendedPatient: "john",
    callDuration: "12:45 PM - 1:00PM ,15 mins ",
  },
];
const History = () => {
  const [openForm, setOpenForm] = useState(false);
  const { details, getArrOfObj } = useAppcontext();
  useEffect(() => {
    getArrOfObj("healthrecord", {
      api_key: "get_healthrecord_doc_consul",
      data: { p_id: 6 },
    });
  }, []);
  if (!details) {
    return;
  }

  return (
    <Wrappers>
      <div className="table-container">
        <table className="doctor-heading">
          <thead>
            <tr>
              <th> Sl.No </th>
              <th> Patient Id </th>
              <th> Recorded For </th>
              <th> Recorded Date </th>
              <th> Recorded Name</th>
              <th> Prescribed By </th>
            </tr>
            {details.map((item) => {
              const {
                s_no,
                patient_id,
                record_for,
                record_date,
                record_name,
                record_prescribed_by,
              } = item;
              return (
                <tr>
                  <td>{s_no}</td>
                  <td>{patient_id}</td>
                  <td> {record_for} </td>
                  <td></td>
                  <td>{formatDate(record_date)}</td>
                  <td> {record_date} </td>
                  <td> {record_name} </td>
                  <td> {record_prescribed_by} </td>
                </tr>
              );
            })}
          </thead>
        </table>
      </div>
      <button onClick={() => setOpenForm(true)} className="btn-green">
        ADD PRESCRIPTION
      </button>
      {openForm ? <PrescriptionForm setOpenForm={setOpenForm} /> : null}
    </Wrappers>
  );
};

export default History;
