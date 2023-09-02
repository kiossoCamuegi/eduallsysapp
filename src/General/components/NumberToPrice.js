


export default   function NumberToPrice(val){ 
    let Amount = val*1;
    var DecimalSeparator = Number("1.2").toLocaleString().substr(1,1); 
    var AmountWithCommas = Amount.toLocaleString();
    var arParts = String(AmountWithCommas).split(DecimalSeparator); 
    var intPart = arParts[0];
    var decPart = (arParts.length > 1 ? arParts[1] : ''); 
    decPart = (decPart + '00').substr(0,2); 
     return intPart + DecimalSeparator + decPart;
}
 