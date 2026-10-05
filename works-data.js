/* Shared archive. Paths are relative to the site root.
 * One entry = one artwork; videos and experiences belong inside that entry.
 * Replace null URLs with published URLs. Unpublished items remain non-clickable.
 */
// Series are independent of formats and publishing destinations.
const studioSeries = {
  PLACES: '存在しない場所に、ひとりで滞在する。',
  ROOMS: '現実には存在しない、しかしどこかにありそうな部屋・家・ホテルを扱うシリーズ。',
  BEYOND: '日常の風景に、巨大な存在が静かに侵入する。',
  SPECIMEN: '光、物質、現象、痕跡を標本として保存・提示する。',
  OBJECTS: '架空の世界に存在しそうな物質・立体物を現実へ持ち出す。',
};
const studioWorks = [
  {
    id: 'hitori-001', page: 'works/hitori-001.html', series: 'PLACES', number: '001',
    published: true, featured: true,
    title: '眠る水の回廊', titleEn: 'Corridor of Sleeping Water',
    year: '2026', formats: ['FILM'],
    thumbnail: 'assets/hitori-001/thumbnail_ambient_001.png', width: 1920, height: 1080,
    alt: '白い回廊の中央を流れる水面と柔らかな光 — 眠る水の回廊',
    description: '光を映す水面と、誰もいない回廊。ひとりで静かに過ごす時間のための映像作品です。音や長さの異なる映像を、ひとつの場所の異なる入口として展開します。',
    placeholder: true, archive: false,
    links: [],
    videos: [
      { title: 'BGM / 1 Hour', kind: 'long', thumbnail: 'assets/hitori-001/thumbnail_bgm_001.png', width: 1920, height: 1080, alt: '白いベンチと水面、霧の中に佇む柱 — BGM / 1 Hour', url: null },
      { title: 'Ambient / 1 Hour', kind: 'long', thumbnail: 'assets/hitori-001/thumbnail_ambient_001.png', width: 1920, height: 1080, alt: '白い回廊の中央を流れる水面と柔らかな光 — Ambient / 1 Hour', url: null },
      { title: 'BGM / 1 Hour BGM Short', kind: 'short', thumbnail: 'assets/hitori-001/thumbnail_shorts_bgm_001.png', width: 1080, height: 1920, alt: 'HITORI 眠る水の回廊、白いベンチの縦長ポスター — BGM Short', url: null },
      { title: 'BGM / 1 Hour Ambient Short', kind: 'short', thumbnail: 'assets/hitori-001/thumbnail_shorts_ambient_001.png', width: 1080, height: 1920, alt: 'HITORI 眠る水の回廊、水の回廊の縦長ポスター — Ambient Short', url: null },
      { title: 'Poster Short', kind: 'short', thumbnail: 'assets/hitori-001/thumbnail_shorts_poster_001.png', width: 1080, height: 1920, alt: '存在しない場所で、ひとり。水と光の風景を並べたHITORIポスター', url: null },
    ],
  },
  {
    id: 'beyond-01', page: 'works/beyond-01.html', series: 'BEYOND', number: '01',
    published: false, featured: false,
    title: 'THE WALKER', titleEn: 'THE WALKER',
    year: '2026', formats: ['AR', 'INSTALLATION'],
    thumbnail: 'assets/beyond-01/thumbnail_001_01.png', width: 1080, height: 1528,
    alt: '淡い黄色と緑の空、幾重にも重なる山々を歩く人影 — BEYOND The Walker',
    description: '日常の風景に、巨大な存在が静かに侵入する。THE WALKERは、現実と架空のあいだを歩く存在を、AR、Web、展示へ展開する作品です。',
    placeholder: true, archive: false,
    links: [
      { title: 'AR Experience', url: null },
      { title: 'Web Edition', url: null },
      { title: 'Exhibition Version', url: null },
      { title: 'Documentation', url: null },
    ],
    videos: [],
  },
];
