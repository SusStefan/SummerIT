import { useState } from 'react'
import { Keyboard } from '../UI/keyboard';
import { Button } from "../UI/Button"
import {e,pi,log,sqrt,cbrt,sin,exp,nthRoot,pow,random, tan,asin,atan, cos} from 'mathjs'
// Componenta principala a calculatorului stiintific
const calculatorstiintific = () => {
  
    const [displayValue, setDisplayValue] = useState('0'); // Starea pentru valoarea afisata pe ecran
    const [operation, setOperation] = useState(''); // Starea pentru operatia curenta (+, -, *, /)
    const [prevValue, setPrevValue] = useState(''); // Valoarea introdusa anterior (folosita la calcul)
    const [overwrite, setOverwrite] = useState(true);     // Starea pentru a determina daca afisarea trebuie suprascrisa sau concatenata cu urmatorul ditigit 
    // Functii pentru operatiile calculatorului
    const calculate = () => {
      if(!operation || !prevValue) return displayValue; // Daca nu exista operatie, returneaza valoarea curenta
      const current = parseFloat(displayValue);       // Converteste valoarea curenta la numar
      const previous = parseFloat(prevValue);   // Converteste valoarea anterioara la numar
      
      let result = 0;
      switch(operation) {
        case '+':
          result = previous + current;
          break;
        case '-':
          result = previous - current;
          break;
        case '*':
          result = previous * current;
          break;
        case '^':
           // const nr = exp(current * log(previous));
           const nr1 = pow(previous,current);
          result = Number(nr1);
          break;
        case '|':
           // const nr = exp(current * log(previous));
           const nr2 = nthRoot(previous,current);
          result = Number(nr2);
          break;
        case '/':
          if(current === 0) {
            alert('Cannot divide by zero'); // Avertizeaza utilizatorul daca se incearca impartirea la zero
            return displayValue;
          }
          result = previous / current;
          break;
      
      } 
      return result.toString();   // Returneaza rezultatul ca string  
    };
    // Functie apelata cand utilizatorul apasa pe "="
    const equals = () => {
      const value = calculate();  // Calculeaza valoarea curenta folosind operatia si valoarea anterioara
      setDisplayValue(value);   // Actualizeaza valoarea afisata
      setPrevValue('');    // Reseteaza valoarea anterioara
      setOperation('');    // Reseteaza operatia curenta
      setOverwrite(true);   // Seteaza overwrite la true pentru a permite introducerea unui nou numar
    };

     // Functie apelata cand utilizatorul selecteaza o operatie (+, -, *, /)
    const selectOperation = (nextOperation: string) => { 
      if (prevValue && operation && !overwrite) {  // Daca exista deja o operatie si o valoare anterioara, calculeaza valoarea curenta
      const value = calculate();        
      setPrevValue(value);    // Actualizeaza valoarea anterioara cu rezultatul calculului
      setDisplayValue(value);  // Actualizeaza valoarea afisata cu rezultatul calculului
      } else {
      setPrevValue(displayValue);  // Daca nu exista o valoare anterioara, seteaza valoarea curenta ca valoare anterioara
      }
      setOperation(nextOperation); // Seteaza operatia curenta cu operatia selectata
      setOverwrite(true);  
    }
     // Functie care reseteaza complet calculatorul
    const clearDisplay = () => {
      setDisplayValue('0');
      setOperation('');
      setPrevValue('');
      setOverwrite(true);
    };

    const deleteDigit = () => {
     if(parseFloat(displayValue)<10 && parseFloat(displayValue)>-10)
        clearDisplay();
    else
    {
       const newval = displayValue.substring(0,displayValue.length-1);
       const updcurrent = parseFloat(newval); 
       setDisplayValue(updcurrent.toString());
    }
    };
     const FlipFlopSign = () => {
       const updcurrent = parseFloat(displayValue) * (-1); 
      setDisplayValue(updcurrent.toString());
    };
     const Square = () => {
       const updcurrent = parseFloat(displayValue) * parseFloat(displayValue); 
      setDisplayValue(updcurrent.toString());
    };
    const Sqrt= () => {
       const updcurrent = sqrt(parseFloat(displayValue)); 
      setDisplayValue(updcurrent.toString());
    };
    const Sqrt3= () => {
       const updcurrent = cbrt(parseFloat(displayValue)); 
      setDisplayValue(updcurrent.toString());
    };
    const DisplayPI= () => {
       const updcurrent = pi; 
      setDisplayValue(updcurrent.toString());
    };
    const Displaye= () => {
       const updcurrent = e; 
      setDisplayValue(updcurrent.toString());
    };
     const Logn= () => {
       const updcurrent = log(parseFloat(displayValue),e); 
      setDisplayValue(updcurrent.toString());
    };
    const Logten= () => {
       const updcurrent = log(parseFloat(displayValue),10); 
      setDisplayValue(updcurrent.toString());
    };
    const Tenpow= () => {
       const updcurrent = pow(10,parseFloat(displayValue)); 
      setDisplayValue(updcurrent.toString());
    };
     const Inverse= () => {
       const updcurrent = 1/parseFloat(displayValue); 
      setDisplayValue(updcurrent.toString());
    };
      const ETox= () => {
       const updcurrent = pow(e,parseFloat(displayValue)); 
      setDisplayValue(updcurrent.toString());
    };
    const toTox= () => {
       const updcurrent = pow(2,parseFloat(displayValue)); 
      setDisplayValue(updcurrent.toString());
    };
    const Exp= () => {
        const updcurrent = exp(parseFloat(displayValue)); 
      setDisplayValue(updcurrent.toString());
    };
    const RanGen= () => {
          const updcurrent = random(0,1); 
      setDisplayValue(updcurrent.toString());
    };
     const Sinus= () => {
          const updcurrent = sin(parseFloat(displayValue)); 
      setDisplayValue(updcurrent.toString());
    };
    const Cosinus= () => {
          const updcurrent = cos(parseFloat(displayValue)); 
      setDisplayValue(updcurrent.toString());
    };
    const Tangent= () => {
          const updcurrent = tan(parseFloat(displayValue)); 
      setDisplayValue(updcurrent.toString());
    };
    const Cotangent= () => {
          const updcurrent = 1/tan(parseFloat(displayValue)); 
      setDisplayValue(updcurrent.toString());
    };
    const Asinus= () => {
          const updcurrent = asin(parseFloat(displayValue)); 
      setDisplayValue(updcurrent.toString());
    };
    const Acosinus= () => {
          const arcsin = asin(parseFloat(displayValue)); 
          const updcurrent = (pi/2) - Number(arcsin);
      setDisplayValue(updcurrent.toString());
    };
    const Atangent= () => {
          const updcurrent = atan(parseFloat(displayValue)); 
      setDisplayValue(updcurrent.toString());
    };
    const Acotangent= () => {
          const updcurrent = atan(1/parseFloat(displayValue)); 
      setDisplayValue(updcurrent.toString());
    };
     // Functie care adauga o cifra la afisaj 
    const setDigit = (digit: string) => {
      if(displayValue[0] === '0' && digit === '0') return; //Previne utilizarea 0 daca deja exista un 0
      if(displayValue.includes('.') && digit === '.') return; //previne uatilizarea mai multor puncte
      if(overwrite && digit){
        setDisplayValue(digit); // Daca overwrite este true, inlocuieste valoarea afisata cu cifra curenta
      }else {
        setDisplayValue(`${displayValue}${digit}`); // Adauga cifra la afisaj
      }
       setOverwrite(false); // Cifrele urmatoare nu vor rescrie
    };
   
  
  return (
    <>
    

 <div className="absolute top-4 left-4">
 <Button onClick={() => window.location.href = '/'}>
  <h1 className="text-2xl font-bold mb-4 text-center">Inapoi</h1>
    </Button>
    </div>

      <div className="flex flex-col items-center justify-center min-h-screen bg-[#0f0f0f]">
        <div className='bg-[#2f2f2e]  rounded-lg shadow-lg h-[700px] w-[600px] p-6'>
          <div>
            <div className='bg-[#161b27] text-white rounded-lg p-4 mb-4 h-[100px] flex items-center justify-end text-right text-3xl'>
              <input className='allign-right w-full h-full bg-transparent outline-none text-right ' type="text" value={displayValue} readOnly />
            </div>
            <div className='bg-[#161b27] text-white rounded-lg p-4 h-[540px] flex items-center justify-center text-center text-xl'>
              <div className='grid grid-cols-6 gap-1 flex items-center justify-center h-full w-full '>
                <Keyboard className='bg-[#4a4a4a] hover:bg-[#262626] text-white rounded-lg p-3' onClick={Sinus}>sin</Keyboard>
                <Keyboard className='bg-[#4a4a4a] hover:bg-[#262626] text-white rounded-lg p-3' onClick={Cosinus}>cos</Keyboard>
                <Keyboard className='bg-[#4a4a4a] hover:bg-[#262626] text-white rounded-lg p-3' onClick={Tangent}>tg</Keyboard>
                <Keyboard className='bg-[#4a4a4a] hover:bg-[#262626] text-white rounded-lg p-3' onClick={Cotangent}>ctg</Keyboard>
                <Keyboard className='bg-[#52527a] hover:bg-[#33334d] text-white rounded-lg p-3' onClick={clearDisplay} >CE</Keyboard>
                <Keyboard className='bg-[#52527a] hover:bg-[#33334d] text-white rounded-lg p-3' onClick={deleteDigit} >←</Keyboard>
                <Keyboard className='bg-[#4a4a4a] hover:bg-[#262626] text-white rounded-lg p-3' onClick={Asinus}>asin</Keyboard>
                <Keyboard className='bg-[#4a4a4a] hover:bg-[#262626] text-white rounded-lg p-3' onClick={Acosinus}>acos</Keyboard>
                <Keyboard className='bg-[#4a4a4a] hover:bg-[#262626] text-white rounded-lg p-3' onClick={Atangent}>atg</Keyboard>
                <Keyboard className='bg-[#4a4a4a] hover:bg-[#262626] text-white rounded-lg p-3' onClick={Acotangent}>actg</Keyboard>
                <Keyboard className='bg-[#4a4a4a] hover:bg-[#262626] text-white rounded-lg p-3' onClick={Sqrt} >√x</Keyboard>
                <Keyboard className='bg-[#4a4a4a] hover:bg-[#262626] text-white rounded-lg p-3' onClick={Square} >x²</Keyboard>
                <Keyboard className='bg-[#4a4a4a] hover:bg-[#262626] text-white rounded-lg p-3' onClick={Sqrt3} >∛x</Keyboard>
                <Keyboard className='bg-[#4a4a4a] hover:bg-[#262626] text-white rounded-lg p-3' onClick={Inverse}>1/x</Keyboard>
                <Keyboard className='bg-[#4a4a4a] hover:bg-[#262626] text-white rounded-lg p-3' onClick={ETox}>eˣ</Keyboard>
                <Keyboard className='bg-[#4a4a4a] hover:bg-[#262626] text-white rounded-lg p-3' onClick={toTox}>2ˣ</Keyboard>
                <Keyboard className='bg-[#4a4a4a] hover:bg-[#262626] text-white rounded-lg p-3' onClick={() => selectOperation('^')}>xʸ</Keyboard>
                <Keyboard className='bg-[#4a4a4a] hover:bg-[#262626] text-white rounded-lg p-3' onClick={() => selectOperation('/')}>/</Keyboard>
                <Keyboard className='bg-[#52527a] hover:bg-[#33334d] text-white rounded-lg p-3' onClick={() => setDigit('7')} >7</Keyboard>
                <Keyboard className='bg-[#52527a] hover:bg-[#33334d] text-white rounded-lg p-3' onClick={() => setDigit('8')} >8</Keyboard>
                <Keyboard className='bg-[#52527a] hover:bg-[#33334d] text-white rounded-lg p-3' onClick={() => setDigit('9')}>9</Keyboard>
                <Keyboard className='bg-[#52527a] hover:bg-[#33334d] text-white rounded-lg p-3' onClick={() => selectOperation('+')}>+</Keyboard>
                <Keyboard className='bg-[#4a4a4a] hover:bg-[#262626] text-white rounded-lg p-3' onClick={() => selectOperation('|')}>ʸ√x</Keyboard>
                <Keyboard className='bg-[#4a4a4a] hover:bg-[#262626] text-white rounded-lg p-3' onClick={Tenpow}>10ˣ</Keyboard>
                <Keyboard className='bg-[#52527a] hover:bg-[#33334d] text-white rounded-lg p-3' onClick={() => setDigit('4')}>4</Keyboard>
                <Keyboard className='bg-[#52527a] hover:bg-[#33334d] text-white rounded-lg p-3' onClick={() => setDigit('5')}>5</Keyboard>
                <Keyboard className='bg-[#52527a] hover:bg-[#33334d] text-white rounded-lg p-3' onClick={() => setDigit('6')}>6</Keyboard>
                <Keyboard className='bg-[#52527a] hover:bg-[#33334d] text-white rounded-lg p-3' onClick={() => selectOperation('-')}>-</Keyboard>
                <Keyboard className='bg-[#4a4a4a] hover:bg-[#262626] text-white rounded-lg p-3' onClick={Exp}>exp</Keyboard>
                <Keyboard className='bg-[#4a4a4a] hover:bg-[#262626] text-white rounded-lg p-3' onClick={Logten}>log</Keyboard>
                <Keyboard className='bg-[#52527a] hover:bg-[#33334d] text-white rounded-lg p-3' onClick={() => setDigit('1')}>1</Keyboard>
                <Keyboard className='bg-[#52527a] hover:bg-[#33334d] text-white rounded-lg p-3' onClick={() => setDigit('2')}>2</Keyboard>
                <Keyboard className='bg-[#52527a] hover:bg-[#33334d] text-white rounded-lg p-3' onClick={() => setDigit('3')}>3</Keyboard>
                <Keyboard className='bg-[#52527a] hover:bg-[#33334d] text-white rounded-lg p-3' onClick={() => selectOperation('*')}>*</Keyboard>
                <Keyboard className='bg-[#4a4a4a] hover:bg-[#262626] text-white rounded-lg p-3' onClick={Logn}>ln</Keyboard>
                <Keyboard className='bg-[#4a4a4a] hover:bg-[#262626] text-white rounded-lg p-3' onClick={RanGen}>rand</Keyboard>
                <Keyboard className='bg-[#52527a] hover:bg-[#33334d] text-white rounded-lg p-3' onClick={FlipFlopSign}>+/-</Keyboard>
                <Keyboard className='bg-[#52527a] hover:bg-[#33334d] text-white rounded-lg p-3' onClick={() => setDigit('0')}>0</Keyboard>
                <Keyboard className='bg-[#52527a] hover:bg-[#33334d] text-white rounded-lg p-3' onClick={() => setDigit('.')} >.</Keyboard>
                <Keyboard className='bg-[#52527a] hover:bg-[#33334d] text-white rounded-lg p-3' onClick={equals}>=</Keyboard>
                <Keyboard className='bg-[#4a4a4a] hover:bg-[#262626] text-white rounded-lg p-3' onClick={DisplayPI}>π</Keyboard>
                <Keyboard className='bg-[#4a4a4a] hover:bg-[#262626] text-white rounded-lg p-3' onClick={Displaye}>e</Keyboard>
                
              
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default calculatorstiintific