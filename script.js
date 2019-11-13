window.onload = function () {
    function changeLocalStorage(pixelSize, curTool, curColor, prevColor) {
        localStorage.pixelSize = pixelSize;
        localStorage.curTool = curTool;
        localStorage.curColor = curColor;
        localStorage.prevColor = prevColor;
        //localStorage.colorArray = JSON.stringify(colorArray);
        console.log(localStorage);
    }
    function changeColor(color) {
        if (curColor != color) {
            tempColor = curColor;
            curColor = color;
            curColorShape.style.background = curColor;
            prevColor = tempColor;
            prevColorShape.style.background = prevColor;
        }
    }
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    let curColor = 'black';
    let prevColor = 'white';
    let tempColor;
    let curColorShape = document.getElementById('cur-color-shape');
    let prevColorShape = document.getElementById('prev-color-shape');
    let fillBox = document.getElementById('fill');
    let eyedropperBox = document.getElementById('eyedropper');
    let pencilBox = document.getElementById('pencil');
    let canvas4x4Box = document.getElementById('canvas-4x4');
    let canvas32x32Box = document.getElementById('canvas-32x32');
    let canvas512x512Box = document.getElementById('canvas-512x512');
    let curColorBox = document.getElementById('cur-color');
    let prevColorBox = document.getElementById('prev-color');
    let redColorBox = document.getElementById('red-color');
    let blueColorBox = document.getElementById('blue-color');
    let inputColor = document.getElementById('input-color');
    let canvasWidth = canvas.offsetWidth;
    let canvasHeight = canvas.offsetHeight;
    let mouseDown = false;
    let colorArray = [];
    
    let pixelSize;

    canvas4x4Box.onclick = () => {
        canvas4x4Box.classList.add('highlight');
        canvas32x32Box.classList.remove('highlight');
        canvas512x512Box.classList.remove('highlight');
        pixelSize = 128;
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        for (let i = 0; i < (canvasWidth / pixelSize) - 1; i++) {
            colorArray[i] = [];
            for (let j = 0; j < (canvasHeight / pixelSize) - 1; j++) {
                colorArray[i][j] = '#ffffff';
            }
        }
        changeLocalStorage(pixelSize, curTool, curColor, prevColor);
    }
    canvas32x32Box.onclick = () => {
        canvas4x4Box.classList.remove('highlight');
        canvas32x32Box.classList.add('highlight');
        canvas512x512Box.classList.remove('highlight');
        pixelSize = 16;
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        for (let i = 0; i < (canvasWidth / pixelSize) - 1; i++) {
            colorArray[i] = [];
            for (let j = 0; j < (canvasHeight / pixelSize) - 1; j++) {
                colorArray[i][j] = '#ffffff';
            }
        }
        changeLocalStorage(pixelSize, curTool, curColor, prevColor);
    }
    canvas512x512Box.onclick = () => {
        canvas4x4Box.classList.remove('highlight');
        canvas32x32Box.classList.remove('highlight');
        canvas512x512Box.classList.add('highlight');
        pixelSize = 1;
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        for (let i = 0; i < (canvasWidth / pixelSize) - 1; i++) {
            colorArray[i] = [];
            for (let j = 0; j < (canvasHeight / pixelSize) - 1; j++) {
                colorArray[i][j] = '#ffffff';
            }
        }
        changeLocalStorage(pixelSize, curTool, curColor, prevColor);
    }
    fillBox.onclick = () => {
        curTool = 'fill';
        document.getElementsByTagName('body')[0].style.cursor = `url('assets/bucket.svg'), auto`;
        fillBox.classList.add('highlight');
        eyedropperBox.classList.remove('highlight');
        pencilBox.classList.remove('highlight');
        canvas.onmousemove = null;
        canvas.onclick = () => {
            ctx.fillStyle = curColor;
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);
            for (let i = 0; i < (canvasWidth / pixelSize) - 1; i++) {
                for (let j = 0; j < (canvasHeight / pixelSize) - 1; j++) {
                    colorArray[i][j] = curColor;
                }
            }
        }
        changeLocalStorage(pixelSize, curTool, curColor, prevColor);
    }
    eyedropperBox.onclick = () => {
        curTool = 'eyedropper';
        document.getElementsByTagName('body')[0].style.cursor = `url('assets/eyedropper.svg') 0 20, auto`;
        fillBox.classList.remove('highlight');
        eyedropperBox.classList.add('highlight');
        pencilBox.classList.remove('highlight');
        canvas.onmousemove = null;
        canvas.onclick = (e) => {
            let pixel = {
                x: Math.floor((e.clientX - canvas.getBoundingClientRect().x) / pixelSize),
                y: Math.floor((e.clientY - canvas.getBoundingClientRect().y) / pixelSize)
            };
            // console.log(Math.floor((e.clientX - canvas.getBoundingClientRect().x) / pixelSize),
            //     Math.floor((e.clientY - canvas.getBoundingClientRect().y) / pixelSize));
            changeColor(colorArray[pixel.y][pixel.x]);
        }
        changeLocalStorage(pixelSize, curTool, curColor, prevColor);
    }
    pencilBox.onclick = () => {
        curTool = 'pencil';
        document.getElementsByTagName('body')[0].style.cursor = `url('assets/pencil.svg') 0 20, auto`;
        fillBox.classList.remove('highlight');
        eyedropperBox.classList.remove('highlight');
        pencilBox.classList.add('highlight');
        canvas.addEventListener('mousedown', () => {
            mouseDown = true;
        });
        canvas.addEventListener('mouseup', () => {
            mouseDown = false;
        });
        canvas.onclick = (e) => {
            let pixel = {
                x: Math.floor((e.clientX - canvas.getBoundingClientRect().x) / pixelSize),
                y: Math.floor((e.clientY - canvas.getBoundingClientRect().y) / pixelSize)
            };
            // console.log(Math.floor((e.clientX - canvas.getBoundingClientRect().x) / pixelSize),
            //     Math.floor((e.clientY - canvas.getBoundingClientRect().y) / pixelSize));
            ctx.fillStyle = curColor;
            ctx.fillRect(pixel.x * pixelSize, pixel.y * pixelSize, pixelSize, pixelSize);
            colorArray[pixel.y][pixel.x] = curColor;
        }
        canvas.onmousemove = (e) => {
            if (mouseDown) {
                let pixel = {
                    x: Math.floor((e.clientX - canvas.getBoundingClientRect().x) / pixelSize),
                    y: Math.floor((e.clientY - canvas.getBoundingClientRect().y) / pixelSize)
                };
                // console.log(Math.floor((e.clientX - canvas.getBoundingClientRect().x) / pixelSize),
                //     Math.floor((e.clientY - canvas.getBoundingClientRect().y) / pixelSize));
                ctx.fillStyle = curColor;
                ctx.fillRect(pixel.x * pixelSize, pixel.y * pixelSize, pixelSize, pixelSize);
                colorArray[pixel.y][pixel.x] = curColor;
            }
        }
        changeLocalStorage(pixelSize, curTool, curColor, prevColor);
    }

    prevColorBox.onclick = () => {
        changeColor(prevColor);
        changeLocalStorage(pixelSize, curTool, curColor, prevColor);
    }

    curColorBox.onclick = () => {
        inputColor.click();
        inputColor.onchange = () => {
            changeColor(inputColor.value);
        }
        changeLocalStorage(pixelSize, curTool, curColor, prevColor);
    }
    redColorBox.onclick = () => {
        changeColor('red');
        changeLocalStorage(pixelSize, curTool, curColor, prevColor);
    }

    blueColorBox.onclick = () => {
        changeColor('blue');
        changeLocalStorage(pixelSize, curTool, curColor, prevColor);
    }

    //Hotkeys
    document.addEventListener('keydown', (e) => {
        switch (e.code) {
            case 'KeyB':
                fillBox.click();
                break;
            case 'KeyP':
                pencilBox.click();
                break;
            case 'KeyC':
                eyedropperBox.click();
                break;
        }
    })


    if (localStorage.curColor != null) {
        curColor = localStorage.curColor;
        

    }
    else {
        curColor = 'black';
        
    }
    curColorShape.style.background = curColor;

    if (localStorage.prevColor != null) {
        prevColor = localStorage.prevColor;
        
    }
    else {
        prevColor = 'white';
        
    }
    prevColorShape.style.background = prevColor;

    if (localStorage.pixelSize != null) {
        pixelSize = +localStorage.pixelSize;
        switch (pixelSize) {
            case 128:
                canvas4x4Box.classList.add('highlight');
                break;
            case 16:
                canvas32x32Box.classList.add('highlight');
                break;
            case 1:
                canvas512x512Box.classList.add('highlight');
                break;
        }
    }
    else {
        pixelSize = 128;
    }

    if (localStorage.curTool != null) {
        curTool = localStorage.curTool;
        switch (curTool) {
            case 'pencil':
                pencilBox.click();
                break;
            case 'eyedropper':
                eyedropperBox.click();
                break;
            case 'fill':
                fillBox.click();
                break;

        }
    }
    else {
        curTool = 'pencil';
        pencilBox.click();
    }

    if (localStorage.getItem('canvasImage') != null) {
        var dataURL = localStorage.getItem('canvasImage');
        var img = new Image;
        img.src = dataURL;
        img.onload = function () {
            ctx.drawImage(img, 0, 0);
        };
    }

    for (let i = 0; i < (canvasWidth / pixelSize) - 1; i++) {
        colorArray[i] = [];
        for (let j = 0; j < (canvasHeight / pixelSize) - 1; j++) {
            colorArray[i][j] = '#ffffff';
        }
    }
    //console.log(colorArray);

    // if (localStorage.colorArray != []) {
    //     colorArray = JSON.parse(localStorage.colorArray)
    // }
    // else {
    //     for (let i = 0; i < (canvasWidth / pixelSize) - 1; i++) {
    //         colorArray[i] = [];
    //         for (let j = 0; j < (canvasHeight / pixelSize) - 1; j++) {
    //             colorArray[i][j] = '#ffffff';
    //         }
    //     }
    // }


    // let curTool = 'pencil';
    // canvas4x4Box.classList.add('highlight');
    // curColorShape.style.background = curColor;
    // prevColorShape.style.background = prevColor;
    // pencilBox.click();

}
window.onbeforeunload = function () {
    localStorage.setItem('canvasImage', canvas.toDataURL());
};
