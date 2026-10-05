# Studio.HITORI

既存試作品を改修した、HTML / CSS / Vanilla JavaScriptの静的サイト。ビルドや外部ライブラリは不要。index.htmlを直接開いて確認できます。

## 構成

- index.html：Entrance / Featured Works（最大5件）/ Exhibitions / About / Contact。
- works.html：公開中の全作品とシリーズフィルター。
- archive.html：過去作品・終了展示・過去の展開。年別の記録。
- works-data.js：作品データと5シリーズの定義。
- exhibitions-data.js：展示と過去の展開のデータ。
- script.js：既存の一覧・詳細・フィルター・動画表示・フェード・Back to Topに展示とArchiveを追加。
- style.css：既存の色・展示配置を維持。5項目のナビは小画面で自然に折り返す。
- works/hitori-001.html：PLACES 001の詳細。旧URLを維持。
- works/beyond-01.html：BEYOND 01の詳細。
- works/detail.html：新しい作品にも利用できる共通詳細。
- assets/：既存の画像。元画像の文字は改変していません。

## ブランド

Studio.HITORI：存在しないものを、つくる。
HITORI：存在しない場所で、ひとり。スタジオ内の作品公開・体験領域。
WorksはBEYOND / SPECIMEN / PLACES / ROOMS / OBJECTS。YouTube・AR・Webは展開媒体でありシリーズではありません。

## 作品・画像・URLの編集

works-data.jsのstudioWorks配列を編集。作品1件につきid、series、number、title、titleEn、year、formats、thumbnail、width、height、alt、description、links、videosを指定します。
pageを省略するとworks/detail.html?work=作品idへリンクし、データ追加だけで一覧・詳細に反映されます。専用ページは既存のシェルHTMLを複製し、bodyのdata-workと初期titleを変更してpageを指定。
シリーズはBEYOND / SPECIMEN / PLACES / ROOMS / OBJECTS。形式はformats配列で管理。
画像パスはサイトルート基準。width / heightは元画像の実寸。代表画像は一覧・詳細で共通です。
動画はvideos内のtitle、thumbnail、width、height、alt、urlを編集。kind: 'long'は長尺、kind: 'short'はショート。縦長サムネイルの1px灰色枠を維持しています。
url: nullは準備中。実際のYouTube動画URLを設定すると新しいタブで開きます。体験・Web・AR等はlinksのtitleとurlを編集。
placeholder: trueは作品情報が暫定であることを表示します。内容を確定したらfalseに変更。
archive: trueかつpublished: trueの場合にArchiveにも掲載。全作品一覧にも引き続き表示されます。
旧id hitori-001と画像フォルダ名は既存リンク互換性のため維持。

## 展示とArchive

exhibitions-data.jsのstudioExhibitionsに追加：
{ id: 'show-001', title: '展示タイトル', year: '2026', status: 'current', dates: '会期', description: '説明', url: null, workIds: ['hitori-001'] }
statusはcurrent / past / archive。公開・終了時に手動更新します。
CURRENTは常に表示。PAST / ARCHIVEは記録がある場合に表示し、past / archiveの展示はArchiveページにも年別に掲載。
過去の展開はstudioArchiveEntriesにtitle、year、series、exhibitionId、urlを追加。シリーズと展示IDを保持し、後から分類UIを接続できます。
現状は0件。架空の展示を追加せず、短い案内と余白を表示。

## Contactと将来の拡張

お問い合わせ先はindex.html内の「Contact URL」コメント直下のhref。Googleフォームは維持。SNSはcontact-links内に追加。
Museum ShopやLABは独立した静的ページとして追加し、共通ナビへリンクを加える構成。Shopの商品情報とBOOTHへの購入リンク、LABの実験ページは作品データとは必要に応じて分離。Three.js / WebARは専用ページのモジュールとして追加し、作品のlinksから接続できます。

## 公開前の確認

- 作品説明・制作年・形式・英題の確定、placeholderの解除。
- YouTube / AR / Web URLの設定。準備中を残す項目の確認。
- HITORI表記を含む既存画像内の文字が現在の公開意図に合うか確認。
- Googleフォームの公開設定と送信動作を確認。
- GitHubへ静的ファイル一式を登録。作業用ファイルを含めない。
- Cloudflare Pagesの公開対象がindex.htmlを含むサイトルートか確認（ビルド不要）。
- 公開プレビューで画像・詳細ページ・ナビ・スマホ・キーボード操作を確認。
- studio-hitori.comのドメイン接続とHTTPSを確認。

この改修ではGitHubへのpushやCloudflare Pagesへの公開は行っていません。

## 公開とFeaturedの管理（今回追加）

PLACES：存在しない場所に、ひとりで滞在する。
ROOMS：現実には存在しない、しかしどこかにありそうな部屋・家・ホテルを扱う別シリーズ。
水の回廊はPLACES 001。id、旧詳細URL、画像フォルダは維持しています。

- published: true：公開。一覧・詳細・Archiveの対象。
- published: false：非公開。データ・HTML・画像を残し、表示対象から除外。
- featured: true：公開作品のうちトップに展示する作品。最大5件。
- featured: false：トップには展示せず、公開中ならworks.htmlで閲覧可能。

Featuredは新着順ではなくstudioWorks配列内の並び順。展示順は配列の順番を入れ替えて調整します。
BEYONDは現在published: false / featured: false。publishedをtrueに変更すると全作品一覧と詳細に戻ります。BEYONDというシリーズ名は公開作品0件でも表示します。トップにも置く場合はfeaturedをtrueにします。
全5シリーズは作品0件でもフィルターを表示。未公開作品はフィルターを通しても表示しません。
非公開の詳細URLには汎用の案内を表示します。静的サイトの表示制御であり、サーバーに置かれたデータ・画像へのアクセス制限ではありません。機密資料は公開ファイルに含めないでください。

### 新しい作品を追加する手順

1. 画像をassets内へ保存。
2. works-data.jsのstudioWorksに1件追加。下記の形を基本にします。
3. 公開するときはpublishedをtrue。トップにも展示するときだけfeaturedをtrue。
4. pageを省略すれば共通詳細ページが使えるため、HTMLの追加は不要です。

```js
{
  id: 'places-002', series: 'PLACES', number: '002',
  published: true, featured: false,
  title: '作品名', titleEn: 'English title', year: '2026',
  formats: ['FILM'],
  thumbnail: 'assets/places-002.jpg', width: 1920, height: 1080,
  alt: '画像の内容', description: '作品説明',
  placeholder: false, archive: false,
  links: [], videos: [],
}
```

動画やAR等は同じ作品のvideos / linksへ追加します。Contact・展示・Archiveの編集箇所は従来どおりです。

## シリーズ索引と初期選択

シリーズ順はworks-data.jsのstudioSeriesの定義順（PLACES / ROOMS / BEYOND / SPECIMEN / OBJECTS）で共通管理。Works一覧では先頭にALLを加えます。
トップのシリーズ索引は同じ定義からリンクを生成。works.html?series=PLACESのように移動し、script.jsがseriesパラメータを読んで初期選択します。未指定・不明な値はALL。View all worksはパラメータなしでALLへ移動。
シリーズの存在とpublishedは独立。BEYONDのフィルターも常時表示し、公開作品0件では控えめな案内を表示します。
