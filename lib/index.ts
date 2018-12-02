import { day01 } from "./01";
import { day02 } from "./02";
import { dayString } from "./common";

const dayMap: Record<string, () => void> = {
  '01': day01,
  '02': day02,
};

main().catch(console.error);

export async function main(): Promise<void> {
  let testNo = process.argv[2];

  if (!testNo) {
    console.log('Day number is required. Example: "yarn start 1"');
    return;
  }

  executeDay(Number(testNo));
}

function executeDay(day: number): void {
  let sDay = dayString(day);
  if (!dayMap[sDay]) throw new Error(`Day ${sDay} not found`);
  dayMap[sDay]();
}
