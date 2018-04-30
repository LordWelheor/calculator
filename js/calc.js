'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var calc = document.getElementById('calc'),
    hist = document.getElementById('history'),
    res = document.getElementById('result'),
    btnClass = 'js-btn';

var Calculator = function () {
    function Calculator(body, hist, res, btnClass) {
        _classCallCheck(this, Calculator);

        this.body = body;
        this.hist = hist;
        this.res = res;
        this.btnClass = btnClass;
        this.total = 0;
        this.lastOp = '';
        this.isNewVal = true;
        this.body.addEventListener('click', this.onClickCalculator.bind(this));
    }

    _createClass(Calculator, [{
        key: 'onClickCalculator',
        value: function onClickCalculator(ev) {
            var el = ev.target;
            if (!el.classList.contains(this.btnClass)) {
                return;
            }

            this.route(el.textContent);
        }
    }, {
        key: 'route',
        value: function route(val) {
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
    }, {
        key: 'number',
        value: function number(val) {
            if (this.isNewVal || this.res.value === '0') {
                this.res.value = val;
                this.isNewVal = false;
            } else {
                this.res.value += val;
            }

            var num = res.value;
        }
    }, {
        key: 'clear',
        value: function clear(val) {
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
    }, {
        key: 'transform',
        value: function transform(val) {
            switch (val) {
                case '±':
                    if (this.res.value === '0' || this.isNewVal) {
                        return;
                    }

                    this.res.value = ~this.res.value.indexOf('-') ? this.res.value.slice(1) : '-' + this.res.value;
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
    }, {
        key: 'operation',
        value: function operation(op) {
            var newNum = Number(this.res.value);

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
    }]);

    return Calculator;
}();

var Ocalc = new Calculator(calc, hist, res, btnClass);