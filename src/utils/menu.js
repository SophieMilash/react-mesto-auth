export function toggleHeaderBurger() {
  const headerBurgerLines = document.querySelectorAll('.header__burger-line');
  const headerInfoWrap = document.querySelector('.header__info-wrap');

  headerBurgerLines.forEach(line => {
    line.classList.toggle('header__burger-line_active');
  });
  headerInfoWrap.classList.toggle('header__info-wrap_hidden');
}
