/*
    Materialize Cusom Built in Functions
    Expand as more attributes needed
*/
export const styles = theme => ({
    arrowPopper: arrowGenerator(theme.palette.grey[700]),
    arrow: {
        position: 'absolute',
        fontSize: 7,
        width: '3em',
        height: '3em',
        marginRight: 'auto',
        marginLeft: 'auto',
        '&::before': {
            content: '""',
            margin: '0 auto',
            display: 'block',
            width: 0,
            height: 0,
            borderStyle: 'solid',
        },
    },
});

export function arrowGenerator(color) {
    return {
        '&[x-placement*="bottom"] $arrow': {
            top: 0,
            left: 0,
            marginTop: '-0.5em',
            width: '3em',
            height: '1em',
            '&::before': {
                borderWidth: '0 1em 1em 1em',
                borderColor: `transparent transparent ${color} transparent`,
            },
        }
    };
}