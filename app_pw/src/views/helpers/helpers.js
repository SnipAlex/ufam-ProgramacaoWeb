export function showError(erros, field)
{
    let mensagem = '';
    if(errors) {
        errors.forEach((e) => {
            if(e.path === field) {
                mensagem += e.mensagem;
            }
        })
    }
    return mensagem;
}

export function isChecked(curso,value)
{
    if( curso && curso.areaId === value) return "checked";
    return "";
}