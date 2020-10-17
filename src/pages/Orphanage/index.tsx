import React, { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import mapIcon from '../../utils/mapIcon';
import { useParams } from 'react-router-dom'

import Sidebar from '../../components/Sidebar'

import api from '../../services/apiClient';

import { Container, Content, OrphanageDetail, ImagesContent, ImageItem, OrphanageDetailContent, MapContainer, Divider, OpenDetails, Hour, OpenOnWeekends, ContactButton } from './styles';

interface Orphanage {

  latitude: number;
  longitude: number;
  name: string;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: string;
  images: Array<{
    id: string;
    url: string
  }>;
}

interface OrphanageParams {
  id: string;
}

const Orphanage = () => {
  const params = useParams<OrphanageParams>()
  const [orphanage, setOrphanage] = useState<Orphanage>();
  const [activeImageIndex, setActiveImageIndex] = useState(0)


  useEffect(() => {
    api.get(`orphanages/${params.id}`).then(response => {
      setOrphanage(response.data)
    })
  }, [params.id])

  if (!orphanage) {
    return <p>Carregando...</p>
  }

  return (
    <Container>
      <Sidebar />
      <Content>
        <OrphanageDetail>
          <img src={orphanage.images[activeImageIndex].url} alt={orphanage.name} />

          <ImagesContent>
            {orphanage.images.map((image, index) => {

              return (
                <ImageItem key={image.id} active={activeImageIndex === index} type="button" onClick={() => setActiveImageIndex(index)}>
                  <img src={image.url} alt={orphanage.name} />
                </ImageItem>
              )
            })}

          </ImagesContent>

          <OrphanageDetailContent>
            <h1>{orphanage.name}</h1>
            <p>{orphanage.about}</p>

            <MapContainer>
              <Map
                center={[orphanage.latitude, orphanage.longitude]}
                zoom={16}
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker interactive={false} icon={mapIcon} position={[orphanage.latitude, orphanage.longitude]} />
              </Map>

              <footer>
                <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}>Ver rotas no Google Maps</a>
              </footer>
            </MapContainer>

            <Divider />

            <h2>Instruções para visita</h2>
            <p>{orphanage.instructions}</p>

            <OpenDetails>
              <Hour>
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {orphanage.opening_hours}
              </Hour>
              {orphanage.open_on_weekends ? (
                <OpenOnWeekends>
                  <FiInfo size={32} color="#39CC83" />
                Atendemos <br />
                fim de semana
                </OpenOnWeekends>
              ) : (
                  <OpenOnWeekends dontOpen>
                    <FiInfo size={32} color="#FF669D" />
                Não atendemos <br />
                fim de semana
                  </OpenOnWeekends>
                )}
            </OpenDetails>

            <ContactButton type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </ContactButton>
          </OrphanageDetailContent>
        </OrphanageDetail>
      </Content>
    </Container>
  );
}

export default Orphanage;