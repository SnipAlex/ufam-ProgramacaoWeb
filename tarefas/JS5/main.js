function DuasCoisas()
{
    let raio = document.querySelector('#num').value
    
    let areaCalculo = (3.14 * (raio*raio)).toFixed(2)
    let circunferenciaCalculo = (2*3.14*raio).toFixed(2)
    
    console.log("Area " + areaCalculo)
    console.log("Circunferencia " + circunferenciaCalculo)
    
    document.getElementById("area").value = areaCalculo
    document.getElementById("circunf").value = circunferenciaCalculo
}