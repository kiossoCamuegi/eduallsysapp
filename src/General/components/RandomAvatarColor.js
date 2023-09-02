 
function RandomAvatarColor() { 
 const ColorsList = [
    "#4CC9F0", "#4895EF", "#4361EE", "#3F37C9",
    "#3A0CA3", "#480CA8", "#B5179E", "#fee440",
    "#b08968", "#a44a3f", "#22577a", "#ff595e"
 ];
 return ColorsList[~~(Math.random() * ColorsList.length)];
}


export default RandomAvatarColor