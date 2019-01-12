import React from 'react';
import { AlarmAdd, InsertDriveFile, Assignment } from '@material-ui/icons';

import Tooltip from '../../organisms/ToolTip/ToolTip';

const UseFullLinks = ({ googleSheetUrl }) => {

    const tutorFormSheetUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSc_q0CSp5Bpn7lfDAdoPCbBTW-OxWQVhC3gG5P9e6iE4FERjw/viewform';
    return (
        <div className="useful-links">
            <Tooltip title='ADP URL'>
                <a href="https://workforcenow.adp.com" target="_blank"><AlarmAdd /> </a>
            </Tooltip>

            {googleSheetUrl ? <Tooltip title='Google Sheet URL'>
                <a href={googleSheetUrl} target="_blank"><InsertDriveFile /> </a>
            </Tooltip> : null}


            <Tooltip title='Tutor Form Sheet'>
                <a href={tutorFormSheetUrl} target="_blank"><Assignment /> </a>
            </Tooltip>
        </div>
    );
};
export default UseFullLinks;

