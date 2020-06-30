import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api";
import { Line, Bar } from "react-chartjs-2";
import { withTranslation } from 'react-i18next';

import styles from "./Chart.module.css";

const Chart = ({ data: { confirmed, recovered, deaths }, country, t }) => {
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            const initialDailyData = await fetchDailyData();
            setDailyData(initialDailyData);
        }

        fetchAPI();
    }, []);

    const lineChart = (
        dailyData.length
        ? (
        <Line
            data={{
                labels: dailyData.map(({ date }) => date),
                datasets: [{
                    data: dailyData.map(({ confirmed }) => confirmed),
                    label: t('status.confirmed'),
                    borderColor: "#ffa502",
                    fill: true,
                }, {
                    data: dailyData.map(({ deaths }) => deaths),
                    label: t('status.deaths'),
                    borderColor: "red",
                    backgroundColor: "rgba(255, 0, 0, 0.5)",
                    fill: true,
                }],
            }}
        />
        ) : null
    );

    const barChart = (
        confirmed
        ? (
            <Bar 
                data={{
                    labels: [t('status.confirmed'), t('status.recovered'), t('status.deaths')],
                    datasets: [{
                        label: t('status.people'),
                        backgroundColor: [
                            "#ffa502",
                            "green",
                            "red",
                        ],
                        data: [confirmed.value, recovered.value, deaths.value]
                    }]
                }}
                options={{
                    legend: { display: false },
                    title: { display: true, text: `${t('status.current-state')} ${country}` },
                }}
            />
        ) : null
    )

    return (
        <div className={styles.container}>
            {country ? barChart : lineChart}
        </div>
    )
}

export default withTranslation('common')(Chart);