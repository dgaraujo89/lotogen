import React from 'react'
import { Grid, Fab } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Numero from './Numero';

const useStyles = makeStyles(theme => ({
    root: {
        paddingLeft: '10px',
        paddingRight: '10px',
    },
    ordemJogo: {
        display: 'flex',
        justifyContent: 'center',
    },
    numeros: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: '5px',
        marginBottom: '10px',
    },
    fundo1: {
        background: '#D5D5D5',
    },
    fundo2: {
        background: '#e8e8e8',
    },
}));

export default function PainelJogos({ jogos }) {
    const classes = useStyles();

    return (
        <Grid container spacing={3} className={classes.root}>
            {
                jogos.map((jogo, index) =>
                    <>
                        <Grid item xs={1} className={classes.ordemJogo}>
                            <Fab color="primary">{index + 1}</Fab>
                        </Grid>
                        <Grid
                            item
                            xs={11}
                            className={[classes.numeros, index % 2 === 0 ? classes.fundo1 : classes.fundo2]}
                            key={jogo}>
                            {
                                jogo.map(numero =>
                                    <Numero
                                        key={numero}
                                        numero={numero}
                                        selecionado={true}
                                        seleciona={_ => console.log()} />
                                )
                            }
                        </Grid>
                    </>
                )
            }
        </Grid>
    )
}