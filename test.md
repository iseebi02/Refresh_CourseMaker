<ul>
    <li><a href="top.html">コース作成機能はこちら</a></li>
<ul>

<div id="top">
    <h1>ページTOP</h1>
    <p>コース閲覧機能</p>
</div>

<ul>
    <li><a href="contact.html#contact">お問い合わせはこちら</a></li>
</ul>

<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8" />
  <title>sample</title>
  <style>
    #wrapper {
      height: 190px;
      width: 200px;
      overflow-y: scroll;
    }
function canBrowserShareFiles() {
  if (!navigator.share || !navigator.canShare) {
    return false;
  }

  // ファイルで検査用のデータを作成し、ブラウザーが共有に対応しているかどうかを調べます。
  const testFile = new File(["foo"], "foo.txt", { type: "text/plain" });
  const data = { files: [testFile] };

  return navigator.canShare(data);
}

// DOM からボタンを取得します。ボタンはこれで非表示になります。
const button = document.querySelector("#share");

if (canBrowserShareFiles()) {
  // このブラウザーはファイルの共有に対応しています。ボタンを表示します
  button.style.display = "inline";

  // ボタンがクリックされるのを待ち受けし、ファイルを共有します。
  button.addEventListener("click", async () => {
    try {
      // 共有するファイルを取得します。
      // この関数は、File オブジェクトを返す必要があります。
      // これはおそらく動的に作成するか、 IndexedDB から取得します。
      const file = await getTheFileToShare();

      await navigator.share({
        title: "My shared file",
        files: [file],
      });

      console.log("ファイルの共有に成功しました。");
    } catch (err) {
      console.error(`ファイルの共有ができませんでした: ${err}`);
    }
  </style>
</head>

<body>
  <div id="wrapper">
    <div id="contents">
      あいうえお<br>
      かきくけこ<br>
      さしすせそ<br>
      たちつてと<br>
      なにぬねの<br>
      はひふへほ<br>
      まみむめも<br>
      や　ゆ　よ<br>
      らりるれろ<br>
      わ　　　を<br>
      ん
    </div>
  </div>
</body>

</html>  });
}