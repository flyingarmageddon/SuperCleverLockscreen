function getAverageRGB(imgEl) {
    blockSize = 5;
    defaultRGB = {r:0,g:0,b:0};
    canvas = document.createElement('canvas');
    context = canvas.getContext('2d');
    var data, width, height;
    i = -4;
    length;
    rgb = {r:0,g:0,b:0};
	count = 0;

	document.body.appendChild(canvas);
	// context.drawImage(iel, 0, 0);
	
    if (!context) {
		console.error("Failed context");
        return defaultRGB;
    }

    height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
    width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

	context.drawImage(imgEl, 0, 0);
	
	console.log(`height = ${height}`);
	console.log(`width = ${width}`);

    try {
        data = context.getImageData(0, 0, width, height);
    } catch(e) {
		console.error(e);
        return defaultRGB;
    }

	console.log(data);

    length = data.data.length;

    while ( (i += blockSize * 4) < length ) {
        ++count;
        rgb.r += data.data[i];
        rgb.g += data.data[i+1];
        rgb.b += data.data[i+2];
	}
	
	console.log(`Total: ${count}`);
	console.log(`rgb.r: ${rgb.r}`);
	console.log(`rgb.g: ${rgb.g}`);
	console.log(`rgb.b: ${rgb.b}`);

    // ~~ used to floor values
    rgb.r = ~~(rgb.r/count);
    rgb.g = ~~(rgb.g/count);
    rgb.b = ~~(rgb.b/count);

	return rgb;
}

var iel = document.getElementsByTagName("img")[0];

function checkImage(src){
	iel.src = src;
	setTimeout(()=>{
		colorThief = new ColorThief();
		palette = colorThief.getPalette(iel, 3);
		console.log(palette);
		document.getElementById("out").innerHTML = "";
		palette.forEach(rgb => {
			document.getElementById("out").innerHTML += `<div style="display: inline-block; width: 40px; height: 40px; border-radius: 0%; background: rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]});">&nbsp;</div>`;
		});
	}, 100);
}