window.onload = () => {
	document.querySelectorAll("textarea").forEach((e) => e.addEventListener("input", $108a, false));
	document.querySelector("textarea#input").addEventListener(
		"change",
		(e) => {
			document.querySelector("textarea#output").value = $a70f(e);
		},
		false
	);
};
function $108a(e) {
	if (e) {
		e.target.style.height = e.target.value.split("\n").length + 1 + "em";
	} else {
		document.querySelectorAll("textarea").forEach((e) => (e.style.height = e.value.split("\n").length + 1 + "em"));
	}
}
function $af47(dt) {
	if (!dt) {
		dt = Date.now();
	}
	dt = new Date(dt);
	const a = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
		b = [];
	[dt.getFullYear(), dt.getMonth() + 1, dt.getDate(), a[dt.getDay()], dt.getHours(), dt.getMinutes(), dt.getSeconds(), dt.getMilliseconds()].forEach((e, i) => {
		b.push(String(e).padStart("42232224"[i], 0));
	});
	return b;
}
function $a70f(s) {
	if (!s) {
		s = `東京⇒京都河原町
		2024年02月25日
		06:00 ⇒ 10:13
		------------------------------
		所要時間　4時間13分
		運賃[IC優先] 17,150円
		乗換　6回
		距離　569.2km
		------------------------------

		■東京
		↓ 06:00～07:34
		↓ ＪＲ新幹線のぞみ1号(N700系)  博多行
		↓ 14番線発 → 17番線着
		■名古屋
		↓ 07:52～08:03
		↓ ＪＲ東海道本線新快速  大垣行
		↓ 6番線発 → 3・4番線着
		■尾張一宮
		↓ 08:06～08:07
		↓ 徒歩
		■名鉄一宮
		↓ 08:10～08:17
		↓ 名鉄名古屋本線特急  名鉄岐阜行
		↓ 2番線着
		■笠松
		↓ 08:21～08:46
		↓ 名鉄名古屋本線快速特急  豊橋行
		↓ 3番線発 → 4番線着
		■名鉄名古屋
		↓ 08:48～08:52
		↓ 徒歩
		■名古屋
		↓ 09:10～09:44
		↓ ＪＲ新幹線のぞみ11号(N700S系)  博多行
		↓ 17番線発 → 13番線着
		■京都
		↓ 09:58～10:01
		↓ 京都市営烏丸線急行  国際会館行
		↓ 2番線発 → 2番線着
		■四条(京都市営)
		↓ 10:04～10:05
		↓ 徒歩
		■烏丸
		↓ 10:11～10:13
		↓ 阪急京都本線特急  京都河原町行
		↓ 1番線発
		■京都河原町
		---
		(運賃内訳)
		東京～尾張一宮　6,600円
		名鉄一宮～笠松　300円
		笠松～名鉄名古屋　510円
		名古屋～京都　2,640円
		京都～四条(京都市営)　220円
		烏丸～京都河原町　170円
		東京～名古屋　4,180円 (特急料金)
		名古屋～京都　2,530円 (特急料金)

		★PC・スマホでこの検索結果を見る
		https://yahoo.jp/vr2e8B

		[Yahoo!乗換案内]
		↓アプリのダウンロードはこちらから
		https://transit.yahoo.co.jp/smartphone/app/?referrer=app_share

		※定期代やチケット設定が含まれた検索結果は個人の設定に依存するため、上記の文面やリンク先の経路・料金が、送信元と受取先で一致しない場合がございますのでご注意ください。
		`;
	} else {
		s = s.target.value;
	}
	const a = s.split("\n\n")[1].split("---")[0];

	const lines = a
		.trim()
		.split(/\n+/)
		.map((e) => e.trim());
	printf(lines, 103);

	let result = [];
	let currentTrip = {};

	lines.forEach((line) => {
		if (line.startsWith("■")) {
			if (Object.keys(currentTrip).length !== 0 && currentTrip.arr.station) {
				result.push(currentTrip);
			}
			currentTrip = { dep: {}, arr: {} };
			currentTrip.dep.station = line.substring(1).trim();
		} else if (line.startsWith("↓")) {
			const info = line.substring(2).trim();
			if (info.includes("～")) {
				const [depTime, arrTime] = info.split("～");
				currentTrip.dep.time = depTime;
				currentTrip.arr.time = arrTime;
			} else if (info.includes("番線") || info.includes("のりば")) {
				let depPlatform = "",
					arrPlatform = "";
				if (info.includes("→")) {
					[depPlatform, arrPlatform] = info.split("→").map((e) => e.trim());
				} else if (info.includes("発")) {
					depPlatform = info.replace("発", "");
				} else {
					arrPlatform = info.replace("着", "");
				}
				currentTrip.dep.platform = depPlatform.replace("発", "");
				currentTrip.arr.platform = arrPlatform.replace("着", "");
				currentTrip.arr.station = currentTrip.dep.station;
			} else {
				currentTrip.info = info;
			}
		}
	});

	if (Object.keys(currentTrip).length !== 0 && currentTrip.arr.station) {
		result.push(currentTrip);
	}

	for (let i = 0; i < result.length - 1; i++) {
		result[i].arr.station = result[i + 1].dep.station;
	}

	if (lines.length > 0) {
		const lastStationLine = lines[lines.length - 1];
		const lastStationName = lastStationLine.substring(1).trim();
		result[result.length - 1].arr.station = lastStationName;
	}
	printf(result, 145);

	result = result
		.map((trip, index) => {
			let depPrefix,
				arrPrefix,
				depSuffix = "",
				arrSuffix = "";
			printf([trip, index], 166);
			if (index === 0) {
				depPrefix = "▼";
				arrPrefix = "□";
				depSuffix = "【" + trip.dep.station + "】";
				if (index === result.length - 1) {
					arrPrefix = "■";
				}
				arrSuffix = "【" + trip.arr.station + "】";
			} else if (index === result.length - 1) {
				depPrefix = "▽";
				if (index === 0) {
					depPrefix = "▼";
					depSuffix = "【" + trip.dep.station + "】";
				}
				arrPrefix = "■";
				arrSuffix = "【" + trip.arr.station + "】";
			} else {
				depPrefix = "▽";
				arrPrefix = "□";
				arrSuffix = "【" + trip.arr.station + "】";
			}
			return `${depPrefix} ${trip.dep.time}発 ${trip.dep.platform}${depSuffix}\n> ${trip.info}\n${arrPrefix} ${trip.arr.time}着 ${trip.arr.platform}${arrSuffix}`;
		})
		.join("\n");
	printf(result, 177);
	return result;
}

function printf(s, l) {
	if (Array.isArray(s)) {
		s = JSON.stringify(s, null, "\t");
	}
	if (typeof s != "string") {
		s = String(s);
	}
	console.log(s + "\n\n" + l);
	s = s.split("\n").map((e) => "".padStart(28, " ") + " | " + e);
	s[0] = $af47().join("-") + " | " + s[0].substring(31, s[0].length);
	s = s.join("\n") + "\n";
	let e = document.querySelector("textarea#log");
	e.value += s + "\n";
	e.scrollTop = e.scrollHeight;
}
printf($a70f(), 196);
$108a();
