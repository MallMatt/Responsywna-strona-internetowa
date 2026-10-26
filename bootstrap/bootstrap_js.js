/* JS do komponentów Bootstrap użytych w projekcie:
   menu rozwijane (collapse), karuzela (carousel) oraz okno modalne (modal). */

(function(){

  /* Nasłuchiwanie wszystkich kliknięć wykonanych na stronie. */
  document.addEventListener('click', function(event){

    /* ===================== MENU COLLAPSE ===================== */

    /* Sprawdzenie czy kliknięto element rozwijający menu. */
    var toggle = event.target.closest('[data-bs-toggle="collapse"]');

    if(toggle){

      /* Pobranie elementu wskazanego w atrybucie data-bs-target. */
      var target = document.querySelector(
        toggle.getAttribute('data-bs-target')
      );

      /* Dodanie lub usunięcie klasy show. */
      if(target){
        target.classList.toggle('show');
      }
    }


    /* ===================== MODAL - OTWIERANIE ===================== */

    /* Sprawdzenie czy kliknięto przycisk otwierający modal. */
    var modalOpen =
      event.target.closest('[data-bs-toggle="modal"]');

    if(modalOpen){

      /* Pobranie okna modalnego wskazanego przez data-bs-target. */
      var modal = document.querySelector(
        modalOpen.getAttribute('data-bs-target')
      );

      /* Wyświetlenie modala przez dodanie klasy show. */
      if(modal){
        modal.classList.add('show');
      }
    }


    /* ===================== MODAL - ZAMYKANIE ===================== */

    /* Sprawdzenie czy kliknięto przycisk zamykający modal
       lub przyciemnione tło modala. */
    if(
      event.target.matches('[data-bs-dismiss="modal"]')
      ||
      event.target.classList.contains('modal')
    ){

      /* Wyszukanie aktualnie otwartego modala. */
      var opened =
        event.target.closest('.modal')
        ||
        document.querySelector('.modal.show');

      /* Ukrycie modala przez usunięcie klasy show. */
      if(opened){
        opened.classList.remove('show');
      }
    }


    /* ===================== KARUZELA ===================== */

    /* Sprawdzenie kliknięcia przycisku następnego slajdu. */
    var next =
      event.target.closest('[data-bs-slide="next"]');

    /* Sprawdzenie kliknięcia przycisku poprzedniego slajdu. */
    var prev =
      event.target.closest('[data-bs-slide="prev"]');

    /* Zmiana slajdu po kliknięciu jednego z przycisków. */
    if(next || prev){

      /* Pobranie karuzeli, w której wykonano kliknięcie. */
      var carousel =
        event.target.closest('.carousel');

      /* Przejście do następnego lub poprzedniego slajdu. */
      moveCarousel(
        carousel,
        next ? 1 : -1
      );
    }

  });


  /* ===================== FUNKCJA ZMIANY SLAJDU ===================== */

  function moveCarousel(carousel, dir){

    /* Zakończenie działania jeśli karuzela nie istnieje. */
    if(!carousel){
      return;
    }

    /* Pobranie wszystkich slajdów karuzeli. */
    var items =
      carousel.querySelectorAll('.carousel-item');

    /* Zakończenie działania jeśli nie znaleziono slajdów. */
    if(!items.length){
      return;
    }

    /* Numer aktualnie aktywnego slajdu. */
    var active = 0;

    /* Wyszukanie slajdu posiadającego klasę active. */
    items.forEach(function(item, index){

      if(item.classList.contains('active')){
        active = index;
      }

    });

    /* Usunięcie klasy active z aktualnego slajdu. */
    items[active].classList.remove('active');

    /* Obliczenie indeksu kolejnego slajdu
       oraz ustawienie go jako aktywnego. */
    items[
      (active + dir + items.length) % items.length
    ].classList.add('active');

  }


  /* ===================== AUTOMATYCZNA ZMIANA SLAJDÓW ===================== */

  /* Uruchomienie funkcji co 5 sekund. */
  setInterval(function(){

    /* Wyszukanie wszystkich karuzel posiadających
       atrybut data-bs-ride="carousel". */
    document
      .querySelectorAll(
        '.carousel[data-bs-ride="carousel"]'
      )
      .forEach(function(carousel){

        /* Przejście do następnego slajdu. */
        moveCarousel(carousel, 1);

      });

  }, 5000); /* 5000 ms = 5 sekund */


})(); /* Natychmiastowe uruchomienie funkcji po wczytaniu pliku. */