import React from "react";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAppcontext } from "../context/appContext";
import styled from "styled-components";

const Fileupload2 = () => {
  let patientId;
  if (typeof window !== "undefined") {
    patientId = localStorage.getItem("p_id");
  }
  const [selectedFile, setSelectedFile] = useState("");
  const [responseArray, setResponseArray] = useState([]);
  const router = useRouter();
  const queryId = router.asPath.split("?")[1];
  const pat_id = queryId ? queryId : patientId;
  const { imageData, getTestReport } = useAppcontext();
  useEffect(() => {
    getTestReport("healthrecord", {
      api_key: "get_diet_plan",
      p_id: pat_id,
    });
  }, []);
  console.log(imageData);

  const handleInputChange = (e) => {
    setSelectedFile(e.target.files);
    setResponseArray([]);
  };
  const resetFile = () => {
    // Reset file input control
    console.log(document.getElementById("file-select"));
    document.getElementById("file-select").value = null;
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please selcet a file ");
      return false;
    }
    try {
      let formData = new FormData();
      for (let i = 0; i < selectedFile.length; i++) {
        formData.append("file[]", selectedFile[i]);
      }
      formData.append("p_id", pat_id);

      let url = "http://doctor.brandimagetech.com/diet_upload.php";

      const { data } = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setResponseArray({ data });
      resetFile();
    } catch (error) {
      alert(error);
    }
  };
  if (!imageData) {
    return <h1>imageDAta no</h1>;
  }

  return (
    <Wrappers>
      <div className="reports-container">
        <div className="file-form">
          <label htmlFor="">Please submit Diet Plan</label>
          <form action="" type="submit">
            <input
              type="file"
              id="file-select"
              multiple
              onChange={handleInputChange}
            />
            <div>
              <button className="btn" onClick={(e) => onSubmit(e)}>
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="file-display">
          <table>
            {imageData.map((item) => {
              const urlData = window.atob(item);
              return (
                <tr>
                  <iframe
                    src={`http://doctor.brandimagetech.com/${urlData}`}
                    frameborder="0"
                  ></iframe>
                  <a
                    className="open-preview"
                    href={`http://doctor.brandimagetech.com/${urlData}`}
                    target="_blank"
                  >
                    Click
                  </a>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    </Wrappers>
  );
};
const Wrappers = styled.div`
  width: 700px;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  .file-form {
    margin-left: 4rem;
    margin-top: 2rem;
    position: absolute;
    top: 1rem;
    left: 20%;
  }
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
  }
  .btn {
    margin-top: 2rem;
    background-color: var(--primary-700);
    padding: 1rem 2rem;
    color: white;
  }
  .file-display {
    width: 600px;
    height: 200px;
    overflow: scroll;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .open-preview {
    margin-left: 7rem;
    margin-bottom: -2rem;
  }
  table {
    position: absolute;
    display: flex;
    flex-direction: row;
    top: 15rem;
    width: 300px;
    height: 200px;
    overflow: scroll;
  }
  @media (max-width: 480px) {
    width: 300px;
  }
`;
export default Fileupload2;
