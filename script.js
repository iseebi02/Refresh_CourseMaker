// 金沢駅の座標
const KANAZAWA_LAT = 36.578055;
const KANAZAWA_LON = 136.647222;

// UI要素取得
const latElem = document.getElementById("lat");
const lonElem = document.getElementById("lon");
const distanceElem = document.getElementById("distance");
const statusElem = document.getElementById("status");

let currentLat = null;
let currentLon = null;

// 位置情報の取得
document.getElementById("getLocationBtn").addEventListener("click", () => {
  if (!navigator.geolocation) {
    statusElem.textContent = "ブラウザが位置情報に対応していません。";
    return;
  }

  statusElem.textContent = "位置情報を取得中...";

  navigator.geolocation.getCurrentPosition(
    (position) => {
      currentLat = position.coords.latitude;
      currentLon = position.coords.longitude;
      latElem.textContent = currentLat.toFixed(6);
      lonElem.textContent = currentLon.toFixed(6);
      const distance = calcDistance(currentLat, currentLon, KANAZAWA_LAT, KANAZAWA_LON);
      distanceElem.textContent = distance.toFixed(1);
      statusElem.textContent = "取得完了！";
    },
    (error) => {
      statusElem.textContent = "位置情報の取得に失敗しました。";
      console.error(error);
    }
  );
});

// 金沢駅までの距離を計算（メートル）
function calcDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // 地球の半径（m）
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lon2 - lon1) * Math.PI / 180;

  const a = Math.sin(Δφ / 2) ** 2 +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // メートル
}

// --- データベースへ送信（ローカルサーバを想定） ---
document.getElementById("saveDataBtn").addEventListener("click", async () => {
  if (!currentLat || !currentLon) {
    alert("位置情報を取得してください。");
    return;
  }

  const data = {
    latitude: currentLat,
    longitude: currentLon,
    timestamp: new Date().toISOString()
  };

  const res = await fetch("/save", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (res.ok) {
    statusElem.textContent = "データを保存しました。";
  } else {
    statusElem.textContent = "保存に失敗しました。";
  }
});
