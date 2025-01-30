import React from "react";
import { IoClose } from "react-icons/io5";
import "./DeleteModalComponent.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteLink } from "../../redux/slices/linkSlice";
import { useNavigate } from "react-router-dom";
import { deleteAccount, logout } from "../../redux/slices/authSlice";

function DeleteModalComponent({ link, type, onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userData } = useSelector((state) => state.auth);
  const handleDeleteAccount = () => {
    dispatch(deleteAccount(userData._id)).then(() => {
      dispatch(logout());
      navigate("/signup");
    });
  };

  return (
    <div className="delete-modal-component">
      <IoClose className="dmc-close" onClick={() => onClose()} />
      <p>
        {type === "link"
          ? "Are you sure, you want to remove it ?"
          : " Are you sure, you want to delete the account ? "}
      </p>
      <div className="dmc-btns">
        <button onClick={() => onClose()}>NO</button>
        <button
          onClick={() => {
            if (type === "link") {
              dispatch(deleteLink(link._id));
            } else if (type === "account") {
              handleDeleteAccount();
            }
            onClose();
          }}
        >
          YES
        </button>
      </div>
    </div>
  );
}

export default DeleteModalComponent;
