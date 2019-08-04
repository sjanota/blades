import ReactModal from "react-modal";
import React from "react";
import DistrictDetails from "../DistrictDetails/DistrictDetails";

const DistrictDetailsModal = ({district, onRequestClose}) => {
    return <ReactModal
        isOpen={district != null}
        onRequestClose={onRequestClose}
        style={{
            content: {
                top: '5%',
                left: '20%',
                right: '20%',
                bottom: 'auto',
            }
        }}
    >
        <DistrictDetails name={district}/>
    </ReactModal>
};

export default DistrictDetailsModal;