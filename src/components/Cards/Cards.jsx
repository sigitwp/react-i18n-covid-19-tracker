import React from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import CountUp from "react-countup";
import cx from "classnames";
import moment from "moment";
import { withTranslation } from 'react-i18next';

import styles from "./Cards.module.css";

const Cards = ({ data: { confirmed, recovered, deaths, lastUpdate }, isId, t }) => {
    if (!confirmed) {
        return "Loading..";
    }
    const lastUpdateIndo = (date) => {
        const d = new Date(date);
        const monthIndo = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
        const dayIndo = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"];
        return ` ${dayIndo[d.getDay()]}, ${d.getDate()} ${monthIndo[d.getMonth()]} ${d.getFullYear()} pukul ${d.getHours()}.${d.getMinutes()}`;
    }

    return (
        <div className={styles.container}>
            <div>
                <Typography paragraph variant="body2" color="textSecondary">
                    <i>{t('status.lastUpdate')}:
                        <b>
                            {isId ? lastUpdateIndo(lastUpdate) : moment(new Date(lastUpdate)).format(' dddd, MMMM DD, YYYY hh:mm A')}
                        </b>
                    </i>
                </Typography>
            </div>
            <Grid container spacing={3} justify="center">
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.infected)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom><b>{t('status.confirmed')}</b></Typography>
                        <Typography variant="h5" className={styles.confirmed_value}>
                            <CountUp start={0} end={confirmed.value} duration={2.5} separator="." />
                        </Typography>
                        <Typography variant="body2">{t('status.confirmed-desc')}</Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.recovered)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom><b>{t('status.recovered')}</b></Typography>
                        <Typography variant="h5" className={styles.recovered_value}>
                            <CountUp start={0} end={recovered.value} duration={2.5} separator="." />
                        </Typography>
                        <Typography variant="body2">{t('status.recovered-desc')}</Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.deaths)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom><b>{t('status.deaths')}</b></Typography>
                        <Typography variant="h5" className={styles.deaths_value}>
                            <CountUp start={0} end={deaths.value} duration={2.5} separator="." />
                        </Typography>
                        <Typography variant="body2">{t('status.deaths-desc')}</Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </div>
    )
}

export default withTranslation('common')(Cards);