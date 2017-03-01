import React, {Component} from "react";
import './App.css';
import axios from 'axios';
import Header from "./header/Header.jsx";
import Card from "./card/Card.jsx";

// mon code est sale , mais le json recuperer de l'api est problematique , ce n'est pas l'api officielle de la RATP

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            croixDeChavauxToMairie: [],
            croixDeChavauxToPdSevres: [],
            robespierreToMairie: [],
            robespierreToPdSevres: [],

        };
        // this.multipleFetch = this.multipleFetch.bind(this);

    }


    // multipleFetch(arr, dest) {
    //     Promise.all(arr.map(url => fetch(url)
    //       .then(resp => resp.json())))
    //       .then(resData => {
    //         this.setState({
    //           [dest]: resData
    //         })
    //     })
    // }

    componentDidMount() {

        // var urlsCroixdeChavaux =  ['https://api-ratp.pierre-grimaud.fr/v2/metros/9/stations/croix+de+chavaux?destination=pont+de+sevres',
        //                        'https://api-ratp.pierre-grimaud.fr/v2/metros/9/stations/croix+de+chavaux?destination=mairie+de+montreuil'];
        //
        // var urlsRobespierre =     ['https://api-ratp.pierre-grimaud.fr/v2/metros/9/stations/robespierre?destination=pont+de+sevres',
        //                        'https://api-ratp.pierre-grimaud.fr/v2/metros/9/stations/robespierre?destination=mairie+de+montreuil'];
        //
        // var urlsVincennes =       ['https://api-ratp.pierre-grimaud.fr/v2/rers/a/stations/vincennes?destination=1',
        //                           'https ://api-ratp.pierre-grimaud.fr/v2/rers/a/stations/vincennes?destination=2'];
        //
        // // this.multipleFetch(urlsVincennes , 'vincennes');
        // this.multipleFetch(urlsCroixdeChavaux , 'croixDeChavaux');
        // this.multipleFetch(urlsRobespierre , 'robespierre');

        axios.all([
  axios.get('https://api-ratp.pierre-grimaud.fr/v2/metros/9/stations/croix+de+chavaux?destination=pont+de+sevres') ,
  axios.get('https://api-ratp.pierre-grimaud.fr/v2/metros/9/stations/croix+de+chavaux?destination=mairie+de+montreuil') ,
  axios.get('https://api-ratp.pierre-grimaud.fr/v2/metros/9/stations/robespierre?destination=pont+de+sevres') ,
  axios.get('https://api-ratp.pierre-grimaud.fr/v2/metros/9/stations/robespierre?destination=mairie+de+montreuil')

])
.then(axios.spread((resCdv1 , resCdv2 , resRob1, resRob2  ) => {
  const robToSevres = resRob1.data.response.schedules;
  const robToMairie = resRob2.data.response.schedules;
  const cdvToSevres = resCdv1.data.response.schedules;
  const cdvToMairie = resCdv2.data.response.schedules;

  this.setState({
    croixDeChavauxToPdSevres : cdvToSevres  ,
    croixDeChavauxToMairie :  cdvToMairie ,
    robespierreToPdSevres :  robToSevres ,
    robespierreToMairie :  robToMairie

  })
}))
  .catch(err => {
    console.log('error fetching data' , err);
  });
    }


    render() {
      let rob2mairie = this.state.robespierreToMairie;
      this.rob2mairieSchedules = [];
      rob2mairie.map(el => this.rob2mairieSchedules.push(el.message));

      let rob2sevres = this.state.robespierreToPdSevres;
      this.rob2sevresSchedules = [];
      rob2sevres.map(el => this.rob2sevresSchedules.push(el.message));

      let cdv2mairie = this.state.croixDeChavauxToMairie;
      this.cdv2mairieSchedules = [];
      cdv2mairie.map(el => this.cdv2mairieSchedules.push(el.message));

      let cdv2sevres = this.state.croixDeChavauxToPdSevres;
      this.cdv2sevresSchedules = [];
      cdv2sevres.map(el => this.cdv2sevresSchedules.push(el.message));

      const robImg = 'http://i450.photobucket.com/albums/qq228/kerouac2/Montreuil/Montreuil114.jpg'
      const cdvImg = 'http://www.lecitronvertmontreuil.fr/sites/default/files/piece_jointe_mail.jpeg'

        return (
            <div className="App">
                <Header/>
                <div className="card-deck deck container">
                    <Card name='Robespierrre' direction='Marie de Montreuil' time1={this.rob2mairieSchedules[0]} time2={this.rob2mairieSchedules[1]}  time3={this.rob2mairieSchedules[2]} img={robImg}/>
                    <Card name='Robespierrre' direction='Pont de Sevres' time1={this.rob2sevresSchedules[0]} time2={this.rob2sevresSchedules[1]}  time3={this.rob2sevresSchedules[2]} img={robImg}/>
                </div>
                <div className="card-deck deck container">
                    <Card name='Croix de chavaux' direction='Marie de Montreuil' time1={this.cdv2mairieSchedules[0]} time2={this.cdv2mairieSchedules[1]}  time3={this.cdv2mairieSchedules[2]} img={cdvImg} />
                    <Card name='Croix de chavaux' direction='Pont de Sevres' time1={this.cdv2sevresSchedules[0]} time2={this.cdv2sevresSchedules[1]}  time3={this.cdv2sevresSchedules[2]} img={cdvImg}/>
                </div>

            </div>
        );
    }
}

export default App;
