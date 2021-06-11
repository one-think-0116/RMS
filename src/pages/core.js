const getNum = (str) => {
    if(typeof str === "string"){
        var num;
        if(str.indexOf(",") > -1){
          var str_arr = str.split(",");
          var tempStr = "";
          str_arr.map((item) => {
            tempStr += item;
          })
          num = parseFloat(tempStr)
        }else{
          num = parseFloat(str)
        }
        return num;
    }else
    {
        return str;
    }
    
  }
const cutDecimal = (data,limit,to) => {
    let numstr;
    let splitArray;
    let result;
    if(isNaN(data)){
        return null
    }else
    {
        if(typeof data === "string"){
            numstr = data;
        }else if(typeof data === "number"){
            numstr = data.toString();
        }else{
            return data;
        }
        if(numstr.indexOf(".") > -1){
            splitArray = numstr.split('.');
            if(splitArray[1].length > limit){
                result = Math.round(parseFloat(numstr)*Math.pow(10,limit))/Math.pow(10,limit);
                return to === "Number" ? result: result.toString();
            }else{
                return to === "Number" ? parseFloat(numstr): numstr 
            }
        }else{
            return to === "Number" ? parseFloat(numstr):numstr;
        }
    }
}
export const core = (formulasData,
                    calculatorData,
                    cashData = [],
                    feeData = [],
                    moduleData = [],
                    batteryData = [],
                    selfgenData = []) => {
                         //formulas logic-------------------------------------------------------------------------------------------------------
                        formulasData[3].A = parseFloat(formulasData[3].A);
                        formulasData[4].A = parseFloat(formulasData[4].A);
                        formulasData[3].B = parseFloat(formulasData[3].B);
                        formulasData[4].B = parseFloat(formulasData[4].B);
                        formulasData[3].D = parseFloat(formulasData[3].D);
                        formulasData[4].D = parseFloat(formulasData[4].D);
                        calculatorData.C10 = parseFloat(getNum(calculatorData.C10));
                        calculatorData.C11 = parseFloat(getNum(calculatorData.C11));
                        calculatorData.C15 = parseFloat(getNum(calculatorData.C15));
                        calculatorData.C16 = parseFloat(getNum(calculatorData.C16));
                        calculatorData.C17 = parseFloat(getNum(calculatorData.C17));
                        calculatorData.C18 = parseFloat(getNum(calculatorData.C18));
                        formulasData[3].C = formulasData[3].B / formulasData[3].A * 100;
                        formulasData[3].C = cutDecimal(formulasData[3].C,2,"Number");
                        formulasData[4].C = formulasData[4].B / formulasData[4].A * 100;
                        formulasData[4].C = cutDecimal(formulasData[4].C,2,"Number");
                        //E4=(D4+B4)/((A4/0.8))
                        formulasData[3].E = (parseFloat(formulasData[3].D) + parseFloat(formulasData[3].B))/(formulasData[3].A/0.8) *100;
                        formulasData[3].E = cutDecimal(formulasData[3].E,2,"Number");
                        //E5=(D5+B5)/((A5/0.8))
                        formulasData[4].E = (parseFloat(formulasData[4].D) + parseFloat(formulasData[4].B))/(formulasData[4].A/0.8) *100;
                        formulasData[4].E = cutDecimal(formulasData[4].E,2,"Number");
                        //H4,H5
                        formulasData[3].H = calculatorData.C10;
                        formulasData[3].H = cutDecimal(formulasData[3].H,2,"Number");
                        formulasData[4].H = calculatorData.C10;
                        formulasData[4].H = cutDecimal(formulasData[4].H,2,"Number");
                        //I4,I5 I4 = A4;I5 = A5;
                        formulasData[3].I = formulasData[3].A;
                        formulasData[3].I = cutDecimal(formulasData[3].I,2,"Number");
                        formulasData[4].I = formulasData[4].A;
                        formulasData[4].I = cutDecimal(formulasData[4].I,2,"Number");
                        //I6,I7 I6=I4/(1-CALCULATOR!$C$14) I7=I5/(1-CALCULATOR!$C$14)
                        formulasData[5].I = formulasData[3].I / (1 - parseFloat(calculatorData.C14.split("%"))/100);
                        formulasData[5].I = cutDecimal(formulasData[5].I,2,"Number");
                        formulasData[6].I = formulasData[4].I / (1 - parseFloat(calculatorData.C14.split("%"))/100);
                        formulasData[6].I = cutDecimal(formulasData[6].I,2,"Number");
                        //K4=if(CALCULATOR!$C$8="Mission 345",CALCULATOR!C11,0)
                        if(calculatorData.C8 === "Mission 345") formulasData[3].K = calculatorData.C11;
                        else formulasData[3].K = 0;
                        formulasData[3].K = cutDecimal(formulasData[3].K,2,"Number");
                        //K5=if(CALCULATOR!$C$8="REC 370",CALCULATOR!$C$11,0)
                        if(calculatorData.C8 === "REC 370") formulasData[4].K = calculatorData.C11;
                        else formulasData[4].K = 0;
                        formulasData[4].K = cutDecimal(formulasData[4].K,2,"Number");

                        //L4=if(CALCULATOR!$C$8="Mission 345",CALCULATOR!$C$15,0)
                        if(calculatorData.C8 === "Mission 345") formulasData[3].L = calculatorData.C15;
                        else formulasData[3].L = 0;
                        formulasData[3].L = cutDecimal(formulasData[3].L,2,"Number");
                        //L5=if(CALCULATOR!$C$8="REC 370",CALCULATOR!$C$15,0)
                        if(calculatorData.C8 === "REC 370") formulasData[4].L = calculatorData.C15;
                        else formulasData[4].L = 0;
                        formulasData[4].L = cutDecimal(formulasData[4].L,2,"Number");
                        
                        //M4=if(CALCULATOR!$C$8="Mission 345",-CALCULATOR!$C$16,0)
                        if(calculatorData.C8 === "Mission 345") formulasData[3].M = -calculatorData.C16;
                        else formulasData[3].M = 0;
                        formulasData[3].M = cutDecimal(formulasData[3].M,2,"Number");
                        //M5=if(CALCULATOR!$C$8="REC 370",-CALCULATOR!$C$16,0)
                        if(calculatorData.C8 === "REC 370") formulasData[4].M = -calculatorData.C16;
                        else formulasData[4].M = 0;
                        formulasData[4].M = cutDecimal(formulasData[4].M,2,"Number");
                        
                        //N4=if(CALCULATOR!$C$8="Mission 345",-CALCULATOR!$C$17,0)
                        if(calculatorData.C8 === "Mission 345") formulasData[3].N = -calculatorData.C17;
                        else formulasData[3].N = 0;
                        formulasData[3].N = cutDecimal(formulasData[3].N,2,"Number");
                        //N5=if(CALCULATOR!$C$8="REC 370",-CALCULATOR!$C$17,0)
                        if(calculatorData.C8 === "REC 370") formulasData[4].N = -calculatorData.C17;
                        else formulasData[4].N = 0;
                        formulasData[4].N = cutDecimal(formulasData[4].N,2,"Number");
                        
                        //O4=if(CALCULATOR!$C$8="Mission 345",-CALCULATOR!$C$18,0)
                        if(calculatorData.C8 === "Mission 345") formulasData[3].O = -calculatorData.C18;
                        else formulasData[3].O = 0;
                        // console.log("C18",calculatorData.C18,formulasData[3].O)
                        formulasData[3].O = cutDecimal(formulasData[3].O,2,"Number");
                        //O5=if(CALCULATOR!$C$8="REC 370",-CALCULATOR!$C$18,0)
                        if(calculatorData.C8 === "REC 370") formulasData[4].O = -calculatorData.C18;
                        else formulasData[4].O = 0;
                        formulasData[4].O = cutDecimal(formulasData[4].O,2,"Number");
                        //Q4=sum(L4:O4)
                        formulasData[3].Q = (parseFloat(getNum(formulasData[3].L))+parseFloat(getNum(formulasData[3].M))+parseFloat(getNum(formulasData[3].N))+parseFloat(getNum(formulasData[3].O)));
                        formulasData[3].Q = cutDecimal(formulasData[3].Q,2,"Number");
                        //Q5=sum(L5:O5)
                        formulasData[4].Q = (parseFloat(getNum(formulasData[4].L))+parseFloat(getNum(formulasData[4].M))+parseFloat(getNum(formulasData[4].N))+parseFloat(getNum(formulasData[4].O)));
                        formulasData[4].Q = cutDecimal(formulasData[4].Q,2,"Number");
                        //S4=IF(Q4>0,Q4/H4,0)
                        if(parseFloat(getNum(formulasData[3].Q)) > 0) formulasData[3].S = (parseFloat(getNum(formulasData[3].Q))/parseFloat(getNum(formulasData[3].H)));
                        else formulasData[3].S = 0;
                        formulasData[3].S = cutDecimal(formulasData[3].S,2,"Number");
                        //S5=IF(Q5>0,Q5/H5,0)
                        if(parseFloat(getNum(formulasData[4].Q)) > 0) formulasData[4].S = (parseFloat(getNum(formulasData[4].Q))/parseFloat(getNum(formulasData[4].H)));
                        else formulasData[4].S = 0;
                        formulasData[4].S = cutDecimal(formulasData[4].S,2,"Number");
                        //S8=IF(S4<I4,"REFUSED","ACCEPTED")
                        if(parseFloat(getNum(formulasData[3].S)) < parseFloat(getNum(formulasData[3].I))) formulasData[7].S = "REFUSED";
                        else formulasData[7].S = "ACCEPTED";
                        //S9=IF(S5<I5,"REFUSED","ACCEPTED")
                        if(parseFloat(getNum(formulasData[4].S)) < parseFloat(getNum(formulasData[4].I))) formulasData[8].S = "REFUSED";
                        else formulasData[8].S = "ACCEPTED";
                        //T4=IF(S4>I4,S4-I4,0)
                        if(parseFloat(getNum(formulasData[3].S)) > parseFloat(getNum(formulasData[3].I))) formulasData[3].T = (parseFloat(getNum(formulasData[3].S)) - parseFloat(getNum(formulasData[3].I)));
                        else formulasData[3].T = 0;
                        formulasData[3].T = cutDecimal(formulasData[3].T,2,"Number");
                        //T5=IF(S5>0,S5-I5,0)
                        if(parseFloat(getNum(formulasData[4].S)) > parseFloat(getNum(formulasData[4].I))) formulasData[4].T = (parseFloat(getNum(formulasData[4].S)) - parseFloat(getNum(formulasData[4].I)));
                        else formulasData[4].T = 0;
                        formulasData[4].T = cutDecimal(formulasData[4].T,2,"Number");
                        //U4=IF(T4>=0,IF(CALCULATOR!$C$6="Bronze",T4*$Z$7,IF(CALCULATOR!$C$6="Silver",T4*$Z$8,T4*$Z$9)))
                        if(parseFloat(getNum(formulasData[3].T)) >=0){
                            if(calculatorData.C6 === "Bronze") formulasData[3].U =(parseFloat(getNum(formulasData[3].T))*parseFloat(formulasData[6].Z.split("%")[0])/100);
                            else{
                                if(calculatorData.C6 === "Silver") formulasData[3].U =(parseFloat(getNum(formulasData[3].T))*parseFloat(formulasData[7].Z.split("%")[0])/100);
                                else formulasData[3].U =(parseFloat(getNum(formulasData[3].T))*parseFloat(formulasData[8].Z.split("%")[0])/100);
                            }
                        }
                        formulasData[3].U = cutDecimal(formulasData[3].U,2,"Number");
                        //U5=IF(T5>=0,IF(CALCULATOR!$C$6="Bronze",T5*$Z$7,IF(CALCULATOR!$C$6="Silver",T5*$Z$8,T5*$Z$9)))
                        if(parseFloat(getNum(formulasData[4].T)) >=0){
                            if(calculatorData.C6 === "Bronze") formulasData[4].U =(parseFloat(getNum(formulasData[4].T))*parseFloat(formulasData[6].Z.split("%")[0])/100);
                            else{
                                if(calculatorData.C6 === "Silver") formulasData[4].U =(parseFloat(getNum(formulasData[4].T))*parseFloat(formulasData[7].Z.split("%")[0])/100);
                                else formulasData[4].U =(parseFloat(getNum(formulasData[4].T))*parseFloat(formulasData[8].Z.split("%")[0])/100);
                            }
                        }
                        formulasData[4].U = cutDecimal(formulasData[4].U,2,"Number");
                        //V4=IF(+S4>=I4,B4*H4,0)
                        if(parseFloat(getNum(formulasData[3].S)) >= parseFloat(getNum(formulasData[3].I))) formulasData[3].V = ((parseFloat(getNum(formulasData[3].B)))*(parseFloat(getNum(formulasData[3].H))));
                        else formulasData[3].V = 0;
                        formulasData[3].V = cutDecimal(formulasData[3].V,2,"Number");
                        //V5=IF(S5>I5,B5*H5,0)
                        if(parseFloat(getNum(formulasData[4].S)) > parseFloat(getNum(formulasData[4].I))) formulasData[4].V = ((parseFloat(getNum(formulasData[4].B)))*(parseFloat(getNum(formulasData[4].H))));
                        else formulasData[4].V = 0;
                        formulasData[4].V = cutDecimal(formulasData[4].V,2,"Number");
                        //Y4=IF(CALCULATOR!$C$7="Self",D4*H4,0)
                        if(calculatorData.C7 === "Self") formulasData[3].Y = ((parseFloat(getNum(formulasData[3].D)))*(parseFloat(getNum(formulasData[3].H))));
                        else formulasData[3].Y = 0;
                        formulasData[3].Y = cutDecimal(formulasData[3].Y,2,"Number");
                        //Y5=IF(CALCULATOR!$C$7="Self",D5*H5,0)
                        if(calculatorData.C7 === "Self") formulasData[4].Y = ((parseFloat(getNum(formulasData[4].D)))*(parseFloat(getNum(formulasData[4].H))));
                        else formulasData[4].Y = 0;
                        formulasData[4].Y = cutDecimal(formulasData[4].Y,2,"Number");
                        //Z4=U4*H4
                        formulasData[3].Z = ((parseFloat(getNum(formulasData[3].U)))*(parseFloat(getNum(formulasData[3].H))));
                        formulasData[3].Z = cutDecimal(formulasData[3].Z,2,"Number");
                        //Z5=U5*H5
                        formulasData[4].Z = ((parseFloat(getNum(formulasData[4].U)))*(parseFloat(getNum(formulasData[4].H))));
                        formulasData[4].Z = cutDecimal(formulasData[4].Z,2,"Number");
                        //AA4=sum(V4:Z4)
                        formulasData[3].AA = ((parseFloat(getNum(formulasData[3].V)))+(parseFloat(getNum(formulasData[3].Y)))+(parseFloat(getNum(formulasData[3].Z))));
                        formulasData[3].AA = cutDecimal(formulasData[3].AA,2,"Number");
                        //AA5=sum(V5:Z5)
                        formulasData[4].AA = ((parseFloat(getNum(formulasData[4].V)))+(parseFloat(getNum(formulasData[4].Y)))+(parseFloat(getNum(formulasData[4].Z))));
                        formulasData[4].AA = cutDecimal(formulasData[4].AA,2,"Number");
                        
                        ////////////////-----calculator F data-------//////////////////////////////
                        //F14=IF(C8="Mission 345",Formulas!$T$4,Formulas!$T$5)
                        if(calculatorData.C8 === "Mission 345") calculatorData.F14 = (formulasData[3].T).toString();
                        else calculatorData.F14 = (formulasData[4].T).toString();
                        //F15=IF(C8="Mission 345",Formulas!$U$4,Formulas!$U$5)
                        if(calculatorData.C8 === "Mission 345") calculatorData.F15 = (formulasData[3].U).toString();
                        else calculatorData.F15 = (formulasData[4].U).toString();
                        //F17=IF($C$8="Mission 345",Formulas!$V$4,Formulas!$V$5)
                        if(calculatorData.C8 === "Mission 345") calculatorData.F17 = (formulasData[3].V).toString();
                        else calculatorData.F17 = (formulasData[4].V).toString();
                        //FSelfGen=IF($C$8="Mission 345",Formulas!$V$4+Formulas!$Y$4,Formulas!$V$5+Formulas!$Y$5)
                        if(calculatorData.C8 === "Mission 345") calculatorData.FSelfGen = (formulasData[3].Y).toString();
                        else calculatorData.FSelfGen = (formulasData[4].Y).toString();
                        //F18=IF($C$8="Mission 345",Formulas!$Z$4,Formulas!$Z$5)
                        if(calculatorData.C8 === "Mission 345") calculatorData.F18 = (formulasData[3].Z).toString();
                        else calculatorData.F18 = (formulasData[4].Z).toString();
                        //F19=IF($C$9="None",0,500)
                        if(calculatorData.C9 === "None") calculatorData.F19 = "0";
                        else calculatorData.F19 = "500";
                        //F20=sum(F17:F19)
                        calculatorData.F20 = (Math.round((parseFloat(getNum(calculatorData.F17))+parseFloat(getNum(calculatorData.FSelfGen))+parseFloat(getNum(calculatorData.F18))+parseFloat(getNum(calculatorData.F19)))*100)/100).toString();
                       
                        //C21=IF(C8="Mission 345",Formulas!S8,Formulas!S9)
                        if(calculatorData.C8 === "Mission 345") calculatorData.C21 = formulasData[7].S;
                        else calculatorData.C21 = formulasData[8].S;

                        let data = {};
                        data.formulas = formulasData;
                        data.calculator = calculatorData;
                        return data;
}