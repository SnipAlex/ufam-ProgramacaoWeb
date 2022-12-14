function counter(num)
{
    let cont = num
    return function()
    {
        cont++
        return cont
    }
}
let incrementar = counter(10)

console.log('Primeira chamada ' + incrementar());
console.log('Segunda chamada ' + incrementar());
console.log('Terceira chamada ' + incrementar());