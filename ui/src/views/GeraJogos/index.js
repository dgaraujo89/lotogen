import React, { useState } from 'react'

import { Container, Grid, Paper, Button, TextField, Backdrop, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import Numero from './Numero';
import SnackbarAlert from '../components/SnackbarAlert';
import Sorteador from '../../services/sorteador'
import PainelJogos from './PainelJogos';

const useStyles = makeStyles(theme => ({
    spacing: {
        margin: theme.spacing(1),
    },
    painelNumbers: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    sessao: {
        padding: '10px',
        paddingBottom: '20px',
        marginBottom: '20px'
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const TAMANHO_LISTA_NUMEROS = 25;

const numeros = [];
for (var i = 0; i < TAMANHO_LISTA_NUMEROS; i++) numeros[i] = i + 1;

export default function GeraJogos() {
    const classes = useStyles();

    const [selecionados, setSelecionados] = useState([]);
    const [quantidadeNumeros, setQuantidadeNumeros] = useState(15);
    const [quantidadeJogos, setQuantidadeJogos] = useState(1);
    const [tamanhoJogo, setTamanhoJogo] = useState(15);
    const [alertMessage, setAlertMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const [jogos, setJogos] = useState([])

    const verificaSelecionado = (numero) => {
        return selecionados.filter(selecionado => numero === selecionado).length > 0
    }

    const selecionaNumero = (numero) => {
        var indice = selecionados.indexOf(numero);

        if (indice > -1) {
            selecionados.splice(indice, 1);
        } else {
            selecionados.push(numero);
        }

        setSelecionados([...selecionados]);
        setQuantidadeNumeros(selecionados.length)
    }

    const alteraQtdeNumeros = (quantidade) => {
        setSelecionados([]);
        setQuantidadeNumeros(quantidade)
    }

    const handlerSortearNumeros = () => {
        setLoading(true)

        if (quantidadeNumeros > 25) {
            setAlertMessage("Informe no maxímo 25 números")
            return
        }

        var nums = Sorteador.gerarNumeros(quantidadeNumeros, TAMANHO_LISTA_NUMEROS)

        setSelecionados(nums)
        setLoading(false)
    }

    const handlerGerarJogos = () => {
        if (tamanhoJogo < 15) {
            setAlertMessage("O tamanho mínimo de um jogo é de 15 números")
            return
        }

        if (selecionados.length < 15) {
            setAlertMessage("Você deve selecionar ao menos 15 números")
            return
        }

        if (quantidadeJogos < 1) {
            setAlertMessage("A quantidade mínima de jogos é 1")
            return
        }

        if(quantidadeJogos > 1 && selecionados.length === 15) {
            setAlertMessage("Para gerar mais de 1 jogo você deve selecionar mais de 15 números")
            return
        }

        setLoading(true)

        var jogos = Sorteador.gerarJogos(quantidadeJogos, tamanhoJogo, selecionados)
        setJogos(jogos)

        setLoading(false)
    }

    return (
        <>
            <SnackbarAlert
                message={alertMessage}
                open={alertMessage.length > 0}
                onClose={() => setAlertMessage("")}
            />

            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>

            <Container>

                <Paper className={classes.sessao} elevation={3}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <h2>Selecione os números:</h2>
                        </Grid>

                        <Grid item xs={12} className={classes.painelNumbers}>
                            {numeros.map(numero =>
                                <Numero
                                    key={numero}
                                    size="small"
                                    numero={numero}
                                    selecionado={verificaSelecionado(numero)}
                                    seleciona={selecionaNumero} />
                            )}
                        </Grid>
                    </Grid>

                    <Grid container spacing={3} style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                        <Grid item xs={4} style={{ display: 'flex', alignItems: 'center' }}>
                            <TextField
                                size="small"
                                label="Quantidade Números"
                                variant="outlined"
                                type="number"
                                value={quantidadeNumeros}
                                onChange={evt => alteraQtdeNumeros(evt.target.value)} />&nbsp;

                            <Button color="primary" variant="contained" onClick={handlerSortearNumeros}>
                                Gerar Números
                            </Button>
                        </Grid>
                        <Grid item xs={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                            <TextField
                                size="small"
                                label="Tamanho Jogo"
                                variant="outlined"
                                type="number"
                                value={tamanhoJogo}
                                onChange={evt => setTamanhoJogo(evt.target.value)} />&nbsp;

                            <TextField
                                size="small"
                                label="Quantidade Jogos"
                                variant="outlined"
                                type="number"
                                value={quantidadeJogos}
                                onChange={evt => setQuantidadeJogos(evt.target.value)} />&nbsp;

                            <Button color="primary" variant="contained" onClick={handlerGerarJogos}>
                                Gerar Jogos
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>

                <Paper className={classes.sessao} elevation={3}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <h2>Jogos</h2>
                        </Grid>
                    </Grid>

                    <PainelJogos jogos={jogos} />
                </Paper>
            </Container>
        </>
    );
}