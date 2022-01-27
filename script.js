"use strict";
const square = document.querySelector(".cube");
const animate = ({ timing, draw, duration }) => {
  let start = performance.now();
  requestAnimationFrame(function animate(time) {
    // timeFraction изменяется от 0 до 1
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) {
      timeFraction = 1;
    }
    // вычисление текущего состояния анимации
    let progress = timing(timeFraction);
    draw(progress); // отрисовать её
    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }
  });
};
const getCounterSmoothAnimate = (num, square) => {
  animate({
    duration: 5000,
    timing(timeFraction) {
      return timeFraction;
    },
    draw(progress) {
      square.style.left = Math.round(num * progress) + "px";
      if (square.style.left === "1790px") {
        square.style.left = 0;
        getCounterSmoothAnimate(
          document.documentElement.clientWidth - 130,
          square
        );
      }
      square.style.top = Math.round(num * 0.2 * progress) + "px";
      square.style.transform = `rotate(${Math.round(num * progress)}deg)`;
    },
  });
};
getCounterSmoothAnimate(document.documentElement.clientWidth - 130, square);
