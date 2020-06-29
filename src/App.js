import React from "react";
import { withTranslation } from 'react-i18next';

import { Cards, Chart, CountryPicker } from "./components";
import { fetchData } from "./api";
import styles from "./App.module.css";
import coronaImage from "./images/image.png";

const idLang = "Indonesia";

class App extends React.Component {
    state = {
        data: {},
        country: "",
        isId: false
    }

    async componentDidMount() {
        const fetchedData = await fetchData();
        this.setState({ data: fetchedData });
    }

    handleCountryChange = async (country) => {
        const fetchedData = await fetchData(country);
        const { i18n } = this.props;
        if(country === idLang ){
            i18n.changeLanguage('id');
            this.setState({ isId: true });
        }else{
            i18n.changeLanguage('en');
            this.setState({ isId: false });
        }
        this.setState({ data: fetchedData, country: country });
    }

    render() {
        const { data, country, isId } = this.state;
        return (
            <div className={styles.container}>
                <img className={styles.image} src={coronaImage} alt="COVID-19" />
                <h1 className={styles.title}>
                    { this.props.t('welcome.title') }
                </h1>
                <CountryPicker handleCountryChange={this.handleCountryChange} />
                <Cards data={data} isId={isId} t={this.props.t} />
                <Chart data={data} country={country} />
            </div>
        )
    }
}

export default withTranslation('common')(App);