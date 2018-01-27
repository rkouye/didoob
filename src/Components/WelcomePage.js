import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';


const ParticleNetwork = window.ParticleNetwork;

class WelcomePage extends Component {
 
    render() {
        let options = {
            particleColor: '#000',
            background : '#ecf0f1',
            interactive: false,
            speed: 'fast',
            density: 'low'
        };


        const style_container = {
            height : '100%',
            width : '100%',
        };

        const style_wrapper = {
            minHeight : '300px',
            height : '50vh',
            width : '100%',
            position : 'absolute',
            zIndex : '-10',
            top : '0'
        };

        const style_page = {
            minHeight : '300px',
            height : '50vh',
            width : '100%',
            paddingTop : '12vh',
            
        };

        const style_header = {
            fontSize : '10vw'
        }

        return (
            <div style={style_page}>
                <div style={style_wrapper}>
                    <div style={style_container} ref={ container => container?new ParticleNetwork(container, options):false }></div>
                </div>
                <h1 style={style_header} className="display-1 text-center"><a href="/" style={{textDecoration : 'none', color : 'black'}}>DiDooB</a></h1>
                    <p className="lead text-center">
                        <b>D</b>idoob <b>i</b>s <b>Do</b>odle <b>o</b>n <b>B</b>lockchain 
                </p>
            </div>
        );
    }
}

export default WelcomePage;