import React from 'react'

import { Fab } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    numeroDefault: {
        background: '#c2c2c4',
        color: '#000'
    },
    numeroSelecionado: {
        background: '#8d24af',
        color: '#fff'
    }
});

export default function Numero({ numero, selecionado, seleciona, size }) {
    const classes = useStyles();

    let classe = classes.numeroDefault;

    if (selecionado) {
        classe = classes.numeroSelecionado;
    }

    return (
        <Fab className={classe} size={size} onClick={() => seleciona(numero)}>
            {numero}
        </Fab>
    )
}