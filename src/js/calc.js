'use strict';
const   calc = document.getElementById('calc'),
        hist = document.getElementById('history'),
        res = document.getElementById('result'),
        btnClass = 'js-btn';

class Calculator {
    constructor (body, hist, res, btnClass) {
        this.body = body;
        this.hist = hist;
        this.res = res;
        this.btnClass = btnClass;
        this.total = 0;
        this.lastOp = '';
        this.isNewVal = true;
        this.body.addEventListener('click', this.onClickCalculator.bind(this));
    }

    onClickCalculator (ev) {
        const el = ev.target;
        if (!el.classList.contains(this.btnClass)) {
            return;
        }
    
        this.route(el.textContent);
    }

    route(val) {
        if (val >= '0' && val <= '9') {
            this.number(val);
        } else if (val === 'ce' || val === 'c' || val === 'del') {
            this.clear(val);
        } else if (val === '±' || val === '.') {
            this.transform(val);
        } else if (val === '/' || val === '*' || val === '-' || val === '+' || val === '=') {
            this.operation(val);
        }
    }

    number(val) {
        if (this.isNewVal || this.res.value === '0') {
            this.res.value = val;
            this.isNewVal = false;
        } else {
            this.res.value += val;
        }
    
        const num = res.value;
    }

    clear(val) {
        switch (val) {
            case 'c':
                this.hist.innerText = '';
                this.lastOp = '';
    
            case 'ce':
                this.isNewVal = true;
                this.res.value = '0';
            break;
    
            case 'del':
                if (this.res.value.length === 1) {
                    this.res.value = '0';
                    this.isNewVal = true;
                } else {
                    this.res.value = this.res.value.slice(0, -1);
                }
        }
    }

    transform(val) {
        switch (val) {
            case '±':
                if (this.res.value === '0' || this.isNewVal) {
                    return;
                }
    
                this.res.value = ~this.res.value.indexOf('-') ? 
                    this.res.value.slice(1) : 
                    '-' + this.res.value;
            break;
    
            case '.':
                if (this.isNewVal) {
                    this.res.value = 0;
                }
    
                if (!~this.res.value.indexOf('.')) {
                    this.res.value += '.';
                    this.isNewVal = false;
                }
        }
    }

    operation(op) {
        const newNum = Number(this.res.value);
    
        if (this.lastOp && !this.isNewVal) {
            this.total = Function('a, b', 'return a ' + this.lastOp + ' b;')(this.total, newNum);
            this.res.value = this.total;
        }
    
        if (this.hist.innerText) {
            if (this.isNewVal) {
                this.hist.innerText = this.hist.innerText.slice(0, -2) + ' ' + op;
            } else {
                this.hist.innerText += ' ' + newNum + ' ' + op;  
            }
        } else {
            this.hist.innerText = newNum + ' ' + op;
            this.total = newNum;
        }
    
        this.isNewVal = true;
    
        if (op === '=') {
            this.hist.innerText = '';
            this.lastOp = '';
        } else {
            this.lastOp = op;
        }
    }
}

const Ocalc = new Calculator(calc, hist, res, btnClass);
