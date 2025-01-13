<template>
  <ul class="patch-notes">
    <li class="patch-notes__patch-wrapper">
      <h3 class="patch-notes__patch-version">Версия 2.0.1</h3>
      <ol class="patch_notes__patch-features-wrapper">
        <li class="patch_notes__patch-feature">
          Увеличена прозрачность спрайтов по краям для эффектов 'pscyhopathic'
          фанфиков
        </li>
        <li class="patch_notes__patch-feature">
          Слегка увеличен размер спрайтов по краям для эффектов 'pscyhopathic'
          фанфиков, а также синхронизирована частота их появления слева и справа
        </li>
        <li class="patch_notes__patch-feature">
          Изменено заполнение ищображения Рими в эффектах для 'psychopathic'
          фанфиков, чтобы оно умещалось в экран любого устройства
        </li>
      </ol>
    </li>
    <li class="patch-notes__patch-wrapper">
      <h3 class="patch-notes__patch-version">Версия 2.0.0</h3>
      <ol class="patch_notes__patch-features-wrapper">
        <li class="patch_notes__patch-feature">
          Написан четвёртвый фанфик (gamma-1)
        </li>
        <li class="patch_notes__patch-feature">
          Все существующие фанфики были перенесены из JSON-файлов в удалённую
          базу данных
        </li>
        <li class="patch_notes__patch-feature">
          Общая информация о всех фанфиках динамически подгружается в приложение
          на фоне, а затем кэшируется в глобальном состоянии сессии (до
          обновления страницы)
        </li>
        <li class="patch_notes__patch-feature">
          Тело каждого фанфика динамически подгружается при переходе на страницу
          фанфика, а затем кэшируется в глобальном состоянии сессии (до
          обновления страницы)
        </li>
        <li class="patch_notes__patch-feature">
          Добавлены флаги и соответствующие бэйджи для фанфиков: 'top secret',
          'hentai', 'psychopathic'
        </li>
        <li class="patch_notes__patch-feature">
          Для фанфиков с флагом 'psychopathic' добавлены специальные эффекты на
          странице
        </li>
        <li class="patch_notes__patch-feature">
          Внедрено ограничение на загрузку тел фанфиков из запретной секции (с
          флагом 'top secret'), которое могут обойти лишь пользователи с особым
          доступом, который может дать только Шист
        </li>
        <li class="patch_notes__patch-feature">
          Обработны состояния загрузок и ошибок при загрузке фанфиков и их тел
        </li>
        <li class="patch_notes__patch-feature">
          Обработана ошибка 403 (нет особого доступа) для фанфиков из запретной
          секции, а также добавлены ссылки на социальные сети Шиста для контакта
        </li>
        <li class="patch_notes__patch-feature">
          Внедрена регистрация/авторизация новых пользователей через
          почту/пароль
        </li>
        <li class="patch_notes__patch-feature">
          Добавлены валидаторы для почты и пароля перед регистрацией
        </li>
        <li class="patch_notes__patch-feature">
          Добавлены правила переходов между страницами (route guards) на основе
          текущей авторизации пользователя
        </li>
        <li class="patch_notes__patch-feature">
          Добавлено бургер-меню с текущей информацией об аккаунте (почта и
          наличие особого доступа), а также опциями
        </li>
        <li class="patch_notes__patch-feature">
          Добавлена возможность зайти или выйти из аккаунта через бургер-меню
        </li>
        <li class="patch_notes__patch-feature">
          Добавлена светлая тема, а также переключитель между темами в
          бургер-меню (тема сохраняется в кэш браузера)
        </li>
        <li class="patch_notes__patch-feature">
          Добавлена возможность отключить/включить специальные эффекты для
          psychopathic и hentai фанфиков (настройка сохраняется в кэш браузера)
        </li>
        <li class="patch_notes__patch-feature">
          Добавленая опция для просмотра последних обновлений приложения в
          бургер-меню, а также модальное окно с напоминанием об этом (если
          пользователь запускает приложение впервые)
        </li>
        <li class="patch_notes__patch-feature">
          Приложение передеплоено с домена `https://shist-fanfics.vercel.app/`
          на домен `https://shist-fanfics.web.app/`
        </li>
      </ol>
    </li>
    <li class="patch-notes__patch-wrapper">
      <h3 class="patch-notes__patch-version">Версия 1.3.0</h3>
      <ol class="patch_notes__patch-features-wrapper">
        <li class="patch_notes__patch-feature">
          Добавлено отображение текущей версии в footer приложения
        </li>
        <li class="patch_notes__patch-feature">
          Улучшены стили при наведении на карточки с фанфиками
        </li>
        <li class="patch_notes__patch-feature">
          Изменены внутренние отступы для карточек с фанфиками
        </li>
      </ol>
    </li>
    <li class="patch-notes__patch-wrapper">
      <h3 class="patch-notes__patch-version">Версия 1.2.0</h3>
      <ol class="patch_notes__patch-features-wrapper">
        <li class="patch_notes__patch-feature">
          Написан третий фанфик (alpha-2), помещён в JSON-файл
        </li>
        <li class="patch_notes__patch-feature">
          Header приложения зафиксирован при скролле вниз
        </li>
        <li class="patch_notes__patch-feature">
          Header приложения сделан полупрозрачным при скролле вниз
        </li>
      </ol>
    </li>
    <li class="patch-notes__patch-wrapper">
      <h3 class="patch-notes__patch-version">Версия 1.1.0</h3>
      <ol class="patch_notes__patch-features-wrapper">
        <li class="patch_notes__patch-feature">
          Добавлена страница с карточками всех фанфиков
        </li>
        <li class="patch_notes__patch-feature">
          Добавлена отдельная страница для отображения каждого фанфика
        </li>
        <li class="patch_notes__patch-feature">
          Написан второй фанфик (delta-1), помещён в JSON-файл
        </li>
        <li class="patch_notes__patch-feature">
          Контент первого фанфика перемещён из страницы в JSON-файл
        </li>
        <li class="patch_notes__patch-feature">
          Внедрена логика подгрузки фанфиков на страницу из JSON-файлов
        </li>
      </ol>
    </li>
    <li class="patch-notes__patch-wrapper">
      <h3 class="patch-notes__patch-version">Версия 1.0.0</h3>
      <ol class="patch_notes__patch-features-wrapper">
        <li class="patch_notes__patch-feature">Создан проект</li>
        <li class="patch_notes__patch-feature">
          Добавлена единственная страница с текстом единственного фанфика
        </li>
        <li class="patch_notes__patch-feature">
          Добавлени стили (только для тёмной темы)
        </li>
        <li class="patch_notes__patch-feature">Добавлена NotFound страница</li>
        <li class="patch_notes__patch-feature">
          Написан первый фанфик (alpha-1)
        </li>
        <li class="patch_notes__patch-feature">
          Приложение задеплоено на домен `https://shist-fanfics.vercel.app/`
        </li>
      </ol>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.patch-notes {
  padding: 5px;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  &__patch-wrapper {
    .patch-notes__patch-version {
      @include default-headline(32px, 32px, var(--color-modal-text));
      margin-bottom: 10px;
      @media (max-width: $tablet-l) {
        font-size: 20px;
        line-height: 20px;
      }
    }
    .patch_notes__patch-features-wrapper {
      display: flex;
      flex-direction: column;
      row-gap: 10px;
      list-style-type: decimal;
      list-style-position: inside;
      .patch_notes__patch-feature {
        @include default-text(16px, 16px, var(--color-burger-menu-text));
        @media (max-width: $tablet-l) {
          font-size: 12px;
          line-height: 12px;
        }
      }
    }
  }
}
</style>
