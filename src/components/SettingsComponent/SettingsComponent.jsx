import React, { useState, useEffect } from "react";
import "./SettingsComponent.css";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateUserData } from "../../redux/slices/authSlice";
import Modal from "../Modal/Modal";
import DeleteModalComponent from "../DeleteModal/DeleteModalComponent";

function SettingsComponent() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
    const openModal = () => {
      setIsModalOpen(true);
    };
    const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (userData) {
      setName(userData?.name || "");
      setEmail(userData?.email || "");
      setMobileNo(userData?.mobileno || "");
    }
  }, [userData]);

  const handleSubmit = () => {
    const updatedFields = {};
    if (name !== userData.name) {
      updatedFields.name = name;
    }
    if (email !== userData.email) {
      updatedFields.email = email;
    }
    if (mobileNo !== userData.mobileno) {
      if (!/^\d{10,}$/.test(mobileNo)) {
        toast.error(
          "Mobile number must be at least 10 digits and contain only numbers"
        );
        return;
      }
      updatedFields.mobileno = mobileNo;
    }

    if (Object.keys(updatedFields).length > 0) {
      dispatch(updateUserData(updatedFields));
    } else {
      toast.error("No changes detected.");
    }
  };

  return (
    <div className="settings-component">
      <div className="sc-form">
        <div className="scf-fields">
          <div className="scf-field">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="scf-field">
            <label>Email id</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="scf-field">
            <label>Mobile no.</label>
            <input
              type="tel"
              value={mobileNo}
              onChange={(e) => setMobileNo(e.target.value)}
            />
          </div>
        </div>
        <div className="scf-btns">
          <button onClick={handleSubmit}>Save Changes</button>
          <button onClick={() => openModal()}>Delete Account</button>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <DeleteModalComponent
          type="account"
          onClose={closeModal}
        />
      </Modal>
    </div>
  );
}

export default SettingsComponent;
