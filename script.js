// Shared helpers work on both the entrance and artwork pages, including file://.
const siteRoot = new URL('.', document.currentScript.src);
const assetUrl = (path) => new URL(path, siteRoot).href;

function textElement(tag, className, text) {
  const element = document.createElement(tag);
  element.className = className;
  element.textContent = text;
  return element;
}

function createImage(item, className, eager = false) {
  const image = document.createElement('img');
  image.className = className;
  image.src = assetUrl(item.thumbnail);
  image.alt = item.alt || item.title;
  image.width = item.width;
  image.height = item.height;
  image.loading = eager ? 'eager' : 'lazy';
  image.decoding = 'async';
  return image;
}

function detailUrl(work) {
  return assetUrl(work.page || `works/detail.html?work=${encodeURIComponent(work.id)}`);
}

function selectWorks(series = 'ALL', format = 'ALL') {
  return studioWorks.filter(work => work.published === true && (series === 'ALL' || work.series === series)
    && (format === 'ALL' || work.formats.includes(format)));
}

function createWork(work) {
  const figure = document.createElement('a');
  figure.href = detailUrl(work);
  figure.className = `work${work.height > work.width ? ' work--portrait' : ''}`;
  figure.append(createImage(work, 'work-image'));
  const caption = document.createElement('div');
  caption.className = 'work-caption';
  const number = textElement('span', 'work-number', `${work.series} ${work.number}`);
  const information = document.createElement('div');
  const title = document.createElement('h3');
  title.className = 'work-title';
  title.textContent = work.title;
  const details = document.createElement('p');
  details.className = 'work-details';
  for (const value of [work.year, work.formats.join(' / ')]) {
    const span = document.createElement('span');
    span.textContent = value;
    details.append(span);
  }
  information.append(title, details);
  if (work.placeholder) {
    const label = document.createElement('span');
    label.className = 'placeholder-label';
    label.textContent = '仮展示';
    information.append(label);
  }
  caption.append(number, information);
  figure.append(caption);
  return figure;
}

function initExhibition() {
  const gallery = document.getElementById('works-gallery');
  if (!gallery) return;
  const featured = gallery.dataset.selection === 'featured';
  const seriesNames = Object.keys(studioSeries);
  const index = document.getElementById('series-index');
  if (index) index.replaceChildren(...seriesNames.map(series => {
    const link = textElement('a', '', series);
    link.href = assetUrl(`works.html?series=${encodeURIComponent(series)}`);
    return link;
  }));
  const filters = document.getElementById('works-filters');
  if (filters) {
    filters.replaceChildren(...['ALL', ...seriesNames].map(series => {
      const button = textElement('button', '', series);
      button.type = 'button';
      button.dataset.series = series;
      button.setAttribute('aria-controls', 'works-gallery');
      button.setAttribute('aria-pressed', String(series === 'ALL'));
      return button;
    }));
  }
  const buttons = document.querySelectorAll('[data-series]');
  const render = (series) => {
    const selected = featured ? selectWorks().filter(work => work.featured === true).slice(0, 5) : selectWorks(series);
    gallery.replaceChildren(...selected.map(createWork));
    if (!selected.length) gallery.append(textElement('p', 'empty-state', featured ? '次の作品を、ここに。' : 'このシリーズの作品は、これから展示していきます。'));
    document.getElementById('works-status').textContent = `${series}：${selected.length}作品`;
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.series === series)));
    initQuietReveal('.work');
  };
  buttons.forEach(button => button.addEventListener('click', () => render(button.dataset.series)));
  const requestedSeries = new URLSearchParams(window.location.search).get('series');
  render(!featured && seriesNames.includes(requestedSeries) ? requestedSeries : 'ALL');
}

function initQuietReveal(selector = '.about-content') {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.08 });
  document.querySelectorAll(selector).forEach((element) => {
    element.classList.add('reveal-ready');
    observer.observe(element);
  });
}

function createRelatedItem(item, isVideo) {
  const element = document.createElement(item.url ? 'a' : 'div');
  element.className = isVideo ? 'video-item' : 'experience-item';
  if (item.url) {
    element.href = item.url;
    element.target = '_blank';
    element.rel = 'noopener noreferrer';
    element.setAttribute('aria-label', `${item.title}（${isVideo ? 'YouTube・' : ''}新しいタブで開く）`);
  }
  if (isVideo) {
    const visual = document.createElement('div');
    visual.className = 'video-visual';
    visual.append(createImage(item, `video-thumbnail${item.height > item.width ? ' video-thumbnail--portrait' : ''}`));
    element.append(visual);
  }
  element.append(textElement('h3', 'related-title', item.title));
  element.append(textElement('p', 'related-state', item.url ? (isVideo ? 'YouTube ↗' : 'Open ↗') : '準備中'));
  return element;
}

