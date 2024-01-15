// var i = 0;
// var a = 0;
// var txt = "Idail";
// var txt2 = "Ferreira";
// var velocidade = 50;

// function exibe_texto()
// {
//     if(i < txt.length)
//     {
//         document.getElementById("texto_informmacoes_implementacoes").appendChild += txt.charAt(i);
//         i++;
//         setTimeout(exibe_texto,velocidade);
//         if(txt.length === 0)
//         {
//             exibe_texto2();
//         }
//     }

    
// }

// function exibe_texto2()
// {
//     if(a < txt2.length)
//     {
//         document.getElementById("texto_informmacoes_implementacoes").appendChild += txt2.charAt(i);
//         a++;
//         setTimeout(exibe_texto2,velocidade);
//     }
// }

var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="texto">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }

    setTimeout(function() {
    that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
};