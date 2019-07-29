import ReactModal from "react-modal";
import React from "react";
import DistrictDetails from "../DistrictDetails/DistrictDetails";

const DistrictDetailsModal = ({selectedArea, deselectArea}) => {
    return <ReactModal
        isOpen={selectedArea != null}
        onRequestClose={deselectArea}
        style={{
            content: {
                top: '5%',
                left: '20%',
                right: '20%',
                bottom: 'auto',
            }
        }}
    >
        <DistrictDetails name={selectedArea}/>
    </ReactModal>
};

export default DistrictDetailsModal;