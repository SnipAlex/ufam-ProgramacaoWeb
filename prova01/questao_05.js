class Venda
{
    constructor(ID_produto, qtd_produto, preco_produto)
    {
        this.ID_produto = ID_produto
        this.qtd_produto = qtd_produto
        this.preco_produto = preco_produto
    }

    getID()
    {
        return this.ID_produto
    }

    setID(num)
    {
        this.ID_produto = num
    }

    getQtd()
    {
        return this.qtd_produto
    }
    
    setQtd(num)
    {
        this.qtd_produto = num
    }

    getPreco()
    {
        return this.preco_produto
    }
    
    setPreco(num)
    {
        this.preco_produto = num
    }

    getValorTotal()
    {
        return (this.getQtd()*this.getPreco())
    }
}

a1 = new Venda(1,1,20)
a2 = new Venda(2,20,50)
console.log(a1.getValorTotal())
console.log(a2.getValorTotal())