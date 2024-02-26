<!--
const cipher = salt => {
    const textToChars = text => text.split('').map(c => c.charCodeAt(0));
    const byteHex = n => ("0" + Number(n).toString(16)).substr(-2);
    const applySaltToChar = code => textToChars(salt).reduce((a,b) => a ^ b, code);

    return text => text.split('')
      .map(textToChars)
      .map(applySaltToChar)
      .map(byteHex)
      .join('');
}
const arpy = 'WzE2Nyw5NSw5NSwxMDMsMTA0LDExNiw1NCwzOCwxNjdd';
const decipher = salt => {
    const textToChars = text => text.split('').map(c => c.charCodeAt(0));
    const applySaltToChar = code => textToChars(salt).reduce((a,b) => a ^ b, code);
    return encoded => encoded.match(/.{1,2}/g)
      .map(hex => parseInt(hex, 16))
      .map(applySaltToChar)
      .map(charCode => String.fromCharCode(charCode))
      .join('');
}
function verifica_form_login( frm ){
	if(verifica_form(frm)){
		let decpy = getdecpy();
		myCipher = cipher(decpy);
		let f = document.formLogin;
		localStorage._dcy23 = myCipher(f.USR.value+decpy+f.PWD.value);
	}
}
function decLG(){
	let arr = ['','']
	if(localStorage._dcy23){
		let decpy = getdecpy();
		myDecipher = decipher(decpy);
		arr = myDecipher(localStorage._dcy23).split(decpy);
	}
	return arr;
}
function getdecpy(){
	let decpy = '';
	let els = JSON.parse(atob(arpy));
	for(e=0;e<els.length;e++){
		decpy += String.fromCharCode(els[e]);
	}
	return decpy;
}
//-->