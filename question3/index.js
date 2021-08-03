const http = require("http");

const options = {
  host: "codequiz.azurewebsites.net",
  port: 80,
  path: "/",
  headers: {
    Cookie: "hasCookie=true",
  },
};

function parseArgs() {
  return process.argv.slice(2);
}

function getNav(fundCode) {
  fundCode = fundCode.toLowerCase();

  const request = http.request(options, function (res) {
    var data = "";
    res.on("data", function (chunk) {
      data += chunk;
    });
    res.on("end", function () {
      onReceivedHTML(data);
    });
  });

  request.on("error", function (e) {
    console.log(e.message);
  });

  request.end();

  function onReceivedHTML(html) {
    const rawTableData = extractTableDataFromHTML(html);
    const fundDataList = convertRawTableDataToFundDataList(rawTableData);
    const fund = fundDataList.find(
      (item) => item.fundCode.toLowerCase() === fundCode
    );

    if (!fund) {
      console.error("Not found");
      return;
    }

    console.log(fund.nav);
  }
}

function extractTableDataFromHTML(html) {
  const result = html
    .substring(html.indexOf("<td>"), html.lastIndexOf("</td>"))
    .split("</tr><tr>")
    .map((row) =>
      row.split("</td><td>").map((data) => data.replace(/<.*>/g, "").trim())
    );
  return result;
}

function convertRawTableDataToFundDataList(tableRows) {
  const result = tableRows.map((row) => ({
    fundCode: row[0],
    nav: row[1],
    bid: row[2],
    offer: row[3],
    change: row[4],
  }));
  return result;
}

function run() {
  const args = parseArgs();
  if (!args.length) {
    console.error("Please specify a fund code");
    return;
  }

  const fundCode = args[0];
  getNav(fundCode);
}

run();
