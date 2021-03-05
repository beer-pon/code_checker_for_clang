const checkRules = [];
const CHECK_TYPE = {
    ERROR:"error",
    WARNIGN:"wargning"
}

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
    if(checkRules.length == 0){
        setCheckRule();
    }
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
        warningMsg:"",
        checkStatus:{
            commnet:false,
        }
    }
}

function lineCheck(line) {
    if(commentChek(line.code)){
        line.checkStatus.comment = true;
        return;
    }
    for(let checkRule of checkRules){
        if(checkRule.check(line.code)){
            line.errorMsg = checkRule.getMsg();
        }
    }
}


/**
 *  一行コメントのチェック（//）or (¥/** **¥/)が一行
 **/
function commentChek(text) {
  // 空欄の後"//"もしくは”//” で始まる行
  if (null != text.match(/^\s*\/\//)) {
    return true;
  }
  // /* */ で閉じている行
  if (commentOutStartCheck(text) && commentOutEndCheck(text)) {
    return true;
  }
  return false;
}
/**
 *コメント (/*)の判定
 */
function commentOutStartCheck(text) {
  return null != text.match(/^\s*\/\*/);
}
/**
 * コメント終了判定
 * @param 
 */
function commentOutEndCheck(text) {
  return null != text.match(/.*\*\/$/);
}

function setCheckRule(){
    checkRules.push(new CheckRule(/[^\s]+;/,";の前の空白に空白がありません",CHECK_TYPE.ERROR));
    checkRules.push(new CheckRule(/[^\s]+[\s]*{/,"{より前に空白以外の文字があります",CHECK_TYPE.ERROR));
    checkRules.push(new CheckRule(/[^\s]+[\s]*}/,"}より前に空白以外の文字がある行",CHECK_TYPE.ERROR));
    checkRules.push(new CheckRule(/\([^\s]+/,"(の直後に空白がない",CHECK_TYPE.ERROR));
    checkRules.push(new CheckRule(/[^\s]+\)/,")の直前に空白がない",CHECK_TYPE.ERROR));
    checkRules.push(new CheckRule(/;\s*[^/\n\s]/,";以降にコメント以外がある。;以降に/以外で始まる文字がある行",CHECK_TYPE.ERROR));
    checkRules.push(new CheckRule(/return.*\(/,"returnの値を括弧で囲んでる",CHECK_TYPE.ERROR));
    checkRules.push(new CheckRule(/^\s*(int|char|long)(?!.*=).*$/,"宣言と同時に初期化されていないint/char/long ※配列まで考慮してない",CHECK_TYPE.ERROR));
}

class CheckRule {
    #checkRegex;
    #msg;
    #type;
    constructor(checkRegex, msg, type) {
      this.#checkRegex = checkRegex;
      this.#msg = msg;
      this.#type = type;
    }
    check(text){
        return null != text.match(this.#checkRegex);
    }
    getMsg(){
        return this.#msg;
    }
}