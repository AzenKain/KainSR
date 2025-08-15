import axios from "axios";
import { Buffer } from "buffer";
import { starrail } from "src/proto/starrail"; 

const OSPROD_HOST = "prod-official-asia-dp01.starrails.com";
const OSBETA_HOST = "beta-release01-asia.starrails.com";
const CNPROD_HOST = "prod-gf-cn-dp01.bhsr.com";
const CNBETA_HOST = "beta-release01-cn.bhsr.com";

export async function fetchHotfix(version: string, dispatchSeed: string) {
  const { region, branch } = parseVersionString(version);

  let host = OSBETA_HOST;
  if (region === "OS" && branch === "BETA") host = OSBETA_HOST;
  else if (region === "OS" && branch === "PROD") host = OSPROD_HOST;
  else if (region === "CN" && branch === "BETA") host = CNBETA_HOST;
  else if (region === "CN" && branch === "PROD") host = CNPROD_HOST;

  const url = `https://${host}/query_gateway?version=${version}&platform_type=1&language_type=3&dispatch_seed=${dispatchSeed}&channel_id=1&sub_channel_id=1&is_need_url=1`;

  return await requestHotfix(url);
}

async function requestHotfix(url: string) {
  const resp = await axios.get(url);

  const decodedBase64 = Buffer.from(resp.data, "base64");
  const msg = starrail.Gateserver.decode(decodedBase64);
  return starrail.Gateserver.toObject(msg, { defaults: true });
}

function parseVersionString(s: string) {
  const branches = ["PREbeta", "BETA", "PROD", "DEV", "PRE", "GM", "CECREATION"];
  const oses = ["Android", "Win", "iOS"];

  if (s.length < 2) throw new Error("invalid version string");
  const region = s.slice(0, 2);
  const afterRegion = s.slice(2);

  const branch = branches.find(b => afterRegion.startsWith(b));
  if (!branch) throw new Error("invalid branch in version string");
  const afterBranch = afterRegion.slice(branch.length);

  const osName = oses.find(o => afterBranch.startsWith(o));
  if (!osName) throw new Error("invalid OS in version string");

  return { region, branch, osName };
}
