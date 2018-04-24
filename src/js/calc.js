const   calc = document.getElementById('calc'),
        hist = document.getElementById('history'),
        res = document.getElementById('result'),
        btnClass = 'js-btn';
let     total = 0,
        lastOp = '',
        isNewVal = true,
        count;

calc.addEventListener('click', ev => {
    const el = ev.target;
    if (!el.classList.contains(btnClass)) {
        return;
    }

    route(el.textContent);
});

function route(val) {
    if (val >= '0' && val <= '9') {
        number(val);
    } else if (val === 'ce' || val === 'c' || val === 'del') {
        clear(val);
    } else if (val === '±' || val === '.') {
        transform(val);
    } else if (val === '/' || val === '*' || val === '-' || val === '+' || val === '=') {
        operation(val);
    }
}

function number (val) {
    if (!isNewVal && count >= 20 ) {
        return;
    }

    if (isNewVal || res.value === '0') {
        res.value = val;
        isNewVal = false;
    } else {
        res.value += val;
    }

    const num = res.value;
    count = Number(num) < 0 ? num.length - 1 : num.length;
}

function clear (val) {
    switch (val) {
        case 'c':
            hist.innerText = '';
            lastOp = '';

        case 'ce':
            isNewVal = true;
            res.value = '0';
        break;

        case 'del':
            if (res.value.length === 1) {
                res.value = '0';
                isNewVal = true;
            } else {
                res.value = res.value.slice(0, -1);
            }
    }
}

function transform(val) {
    switch (val) {
        case '±':
            if (res.value === '0' || isNewVal) {
                return;
            }

            res.value = ~res.value.indexOf('-') ? 
                res.value.slice(1) : 
                '-' + res.value;
        break;

        case '.':
        case ',':
            if (isNewVal) {
                res.value = 0;
            }

            if (!~res.value.indexOf('.')) {
                res.value += '.';
                isNewVal = false;
            }
    }
}

function operation (op) {
    const newNum = Number(res.value);

    if (lastOp && !isNewVal) {
        Function('val', 'total ' + lastOp + '= val;')(newNum);
        res.value = total;
    }

    if (hist.innerText) {
        if (isNewVal) {
            hist.innerText = hist.innerText.slice(0, -2) + ' ' + op;
        } else {
            hist.innerText = total + ' ' + op;  
        }
    } else {
        hist.innerText = newNum + ' ' + op;
        total = newNum;
    }

    isNewVal = true;

    if (op === '=') {
        hist.innerText = '';
        lastOp = '';
    } else {
        lastOp = op;
    }
}
