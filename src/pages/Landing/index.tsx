import React from 'react';
import { FiArrowRight } from 'react-icons/fi'

import logoImg from '../../images/Logo.svg';

import { Container, Content, Location, ButtonEnter } from './styles';

const Landing: React.FC = () => {
    return (
        <Container>
            <Content>
                <img src={logoImg} alt="Happy" />

                <main>
                    <h1>Leve felicidade para o mundo</h1>
                    <p>Visite orfanatos e mude o dia de muitas crianças.</p>
                </main>

                <Location>
                    <strong>Manhuaçu</strong>
                    <span>Minas Gerais</span>
                </Location>

                <ButtonEnter to="/app">
                    <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)" />
                </ButtonEnter>
            </Content>
        </Container>
    )
}

export default Landing;