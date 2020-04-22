import React, { Component } from 'react';
import styles from './App.module.css';
import { fetchData } from './api';
import covid from './images/cov.png';
import me from './images/me.jpeg';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';

import { Cards, Chart, CountryPicker } from './components';

class App extends Component {

    state = {
        data:{},
        country: '',
    }

    async componentDidMount() {
        const fetchedData = await fetchData();

        this.setState({ data: fetchedData });
    }

    handleCountryChange = async (country) => {
        const fetchedData = await fetchData(country);
        this.setState({ data: fetchedData, country: country });
    }

    portfolio(){
        const url = 'https://mauricemuthaka.co.ke';
        window.open(url, '_blank');
    }

    render() { 
        const { data, country } = this.state;

        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <img src={covid} className={styles.img} alt="COVID 19" />
                    <div className={styles.title}>
                        <h2 className={styles.h2}>COVID-19 LIVE TRACKER</h2>
                        <span className={styles.name}>developed by Maurice Muthaka</span>
                    </div>
                </div>
                <CountryPicker handleCountryChange ={this.handleCountryChange} />
                <Cards data={data} />
                <Chart data={data} country={country} />
                <Fab onClick={this.portfolio} color="primary" variant="extended" className={styles.menu} aria-label="add">
                    {<Avatar className={styles.avatar} alt="Mm" src={me} />}
                    My Portfolio
                </Fab>

            </div>
        );
    }
}
 
export default App;