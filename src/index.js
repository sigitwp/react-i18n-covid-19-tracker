import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import {I18nextProvider} from 'react-i18next';
import i18next from 'i18next';

import common_id from "./translations/id/common.json";
import common_en from "./translations/en/common.json";

// i18next.init({
//     interpolation: { escapeValue: false },  // React already does escaping
// });
i18next.init({
    interpolation: { escapeValue: false },  // React already does escaping
    lng: 'en',                              // language to use
    resources: {
        en: {
            common: common_en               // 'common' is our custom namespace
        },
        id: {
            common: common_id
        },
    },
});

//ReactDOM.render(<App />, document.getElementById("root"));
ReactDOM.render(
    <I18nextProvider i18n={i18next}>
        <App/>
    </I18nextProvider>,
    document.getElementById('root')
);
