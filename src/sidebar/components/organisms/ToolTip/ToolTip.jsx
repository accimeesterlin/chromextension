import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../../../common/styles';
import Tooltip from '@material-ui/core/Tooltip';


class TooltipComponent extends React.Component {


    render() {

        const { title, children } = this.props;

        return (
            <div className="tooltip">
                <Tooltip title={title}>
                    {children}
                </Tooltip>
            </div>
        )
    }
}
export default withStyles(styles)(TooltipComponent);



