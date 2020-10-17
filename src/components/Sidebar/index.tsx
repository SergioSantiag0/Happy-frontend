import React from 'react';

import { Aside } from './styles';

import { FiArrowLeft } from "react-icons/fi";

import mapMarkerImg from '../../images/map-marker.svg';
import { useHistory } from 'react-router-dom';

const Sidebar = () => {
    const { goBack } = useHistory();

    return (
        <Aside>
            <img src={mapMarkerImg} alt="Happy" />

            <footer>
                <button type="button" onClick={goBack}>
                    <FiArrowLeft size={24} color="#FFF" />
                </button>
            </footer>
        </Aside>
    )
}

export default Sidebar;