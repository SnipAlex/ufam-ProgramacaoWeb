function grafico()
{
    let largura = document.getElementById('l1').value;
    let altura1 = document.getElementById('b1').value;
    let altura2 = document.getElementById('b2').value;
    let altura3 = document.getElementById('b3').value;
    let altura4 = document.getElementById('b4').value;
    let altura5 = document.getElementById('b5').value;
    
    let qua1 = document.getElementById("q1");
    let qua2 = document.getElementById("q2");
    let qua3 = document.getElementById("q3");
    let qua4 = document.getElementById("q4");
    let qua5 = document.getElementById("q5");
    // qua1.style.setProperty("height", altura1);
    
    qua1.style.width = qua2.style.width = qua3.style.width = qua4.style.width = qua5.style.width = largura + "px"

    qua1.style.height = altura1 + "px"
    qua2.style.height = altura2 + "px"
    qua3.style.height = altura3 + "px"
    qua4.style.height = altura4 + "px"
    qua5.style.height = altura5 + "px"
}