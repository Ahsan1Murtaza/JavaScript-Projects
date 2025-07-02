
const result_area = document.getElementById("result");

document.getElementById("getUnicode").addEventListener('click', showUnicode);


function showUnicode(){
    const input_field = document.getElementById("inputArea").value;

    if (input_field.length === 0){
        result_area.textContent = "Plz Enter character";
    }

    const value = input_field.codePointAt(0);

    result_area.textContent = `The Unicode of ${input_field} : ${value}`;

}