
export default {
    gerarNumeros: function (quantidade, maximoNumeros) {
        var numeros = [];
        var numerosSorteados = [];
        
        for (var i = 1; i <= maximoNumeros; i++) {
            numeros.push(i)
        }

        while(numerosSorteados.length < quantidade) {
            var index = this.geraNumero(0, numeros.length - 1)
            numerosSorteados.push(numeros[index])
            numeros.splice(numeros.indexOf(numeros[index]), 1)
        }

        return numerosSorteados;
    },

    geraNumero: function (min, max) {
        var num = Math.random() * (max - min) + min;
        return num - (num % 1);
    },

    gerarJogos: function(quatidadeJogos, quantidadeNumeros, numerosSelecionados) {
        var jogos = [];
        
        var jogo = null;
        for(var i = 0; i < quatidadeJogos; i++) {
            do {
                jogo = this.gerarJogo(quantidadeNumeros, numerosSelecionados);
            } while(this.verificaJogoSorteado(jogo, jogos));

            jogos.push(jogo)
        }

        return jogos;
    },

    gerarJogo: function(quantidade, numerosSelecionados) {
        var numeros = [...numerosSelecionados]
        var jogo = []

        while(jogo.length < quantidade) {
            var numero = numeros[this.geraNumero(0, numeros.length - 1)]
            jogo.push(numero)
            numeros.splice(numeros.indexOf(numero), 1)
        }

        return jogo.sort((a, b) => {
            if(a < b) return -1;
            else if(a > b) return 1;
            return 0;
        });
    },

    verificaJogoSorteado: function(jogo, jogos) {
        return jogos.filter(j => 
            j.every((value, index) => value === jogo[index])
        ).length > 0
    }
}