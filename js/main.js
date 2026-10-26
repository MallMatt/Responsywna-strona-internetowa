/* zLab6: skrypt korzysta z DOM, pobiera elementy strony
   oraz wykonuje operacje na ich zawartości. */

/* Uruchomienie kodu po pełnym załadowaniu dokumentu HTML. */
document.addEventListener('DOMContentLoaded', function () {

  /* Wyświetlenie informacji w konsoli przeglądarki. */
  console.log('Projekt akwarystyczny uruchomiony');

  /* Uruchomienie modułu SPA. */
  setupSpa();

  /* Uruchomienie kalkulatora pojemności akwarium. */
  setupCalculator();

  /* Uruchomienie walidacji formularza. */
  setupFormValidation();

  /* Uruchomienie obsługi Local Storage i Session Storage. */
  setupStorage();

  /* Pobranie elementu przeznaczonego do wyświetlenia daty. */
  var dateBox = document.getElementById('todayDate');

  /* Wstawienie aktualnej daty w polskim formacie. */
  if (dateBox) {
    dateBox.textContent =
      new Date().toLocaleDateString('pl-PL');
  }
});


/* 
   SPA
===================================================== */

/* Obsługa prostego mechanizmu Single Page Application. */
function setupSpa() {

  /* Pobranie panelu wyświetlającego treść widoków. */
  var panel = document.getElementById('spaPanel');

  /* Zakończenie działania jeśli panel nie istnieje. */
  if (!panel) return;

  /* Pobranie wszystkich przycisków posiadających
     atrybut data-spa-view. */
  document
    .querySelectorAll('[data-spa-view]')
    .forEach(function (btn) {

      /* Obsługa kliknięcia przycisku. */
      btn.addEventListener('click', function () {

        /* Odczytanie nazwy wybranego widoku. */
        var key =
          btn.getAttribute('data-spa-view');

        /* Pobranie szablonu o podanym identyfikatorze. */
        var template =
          document.getElementById(key);

        /* Komunikat błędu w przypadku braku szablonu. */
        if (!template) {
          panel.innerHTML =
            '<p>Błąd: brak widoku.</p>';
          return;
        }

        /* Wstawienie zawartości szablonu do panelu. */
        panel.innerHTML =
          template.innerHTML;

      });

    });

}


/* 
   KALKULATOR
===================================================== */

/* Obsługa kalkulatora pojemności akwarium. */
function setupCalculator() {

  /* Pobranie przycisku uruchamiającego obliczenia. */
  var button =
    document.getElementById('calcWaterBtn');

  /* Zakończenie działania jeśli przycisk nie istnieje. */
  if (!button) return;

  /* Obsługa kliknięcia przycisku. */
  button.addEventListener('click', function () {

    /* Pobranie długości akwarium. */
    var length =
      Number(document.getElementById('tankLength').value);

    /* Pobranie szerokości akwarium. */
    var width =
      Number(document.getElementById('tankWidth').value);

    /* Pobranie wysokości akwarium. */
    var height =
      Number(document.getElementById('tankHeight').value);

    /* Pobranie pola wyświetlającego wynik. */
    var output =
      document.getElementById('waterResult');

    /* Obliczenie objętości akwarium w litrach. */
    var liters =
      Math.round((length * width * height) / 1000);

    /* Wyświetlenie wyniku obliczeń. */
    if (liters > 0) {

      output.textContent =
        'Pojemność akwarium: ' + liters + ' l';

    } else {

      output.textContent =
        'Wpisz poprawne dane.';

    }

  });

}


/* 
   FORMULARZ
===================================================== */

