
//criaTabela();
for (let i = 1; i <= 10; i++) {
    //document.write("<table><th colspan=2>Produto de "+ " " + i + "</th></table>")
    document.write("<table border=" +1 +" class="+"tabela"+String(i)+">")
    document.write('<th colspan=2>Produto de '+ ' ' + i + '</th>')
    for (let j = 1; j <= 10; j++) {
        
        let Istring = String(i);
        let Jstring = String(j);
        //document.write("<table><tr><td>"+Istring+"x"+Jstring+"</td> <td>"+(i*j)+"</td> </tr></table")
        document.write('<tr>')
        document.write("<td>" + Istring + "x" + Jstring + "</td>")
        document.write("<td>" + (i*j) + "</td>")
        document.write('</tr>')
    }
    document.write('</table>')
}