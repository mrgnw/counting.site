// #8200ff jet
// #1dcaff twitter
// #81FFAA
// #FBB13C
// #FE6847
//
// #3B5998 facebook


// coolors.co
// color.adobe.com

// from bit.ly/1fC7Bt5

canvas = document.querySelector('#canvas')
var el, i;
for(i = 0; i < 64; i++) {
    color = generateRandomColor({red: 0, green: 0, blue: 0});
    el = document.createElement("div");
    el.setAttribute('class', 'box');
    el.setAttribute('style', 'background-color: '+color);
    canvas.appendChild(el);
}


function generateRandomColor(mix) {
    var red = Math.random() * 256 >> 0;
    var green = Math.random() * 256 >> 0;
    var blue = Math.random() * 256 >> 0;

    // mix the color
    if (mix != null) {
        red = (red + mix.red) >> 0;
        green = (green + mix.green) >> 0;
        blue = (blue + mix.blue) >> 0;
    }
    rr = red.toString(16);
    if (rr.length === 1) {
        rr = "0"+rr[0];
    }
    gg = green.toString(16);
    if (gg.length === 1) {
        gg = "0"+gg[0];
    }
    bb = blue.toString(16);
    if (bb.length === 1) {
        bb = "0"+bb[0];
    }
    return "#"+ rr + gg + bb;
}
