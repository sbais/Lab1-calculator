function Addition(callback, a1, b1){
	var res1 = a1/1 + b1/1;
	callback(res1);}

function Subtraction(callback, a2, b2){
	var res2 = a2 - b2;
	callback(res2);}

function Multiplication(callback, a3, b3){
	var res3 = a3 * b3;
	callback(res3);}

function Division(callback, a4, b4){
	var res4 = a4 / b4;
	callback(res4);}

exports.Addition = Addition;
exports.Subtraction = Subtraction;
exports.Multiplication = Multiplication;
exports.Division = Division;