function initWorkDetail() {
  const container = document.getElementById('work-detail');
  if (!container) return;
  const id = document.body.dataset.work || new URLSearchParams(window.location.search).get('work');
  const work = studioWorks.find(item => item.id === id && item.published === true);
  if (!work) {
    document.title = 'Work | Studio.HITORI';
    container.append(textElement('p', 'detail-description', '現在この作品は公開していません。Works一覧から公開中の作品をお選びください。'));
    return;
  }
  document.title = `${work.series} ${work.number} — ${work.title} | Studio.HITORI`;
  document.querySelector('meta[name="description"]').content = work.description;
  const visual = document.createElement('div');
  visual.className = `detail-visual${work.height > work.width ? ' detail-visual--portrait' : ''}`;
  visual.append(createImage(work, 'work-image', true));
  const information = document.createElement('div');
  information.className = 'detail-information';
  const heading = document.createElement('div');
  heading.append(textElement('p', 'detail-code', `${work.series} ${work.number}`));
  const title = textElement('h1', 'detail-title', work.title);
  title.id = 'detail-title';
  heading.append(title, textElement('p', 'detail-title-en', work.titleEn));
  const body = document.createElement('div');
  const metadata = document.createElement('dl');
  metadata.className = 'detail-metadata';
  metadata.append(textElement('dt', '', 'Year'), textElement('dd', '', work.year),
    textElement('dt', '', 'Format'), textElement('dd', '', work.formats.join(' / ')));
  body.append(metadata, textElement('p', 'detail-description', work.description));
  if (work.placeholder) body.append(textElement('p', 'detail-placeholder', '仮展示 — 作品情報は調整中です。'));
  information.append(heading, body);
  container.append(visual, information);
  const relatedGroups = [
    [work.videos.filter(video => video.kind === 'long'), '関連動画：長尺', true],
    [work.videos.filter(video => video.kind === 'short'), '関連動画：ショート', true],
    [work.videos.filter(video => !['long', 'short'].includes(video.kind)), '関連動画', true],
    [work.links, 'Experiences / Editions', false],
  ];
  for (const [items, label, isVideo] of relatedGroups) {
    if (!items.length) continue;
    const section = document.createElement('section');
    section.className = 'detail-related';
    section.setAttribute('aria-label', label);
    section.append(textElement('h2', '', label));
    if (isVideo) section.append(textElement('p', 'related-note', '公開後、各映像をYouTubeで鑑賞できます（新しいタブで開きます）。'));
    const list = document.createElement('div');
    list.className = isVideo ? 'video-gallery' : 'experience-list';
    list.append(...items.map(item => createRelatedItem(item, isVideo)));
    section.append(list);
    container.append(section);
  }
}

function initBackToTop() {
  const button = document.getElementById('back-to-top');
  if (!button) return;
  const updateVisibility = () => {
    const visible = window.scrollY > 320;
    button.classList.toggle('is-visible', visible);
    button.disabled = !visible;
  };
  window.addEventListener('scroll', updateVisibility, { passive: true });
  window.addEventListener('pageshow', updateVisibility);
  button.addEventListener('click', () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'instant' : 'smooth' });
    // Move keyboard focus to the destination before the control disappears.
    document.querySelector('.wordmark').focus({ preventScroll: true });
  });
  updateVisibility();
}

function createRecord(item) {
  const row = document.createElement(item.url ? 'a' : 'div');
  row.className = 'archive-record';
  if (item.url) row.href = item.url;
  row.append(textElement('span', 'record-year', item.year), textElement('span', 'record-title', item.title));
  row.append(textElement('span', 'record-context', [item.series, item.dates].filter(Boolean).join(' / ')));
  if (item.description) row.append(textElement('p', 'record-description', item.description));
  return row;
}

function initExhibitions() {
  const container = document.getElementById('exhibitions-list');
  if (!container) return;
  for (const [status, label] of [['current', 'CURRENT'], ['past', 'PAST'], ['archive', 'ARCHIVE']]) {
    const entries = studioExhibitions.filter(item => item.status === status);
    // Current is always shown; past/archive appear once there are records.
    if (status !== 'current' && !entries.length) continue;
    const section = document.createElement('section');
    section.className = 'exhibition-group';
    section.setAttribute('aria-label', label);
    section.append(textElement('h3', 'collection-label', label));
    if (entries.length) section.append(...entries.map(createRecord));
    else section.append(textElement('p', 'empty-state', 'いまは、次の展示を準備しています。'));
    container.append(section);
  }
}

function initArchive() {
  const container = document.getElementById('archive-list');
  if (!container) return;
  const records = [
    ...selectWorks().filter(work => work.archive).map(work => ({ ...work, url: detailUrl(work) })),
    ...studioExhibitions.filter(show => ['past', 'archive'].includes(show.status)),
    ...studioArchiveEntries.filter(entry => entry.published !== false && (entry.series !== 'BEYOND' || selectWorks('BEYOND').length > 0)),
  ];
  const years = [...new Set(records.map(item => item.year))].sort((a, b) => String(b).localeCompare(String(a)));
  if (!records.length) container.append(textElement('p', 'empty-state', '記録は、ここから少しずつ。終了した展示や過去の作品を蓄積していきます。'));
  for (const year of years) {
    const section = document.createElement('section');
    section.className = 'archive-year';
    section.append(textElement('h2', '', year), ...records.filter(item => item.year === year).map(createRecord));
    container.append(section);
  }
}

initExhibition();
initWorkDetail();
initExhibitions();
initArchive();
initQuietReveal();
initBackToTop();
document.getElementById('copyright-year').textContent = new Date().getFullYear();
