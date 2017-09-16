import React, {PureComponent} from 'react';

export default class ProjectInfo extends PureComponent {

  render() {
    const {info} = this.props;
    
    /*
    {
      "cartodb_id": 32,
      "liens": "data.gouv.fr",
      "producteur": "DGCL OPENSTREETMAP",
      "date": "2016",
      "source": "EPCI",
      "couverture_temporelle": "Depuis 2016",
      "couverture_geographique": "La Métro",
      "type_de_donnees": "A produire",
      "theme_1": "Eau",
      "theme_2": "",
      "theme_3": "",
      "theme_4": "",
      "projets_observatoires": "Climat Métro",
      "longitude": 5.7,
      "latitude": 45.14
    }
    */

    return (
      <div>
        <div>
          <h2>{info.projets_observatoires}</h2>
          <p>{info.producreur}</p>
          <p>Source: {info.source}</p>
          <p>Year: {info.date}</p>
          <p>Type: {info.type_de_donnees}</p>
        </div>
      </div>
    );
  }
}
