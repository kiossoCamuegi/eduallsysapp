if(localStorage.getItem('colorMode') === null){localStorage.setItem('colorMode', 'theme-color-purple')}

let Color = {color: 'var(--ed-purple)', '&.Mui-checked': { color: 'var(--ed-purple)' },}
const color_modes = ['theme-color-blue', 
    'theme-color-red',
    'theme-color-brown', 
    'theme-color-cyan', 
    'theme-color-purple', 
    'theme-color-green',
    'theme-color-orange',
    'theme-color-pink',
    'theme-color-customer'
];
const setColor = [
    {TH:{color: 'var(--ed-blue)', '&.Mui-checked': { color: 'var(--ed-blue)' },}},
    {TH:{color: 'var(--ed-red)', '&.Mui-checked': { color: 'var(--ed-red)' },}},
    {TH:{color: 'var(--ed-brown)', '&.Mui-checked': { color: 'var(--ed-brown)' },}},
    {TH:{color: 'var(--ed-cyan)', '&.Mui-checked': { color: 'var(--ed-cyan)' },}}, 
    {TH:{color: 'var(--ed-purple)', '&.Mui-checked': { color: 'var(--ed-purple)' },}},
    {TH:{color: 'var(--ed-green)', '&.Mui-checked': { color: 'var(--ed-green)' },}},
    {TH:{color: 'var(--ed-orange)', '&.Mui-checked': { color: 'var(--ed-orange)' },}},
    {TH:{color: 'var(--ed-pink)', '&.Mui-checked': { color: 'var(--ed-pink)' },}},
    {TH:{color: 'var(--ed-customer-color)', '&.Mui-checked': { color: 'var(--ed-customer-color)' },}},
]
let DefaultColor = localStorage.getItem('colorMode');  
let current_color = [];

for(let i = 0; i < color_modes.length; i++) {
    if(DefaultColor === color_modes[i]){  
       current_color.push(color_modes.indexOf(color_modes[i])); 
    }
} 
Color = setColor[current_color[0]].TH.color;  
console.log("the current color theme is "+ Color);

export default Color;