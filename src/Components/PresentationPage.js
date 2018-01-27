import React, { Component } from 'react';
import Link from 'react-router-dom/Link';
import 'bootstrap/dist/css/bootstrap.css';
import { Button } from 'reactstrap';

class PresentationPage extends Component {
    render() {
        return (
            <div>
                <p className="lead text-center"><b>DiDooB</b> est un clone de <a target="blank" href="https://doodle.com">Doodle</a> qui fonctionne sur 
                    les réseaux <a target="blank" href="https://fr.wikipedia.org/wiki/Ethereum">Ethereum</a>.</p>
                  
                  <p className="text-justify text-muted">
                  Vous pouvez vous en servir pour mettre en place un système décentralisé et sécurisé 
                  de planification de réunion. DiDoob a été conçu pour un projet scolaire et a donc une vocation pédagogique. 
                  Mais, rien n'empêche son utilisation dans un contexte professionnel.
                  C'est juste un Doodle sans "middleman", l'inconvénient par contre, c'est que ce sera cher payé pour planifier un match de foot entre amis.
                  </p>
                  <p style={{marginTop : '3em'}} className="lead text-center">
                    <Link to="/new"><Button><b>Comment ça marche ?</b></Button></Link>
                  </p>
            </div>
        );
    }
}

export default PresentationPage;