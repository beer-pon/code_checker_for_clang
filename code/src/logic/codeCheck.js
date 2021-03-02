/**
 * codeCheckjs
 * コードのチェックを行い、エラーメッセージを返す
 * 
 * retrun object 
 * {
 *     number:number,   // コードの行数
 *     code:"",         // コード内容
 *     errorMsg:"",     // エラー内容
 *     warningMsg:"",   // 警告内容
 * }
 */

export function codeCheck(lines) {
    var codes = exchangeCodeObjects(lines);
    for(var code of codes){
        lineCheck(code);
    }
    return codes;
}

function exchangeCodeObjects(lines){
    var codes =[];
    for(let i = 0; i < lines.length; i++) {
        codes.push(exchangeCodeObject(i + 1,lines[i]));
    }
    return codes;
}
function exchangeCodeObject(number,line){
    return {
        number:number,
        code:line,
        errorMsg:"",
        warningMsg:""
    }
}
function lineCheck(code) {
    if(code.number % 9 == 0){
        code.errorMsg = "error";
    }
}