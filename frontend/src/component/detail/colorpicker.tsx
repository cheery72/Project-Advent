import styles from "../../../styles/detail/colorpicker.module.css"



export default function Colorpicker () {
    
    // rgb color picker
    var addSwatch:any = document.getElementById('add-swatch');
    var modeToggle:any = document.getElementById('mode-toggle');
    var swatches:any = document.getElementsByClassName('default-swatches')[0];
    var colorIndicator:any = document.getElementById('color-indicator');
    var userSwatches:any = document.getElementById('user-swatches');
    
    var spectrumCanvas:any = document.getElementById('spectrum-canvas');
    // var spectrumCtx:any = spectrumCanvas.getContext('2d');
    // var spectrumCursor:any = document.getElementById('spectrum-cursor');
    // var spectrumRect:any = spectrumCanvas.getBoundingClientRect();
    
    // var hueCanvas:any = document.getElementById('hue-canvas');
    // var hueCtx:any = hueCanvas.getContext('2d');
    // var hueCursor:any = document.getElementById('hue-cursor');
    // var hueRect:any = hueCanvas.getBoundingClientRect();
    
    // var currentColor:any = '';
    // var hue:any = 0;
    // var saturation:any = 1;
    // var lightness:any = .5;
    
    // var rgbFields:any = document.getElementById('rgb-fields');
    // var hexField:any = document.getElementById('hex-field');
    
    // var red:any = document.getElementById('red');
    // var blue:any = document.getElementById('blue');
    // var green:any = document.getElementById('green');
    // var hex:any = document.getElementById('hex');
    
    // function ColorPicker() {
    //   this.addDefaultSwatches();
    //   createShadeSpectrum();
    //   createHueSpectrum();
    // };
    
    // ColorPicker.prototype.defaultSwatches = [
    //   '#FFFFFF',
    //   '#FFFB0D',
    //   '#0532FF',
    //   '#FF9300', 
    //   '#00F91A', 
    //   '#FF2700', 
    //   '#000000', 
    //   '#686868', 
    //   '#EE5464', 
    //   '#D27AEE', 
    //   '#5BA8C4', 
    //   '#E64AA9'
    // ];
    
    // function createSwatch(target, color) {
    //   var swatch = document.createElement('button');
    //   swatch.classList.add('swatch');
    //   swatch.setAttribute('title', color);
    //   swatch.style.backgroundColor = color;
    //   swatch.addEventListener('click', function(){
    //     var color = tinycolor(this.style.backgroundColor);
    //     colorToPos(color);
    //     setColorValues(color);
    //   });
    //   target.appendChild(swatch);
    //   refreshElementRects();
    // };
    
    // ColorPicker.prototype.addDefaultSwatches = function() {
    //   for( var i = 0; i < this.defaultSwatches.length; ++i) {
    //     createSwatch(swatches, this.defaultSwatches[i]);
    //   }
    // }
    
    // function refreshElementRects() {
    //   spectrumRect = spectrumCanvas.getBoundingClientRect();
    //   hueRect = hueCanvas.getBoundingClientRect();
    // }
    
    // function createShadeSpectrum(color: string | undefined) {
    //   const newLocal = canvas = spectrumCanvas;
    //   ctx = spectrumCtx;
    //   ctx.clearRect(0, 0, canvas.width, canvas.height);
      
    //   if(!color) color = '#f00';
    //   ctx.fillStyle = color;
    //   ctx.fillRect(0, 0, canvas.width, canvas.height);
      
    //   var whiteGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    //   whiteGradient.addColorStop(0, "#fff");
    //   whiteGradient.addColorStop(1, "transparent");
    //   ctx.fillStyle = whiteGradient;
    //   ctx.fillRect(0, 0, canvas.width, canvas.height);
      
    //   var blackGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    //   blackGradient.addColorStop(0, "transparent");
    //   blackGradient.addColorStop(1, "#000");
    //   ctx.fillStyle = blackGradient;
    //   ctx.fillRect(0, 0, canvas.width, canvas.height);
      
    //   canvas.addEventListener('mousedown', function(e) {
    //     startGetSpectrumColor(e);
    //   });
    // };
    
    // function createHueSpectrum() {
    //   var canvas = hueCanvas;
    //   var ctx = hueCtx;
    //   var hueGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    //   hueGradient.addColorStop(0.00, "hsl(0, 100%, 50%)");
    //   hueGradient.addColorStop(0.17, "hsl(298.8, 100%, 50%)");
    //   hueGradient.addColorStop(0.33, "hsl(241.2, 100%, 50%)");
    //   hueGradient.addColorStop(0.50, "hsl(180, 100%, 50%)");
    //   hueGradient.addColorStop(0.67, "hsl(118.8, 100%, 50%)");
    //   hueGradient.addColorStop(0.83, "hsl(61.2, 100%, 50%)");
    //   hueGradient.addColorStop(1.00, "hsl(360, 100%, 50%)");
    //   ctx.fillStyle = hueGradient;
    //   ctx.fillRect(0, 0, canvas.width, canvas.height);
    //   canvas.addEventListener('mousedown', function(e) {
    //     startGetHueColor(e);
    //   });
    // };
    
    // function colorToHue(color) {
    //   var color = tinycolor(color);
    //   var hueString = tinycolor('hsl ' + color.toHsl().h + ' 1 .5').toHslString();
    //   return hueString;
    // };
    
    // function colorToPos(color) {
    //   var color = tinycolor(color);
    //   var hsl = color.toHsl();
    //   hue = hsl.h;
    //   var hsv = color.toHsv();
    //   var x = spectrumRect.width * hsv.s;
    //   var y = spectrumRect.height * (1 - hsv.v);
    //   var hueY = hueRect.height - ((hue / 360) * hueRect.height);
    //   updateSpectrumCursor(x, y);
    //   updateHueCursor(hueY);
    //   setCurrentColor(color);
    //   createShadeSpectrum(colorToHue(color));
    // };
    
    // function setColorValues(color) {
    //   var color = tinycolor(color);
    //   var rgbValues = color.toRgb();
    //   var hexValue = color.toHex();
      
    //   red.value = rgbValues.r;
    //   green.value = rgbValues.g;
    //   blue.value = rgbValues.b;
    //   hex.value = hexValue;
    // };
    
    // function setCurrentColor(color) {
    //   color = tinycolor(color);
    //   currentColor = color;
    //   colorIndicator.style.backgroundColor = color;
    //   document.body.style.backgroundColor = color;
    //   spectrumCursor.style.backgroundColor = color;
    //   hueCursor.style.backgroundColor = 'hsl(' + color.toHsl().h +',100%, 50%)';
    // };
    
    // function updateHueCursor(y) {
    //   hueCursor.style.top = y + "px";
    // }
    
    // function updateSpectrumCursor(x, y) {
    //   spectrumCursor.style.left = x + 'px';
    //   spectrumCursor.style.top = y + 'px';
    // };
    
    // var startGetSpectrumColor = function(e) {
    //   getSpectrumColor(e);
    //   spectrumCursor.classList.add('dragging');
    //   window.addEventListener('mousemove', getSpectrumColor);
    //   window.addEventListener('mouseup', endGetSpectrumColor);
    // };
    
    // function getSpectrumColor(e) {
    //   e.preventDefault();
      
    //   var x = e.pageX - spectrumRect.left;
    //   var y = e.pageY - spectrumRect.top;
      
    //   if(x > spectrumRect.width) {x = spectrumRect.width}
    //   if(x < 0) {x = 0}
    //   if(y > spectrumRect.height) {y = spectrumRect.height}
    //   if(y < 0) {y = .1}
      
    //   var xRatio = x / spectrumRect.width * 100;
    //   var yRatio = y / spectrumRect.height * 100;
    //   var hsvValue = 1 - (yRatio / 100);
    //   var hsvSaturation = xRatio / 100;
    //   lightness = (hsvValue / 2) * (2 - hsvSaturation);
    //   saturation = (hsvValue * hsvSaturation) / (1 - Math.abs(2 * lightness -1));
    //   var color = tinycolor('hsl ' + hue + ' ' + saturation + ' ' + lightness);
    //   setCurrentColor(color);
    //   setColorValues(color);
    //   updateSpectrumCursor(x, y);
    // };
    
    // function endGetSpectrumColor(e) {
    //   spectrumCursor.classList.remove('dragging');
    //   window.removeEventListener('mousemove', getSpectrumColor);
    // };
    
    // function startGetHueColor(e) {
    //   getHueColor(e);
    //   hueCursor.classList.add('dragging');
    //   window.addEventListener('mousemove', getHueColor);
    //   window.addEventListener('mouseup', endGetHueColor);
    // }
    
    // function getHueColor(e) {
    //   e.preventDefault();
    //   var y = e.pageY - hueRect.top;
    //   if (y > hueRect.height){ y = hueRect.height};
    //   if (y < 0) { y = 0};
    //   var percent = y / hueRect.height;
    //   hue = 360 - (360 * percent);
    //   var hueColor = tinycolor('hsl ' + hue + ' 1 .5').toHslString();
    //   var color = tinycolor('hsl ' + hue + ' ' + saturation + ' ' + lightness).toHslString();
    //   createShadeSpectrum(hueColor);
    //   updateHueCursor(y, hueColor);
    //   setCurrentColor(color);
    //   setColorValues(color);
    // };
    
    // function endGetHueColor(e) {
    //   hueCursor.classList.remove('dragging');
    //   window.removeEventListener('mousemove', getHueColor);
    // };
    
    // red.addEventListener('change', function() {
    //   var color = tinycolor('rgb ' + red.value + ' ' + green.value + ' ' + blue.value);
    //   colorToPos(color);
    // });
    
    // green.addEventListener('change', function() {
    //   var color = tinycolor('rgb ' + red.value + ' ' + green.value + ' ' + blue.value);
    //   colorToPos(color);
    // });
    
    // blue.addEventListener('change', function() {
    //   var color = tinycolor('rgb ' + red.value + ' ' + green.value + ' ' + blue.value);
    //   colorToPos(color);
    // });
    
    // addSwatch.addEventListener('click', function() {
    //   createSwatch(userSwatches , currentColor);
    // });
    
    // modeToggle.addEventListener('click', function() {
    //   if(rgbFields.classList.contains('active') ? rgbFields.classList.remove('active') : rgbFields.classList.add('active'));
    //   if(hexField.classList.contains('active') ? hexField.classList.remove('active') : hexField.classList.add('active'));
    // });
    
    // window.addEventListener('resize', function() {
    //   refreshElementRects();
    // });
    
    // new ColorPicker();
      
      



    return(
        <>
            <div className={styles.rgbcolorpicker}>
                <div className={styles.color_picker_panel}>
                    <div className={styles.panel_row}>
                        <div className={styles.defailt_swatches}></div>
                        <button className={`${styles.button} ${styles.eyedropper}`}>Get Color</button>
                    </div>
                    <div className={styles.panel_row}>
                        <div className={styles.spectrum_map}>
                            <button id="spectrum_cursor" style={{width:"30px", height:"30px",marginLeft:"15px", marginTop:"15px", top:"0", left:"0"}} className={styles.color_cursor}>
                            </button>
                        
                        <canvas id="spectrum_canvas" style={{position:"absolute", width:"100%", height:"100%", top:"0", left:"0", right:"0", bottom:"0", background:"#ccc"}}></canvas>
                        </div>
                        <div className={styles.hue_map}>
                            <button id="hue_cursor" style={{width:"20px", height:"20px", top:"0", left:"50%", marginTop:"-10px", marginLeft:"-10px", pointerEvents:"none"}} className={styles.color_cursor}></button>
                            <canvas id="hue_canvas" style={{position:"absolute", width:"100%", height:"100%", top:"0", left:"0", right:"0", bottom:"0", background:"#ccc", borderRadius:"8px"}}></canvas>
                        </div>
                    </div>
                    <div className={styles.panel_row}>
                        <div id="rgb_fields" className={`${styles.field_group} ${styles.value_fields} ${styles.rgb_fields} ${styles.active}`}>
                            <div className={styles.field_group}>
                                <label htmlFor="" className={styles.field_label}>R:</label>
                                <input type="number" max="255" min="0" id="red" className={`${styles.field_input} ${styles.rgb_input}`}></input>
                            </div>
                            <div className={styles.field_group}>
                                <label htmlFor="" className={styles.field_label}>G:</label>
                                <input type="number" max="255" min="0" id="green" className={`${styles.field_input} ${styles.rgb_input}`}></input>
                            </div>
                            <div className={styles.field_group}>
                                <label htmlFor="" className={styles.field_label}>B:</label>
                                <input type="number" max="255" min="0" id="blue" className={`${styles.field_input} ${styles.rgb_input}`}></input>
                            </div>
                        </div>
                        <div id="hex_field" className={`${styles.field_group} ${styles.value_fields} ${styles.hex_field}`}>
                            <label htmlFor="" className={styles.field_label}>Hex:</label>
                            <input type="text" id="hex" className={styles.field_input}></input>
                        </div>
                        <button id="mode_toggle" className={`${styles.button} ${styles.mode_toggle}`}>Mode</button>
                    </div>
                    <div className={styles.panel_row}>
                        <h2 className={styles.panel_header}>User Colors</h2>
                        <div id="user_swatches" className={`${styles.swatches} ${styles.custom_swatches}`}></div>
                    </div>
                    <button id="add_swatch" className={`${styles.button} ${styles.add_swatch}`}>
                    <span id="color_indicator" className={styles.color_indicator}>
                    </span>
                    <span>Add to Swatches</span>
                    </button>
                </div>
            </div>
        </>
    )
}