/* Obsługa walidacji formularza kontaktowego. */
function setupFormValidation() {

  /* Pobranie formularza. */
  var form =
    document.getElementById('contactForm');

  /* Zakończenie działania jeśli formularz nie istnieje. */
  if (!form) return;

  /* Obsługa wysłania formularza. */
  form.addEventListener('submit', function (e) {

    /* Zablokowanie standardowego wysłania formularza. */
    e.preventDefault();

    /* Pobranie adresu e-mail. */
    var email =
      document.getElementById('email').value.trim();

    /* Pobranie imienia. */
    var name =
      document.getElementById('name').value.trim();

    /* Pobranie pojemności akwarium. */
    var tank =
      Number(document.getElementById('liters').value);

    /* Pobranie pola komunikatu. */
    var msg =
      document.getElementById('formMessage');

    /* Sprawdzenie poprawności danych. */
    if (
      name.length < 3 ||
      !email.includes('@') ||
      tank < 10
    ) {

      /* Ustawienie komunikatu ostrzegawczego. */
      msg.className =
        'alert alert-warning mt-3';

      msg.textContent =
        'Błędne dane formularza.';

      return;
    }

    /* Ustawienie komunikatu poprawnego wypełnienia formularza. */
    msg.className =
      'alert alert-success mt-3';

    msg.textContent =
      'OK – dane poprawne.';

  });

}


/* 
   LOCAL STORAGE I SESSION STORAGE
===================================================== */

/* Obsługa zapisu danych w pamięci przeglądarki. */
function setupStorage() {

  /* Pobranie formularza. */
  var form =
    document.getElementById('storageForm');

  /* Zakończenie działania jeśli formularz nie istnieje. */
  if (!form) return;

  /* Pobranie listy zapisanych danych. */
  var list =
    document.getElementById('storageList');

  /* Pobranie pola wyświetlającego dane sesji. */
  var sessionInfo =
    document.getElementById('sessionInfo');

  /* Pobranie przycisku usuwania danych. */
  var clearBtn =
    document.getElementById('clearStorage');


  /* Funkcja odświeżająca zawartość listy. */
  function render() {

    /* Odczyt zapisanych danych z Local Storage. */
    var saved =
      JSON.parse(
        localStorage.getItem('fishPlans') || '[]'
      );

    /* Wyczyszczenie listy. */
    list.innerHTML = '';

    /* Komunikat wyświetlany przy braku danych. */
    if (!saved.length) {
      list.innerHTML =
        '<li>Brak danych</li>';
    }

    /* Dodanie wszystkich zapisanych elementów do listy. */
    saved.forEach(function (item) {

      var li =
        document.createElement('li');

      li.textContent =
        item.name +
        ' - ' +
        item.liters +
        'l - ' +
        item.food;

      list.appendChild(li);

    });

    /* Wyświetlenie danych zapisanych w Session Storage. */
    sessionInfo.textContent =
      sessionStorage.getItem('lastPlan')
      ||
      'Brak danych w sesji';

  }


  /* Obsługa wysłania formularza. */
  form.addEventListener('submit', function (e) {

    /* Zablokowanie przeładowania strony. */
    e.preventDefault();

    /* Utworzenie nowego obiektu z danymi formularza. */
    var item = {

      name:
        document.getElementById('fishName')
        .value.trim(),

      liters:
        document.getElementById('fishLiters')
        .value,

      food:
        document.getElementById('fishFood')
        .value

    };

    /* Pobranie aktualnej listy zapisanych danych. */
    var saved =
      JSON.parse(
        localStorage.getItem('fishPlans') || '[]'
      );

    /* Dodanie nowego elementu do tablicy. */
    saved.push(item);

    /* Zapis tablicy do Local Storage. */
    localStorage.setItem(
      'fishPlans',
      JSON.stringify(saved)
    );

    /* Zapis ostatnio dodanego planu do Session Storage. */
    sessionStorage.setItem(
      'lastPlan',
      'Ostatni plan: ' + item.name
    );

    /* Wyczyszczenie formularza. */
    form.reset();

    /* Odświeżenie listy danych. */
    render();

  });


  /* Obsługa przycisku usuwania danych. */
  clearBtn.addEventListener('click', function () {

    /* Usunięcie danych z Local Storage. */
    localStorage.removeItem('fishPlans');

    /* Usunięcie danych z Session Storage. */
    sessionStorage.removeItem('lastPlan');

    /* Odświeżenie widoku. */
    render();

  });


  /* Wyświetlenie danych podczas uruchamiania strony. */
  render();

}