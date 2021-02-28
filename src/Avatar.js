import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { blue } from '@material-ui/core/colors';
const useStyles = makeStyles((theme) => ({
    blue: {
        color: theme.palette.getContrastText(blue[500]),
        backgroundColor: blue[500],
    },
}));

export default function LetterAvatars() {
    const classes = useStyles();

    return ( < Avatar className = { classes.blue } > App </Avatar>

    );
}