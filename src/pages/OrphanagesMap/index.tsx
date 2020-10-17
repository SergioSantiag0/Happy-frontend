import React, { useEffect, useState } from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'
import Leaflet from 'leaflet';

import mapMarkerImg from '../../images/map-marker.svg'

import { Container, CreateOrphanageButton, PopupStyled } from './styles'
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import api from '../../services/apiClient';

const mapIcon = Leaflet.icon({
    iconUrl: mapMarkerImg,
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [170, 2]
})

interface Orphanage {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}

const OrphanagesMap: React.FC = () => {
    const [orphanages, setOrphanages] = useState<Orphanage[]>([])

    useEffect(() => {
        api.get('orphanages').then(response => {
            setOrphanages(response.data)
        })
    }, [])


    return (
        <Container>
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy" />

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>

                <footer>
                    <strong>Manhuaçu</strong>
                    <span>Minas Gerais</span>

                </footer>
            </aside>

            <Map
                center={[-20.264157, -42.0381939]}
                zoom={15}
                style={{ width: '100%', height: '100%' }}
            >
                <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />
                {orphanages.map(orphanage => (
                    <Marker key={orphanage.id} position={[orphanage.latitude, orphanage.longitude]} icon={mapIcon}>

                        <PopupStyled closeButton={false} minWidth={240} maxWidth={240}>
                            {orphanage.name}
                            <Link to={`orphanage/${orphanage.id}`}>
                                <FiArrowRight size={20} color="#fff" />
                            </Link>
                        </PopupStyled>
                    </Marker>
                ))}
            </Map>

            <CreateOrphanageButton to="/orphanages/create" >
                <FiPlus size={32} color="#fff" />
            </CreateOrphanageButton>
        </Container>
    )
}

export default OrphanagesMap;