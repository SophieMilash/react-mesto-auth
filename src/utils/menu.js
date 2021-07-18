export function toggleHeaderBurger() {
  const headerBurgerLines = document.querySelectorAll('.header__burger-line');
  const headerInfoWrap = document.querySelector('.header__info-wrap');

  headerBurgerLines.forEach(line => {
    line.classList.toggle('header__burger-line_active');
  });
  headerInfoWrap.classList.toggle('header__info-wrap_hidden');
}

export function switchClass() {
  const headerInfoWrap = document.querySelector('.header__info-wrap');
  const headerBurgerLines = document.querySelectorAll('.header__burger-line');
  const headerBurgerLineActive = document.querySelector('.header__burger-line_active');
  const mobileWidth = 575;

  if (window.innerWidth <= mobileWidth && headerInfoWrap) {
    headerInfoWrap.classList.add('header__info-wrap_hidden');
  } else if (window.innerWidth > mobileWidth && headerInfoWrap && headerInfoWrap.classList.contains('header__info-wrap_hidden')) {
    headerInfoWrap.classList.remove('header__info-wrap_hidden');
  } else if (headerBurgerLineActive) {
    headerBurgerLines.forEach(line => {
      line.classList.remove('header__burger-line_active');
    });
  }
}
