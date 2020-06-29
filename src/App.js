import React from "react";

import { Cards, Chart, CountryPicker } from "./components";
import styles from "./App.module.css";
import { fetchData } from "./api";
import { withTranslation } from 'react-i18next';

import coronaImage from "./images/image.png";

class App extends React.Component {

    state = {
        data: {},
        country: "",
    }

    async componentDidMount() {
        const fetchedData = await fetchData();
        
        this.setState({ data: fetchedData });
    }

    handleCountryChange = async (country) => {
        const fetchedData = await fetchData(country);

        this.setState({ data: fetchedData, country: country });
    }

    render() {
        const { data, country } = this.state;
        const { t, i18n } = this.props;
        console.log("#i18n: ", i18n);
        console.log("#i18n.language: ", i18n.language);
        return (
            <div className={styles.container}>

                <h1 className="App-title">
                    { this.props.t('welcome.title') }
                </h1>

                <div>
                    <button onClick={() => i18n.changeLanguage('id')}>id</button>
                    <button onClick={() => i18n.changeLanguage('en')}>en</button>
                </div>

                <img className={styles.image} src={coronaImage} alt="COVID-19" />
                <Cards data={data} />
                <CountryPicker handleCountryChange={this.handleCountryChange} />
                <Chart data={data} country={country} />
            </div>
        )
    }
}

//export default App;
export default withTranslation('common')(App);