const TAM = 10

class IntegerSet
{
    constructor()
    {
        this.vet = []
        
        for(let i = 0; i < TAM; i++)
        {
            this.vet.push(false);
        }
        //this.verificaInt();
        this.deImprimi()
    }
    
    deImprimi()
    {
        console.log(this.vet)
    }
    
    AdicionaNoConjunto(num)
    {
        let tam = this.vet.length
        // So vai funcionar quando o vetor aumentar de tamanho.
        for(let i = tam; i < num; i++)
        {
            this.vet[i] = false
        }
        this.vet[num] = true; // Add o num no conjunto
    }

    insercao(num)
    {
        
    }

    exclusao(num)
    {

    }

    uniao(conjunto)
    {
        tempA = this.vet
        tempB = conjunto
        let novoConjunto = []
        novoConjunto = tempA.concat(tempB)
        novoConjunto = novoConjunto.filter(tempA)
        return novoConjunto;
    }
    
    intersecao(){}
    
    diferenca(){}
    
    converteStr(){}
}
asd = new IntegerSet()

asd.AdicionaNoConjunto(15)
asd.deImprimi()
asd.AdicionaNoConjunto(1)
asd.deImprimi()
asd.AdicionaNoConjunto(0)
asd.deImprimi()
// testar esse codigo