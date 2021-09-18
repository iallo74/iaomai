<!--

/*
---------------------------------------------------------------------
----- VALIDATORE GENERICO DI FORM (v. 1.0.1) 14 maggio 2006 ---------
----- www.androgino.it ----------------------------------------------
---------------------------------------------------------------------
-------------------------------------------- Christian Iallonardi ---
-------------------------------------------- c.iallo@androgino.it ---
---------------------------------------------------------------------
 
SPECIFICHE di verifica_form:
Suddivisione dell'id dell'elemento del form:
l'id deve essere suddiviso in valori dal segno |

0) @ indica che l'elemento deve essere controllato
1) [testo] indica il nome visualizzato nell'alert
2) [numero] indica il numero minimo di caratteri che il campo può contenere (0 esclude il controllo)
3) [numero] indica il numero massimo di caratteri che il campo può contenere (si usa per textarea perché i campi text hanno già il controllo inserito)
4) [testo] indica il nome di una funzione da richiamare per un controllo particolare (es. validazione email). Se si inserisce di nuovo il carattere @ viene automaticamente validato come email. Se si inserisce "num" viene automaticamente validato come numero. Se si inserisce "int" viene validato come numero ntero


*/
function ControllaMail(frmMail,NCampo){
	EmailAddr = frmMail.value;
	if (EmailAddr!=""){		
		Filtro = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-]{2,})+\.)+([a-zA-Z0-9]{2,})+$/;
		if (Filtro.test(EmailAddr)) return true;
		else{
			ALERT(Lingua(TXT_ATTENZIONE)+"! "+Lingua(TXT_erroreFormatoEmail).replace("[1]"," '"+NCampo+"' "));
			frmMail.focus();
			return false;
		}
	}else return true;
}
function ControllaNumero(frmNum,NCampo,nt){
	NumVal = frmNum.value;
	if (frmNum.value.length>0){		
		if(!nt){
			//Filtro = /[^\d\.,-]+/;
			Filtro = /^[\d]+[\.,]{0,1}[\d]*$/;
			add='';
		}else{
			Filtro = /[\d]+/;
			add=" "+Lingua(TXT_numeriInteri);
		}
		if (Filtro.test(NumVal)) return true;
		else{
			ALERT(Lingua(TXT_ATTENZIONE)+" "+Lingua(TXT_campoNumerici).replace("[1]"," '"+NCampo+"' ")+add);
			frmNum.focus();
			return false;
		}
	}else return true;
}
function ControllaTelefono(frmNum,NCampo,cell){
	var cell = __(cell);
	NumVal = frmNum.value;
	if (frmNum.value.length>0){		
		if(!cell)Filtro = /[\d\+\.\s]+/;
		else Filtro = /\+[\d\.\s]*/;
		add=" "+Lingua(TXT_numeriInteri);
		if (Filtro.test(NumVal)) return true;
		else{
			ALERT(Lingua(TXT_ATTENZIONE)+" "+Lingua(TXT_campoNumerici).replace("[1]"," '"+NCampo+"' ")+add);
			frmNum.focus();
			return false;
		}
	}else return true;
}
function ArrotondaEuro(num){
	aggiunta=0;
    NumCar = num+'';
    punt = NumCar.indexOf(".");
    if (punt > 0) {
      nuovoCar = NumCar.substr(punt+1, NumCar.length-(punt+1));
	  car1 = parseInt(("0"+""+nuovoCar.substr(0, 1))*1);
      car2 = parseInt(("0"+nuovoCar.substr(1, 1))*1);
      car3 = ("0"+nuovoCar.substr(2, 1))*1;
	   	if (car3+0 > 4){
            car2+=1;
        }
        if (car2+0 > 9){
            car2=0;
            car1+=1;
        }
		
	    if (car1+0 > 9){
            car1=0;
            aggiunta=1;
        }
		return (parseInt(NumCar.substr(0, punt)) +0+ aggiunta)+','+car1+car2;
		
  	}else{
		return num+",00";
	}
}
function verifica_form(frm){
	for (k=0; k<frm.elements.length; k++){
		ver_id=frm.elements[k].id;
		ver_type=frm.elements[k].type;
		ver_name=frm.elements[k].name;
		ver_value=frm.elements[k].value;
		ver_parti=ver_id.split("|");
		ver_contr=false;
		ver_etichetta='';
		ver_lMin=0;
		ver_lMax=100000;
		ver_funzione='';
		if (ver_parti.length>0) ver_contr=(ver_parti[0]=="@"); // controllo che sia da verificare
		if (ver_parti.length>1) ver_etichetta=ver_parti[1];
		if (ver_parti.length>2) ver_lMin=ver_parti[2];
		if (ver_parti.length>3) ver_lMax=ver_parti[3];
		if (ver_parti.length>4) ver_funzione=ver_parti[4];
		if (ver_contr){
			if (ver_type=="text" || ver_type=="textarea" || ver_type=="hidden" || ver_type=="password"){ // se è un testo
				if(ver_value.length<ver_lMin){
					if(ver_lMin>1)ALERT(Lingua(TXT_lunghezzaMinCampo).replace("[1]","'"+ver_etichetta+"' ").replace("[2]"," "+ver_lMin).replace("[3]"," "+ver_value.length));
					else ALERT(Lingua(TXT_inserireValore).replace("[1]"," '"+ver_etichetta+"' "));
					if (ver_type!="hidden")frm.elements[k].focus();
					return false;
				}
				if(ver_value.length>ver_lMax && ver_lMax>0){
					ALERT(Lingua(TXT_lunghezzaMaxCampo).replace("[1]","  '"+ver_etichetta+"'  ").replace("[2]"," "+ver_lMax+" ").replace("[3]","  "+ver_value.length));
					frm.elements[k].focus();
					return false;
				}
			}
			if (ver_type=="select-one"){ // se è un testo
				if(frm.elements[k].selectedIndex==0){
					ALERT(Lingua(TXT_selezionareValore).replace("[1]"," '"+ver_etichetta+"' "));
					frm.elements[k].focus();
					return false;
				}
			}
			if (ver_type=="checkbox"){ // se è un testo
				if(!frm.elements[k].checked){
					ALERT(Lingua(TXT_selezionareCasella).replace("[1]"," '"+ver_etichetta+"' "));
					frm.elements[k].focus();
					return false;
				}
			}
			ret=false;
			if (ver_funzione!=''){
				if(ver_funzione=="@") ret=ControllaMail(frm.elements[k],ver_etichetta);
				if(ver_funzione=="num") ret=ControllaNumero(frm.elements[k],ver_etichetta,false);
				if(ver_funzione=="int") ret=ControllaNumero(frm.elements[k],ver_etichetta,true);
				if(ver_funzione=="tel") ret=ControllaTelefono(frm.elements[k],ver_etichetta);
				if(ver_funzione=="cell") ret=ControllaTelefono(frm.elements[k],ver_etichetta,true);
				if(ver_funzione!="@" && ver_funzione!="num" && ver_funzione!="int" && ver_funzione!="tel")ret=eval(ver_funzione);
				if(!ret) return false;
			}
		}
	}
	return true;
}
//-->